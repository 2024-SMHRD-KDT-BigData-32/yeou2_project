from fastapi import FastAPI, Request, HTTPException # FastAPI 사용, API 에러 체크 
from fastapi.middleware.cors import CORSMiddleware # Cross-Origin Resource Sharing 설정 
from pydantic import BaseModel # JSON 데이터의 유효성 검사 및 자동 변환
from dotenv import load_dotenv # .env 파일에 저장된 환경 변수 사용
from collections import defaultdict # Python의 딕셔너리 확장
import pymysql #Python, MySQL 연결 및 쿼리실행
from openai import OpenAI
from collections import defaultdict
from contextlib import closing
from typing import List
import asyncio
import json
import numpy as np
import pandas as pd
import os
import faiss


# 환경변수 로드 및 OpenAI 클라이언트 초기화
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# FastAPI 초기화
app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB 연결 함수
def get_connection():
    return pymysql.connect(
        host='project-db-campus.smhrd.com',
        port=3307,
        user='campus_24K_BigData32_p2_3',
        password='smhrd3',
        db='campus_24K_BigData32_p2_3',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

# 기본 루트
@app.get("/")
def root():
    return {"message": "FastAPI 서버 동작 중!"}


@app.post("/searchGeneral")
async def search_simple(request: Request):
    data = await request.json()
    user_input = data.get("text", "")

    # 공백으로 나눠서 키워드 추출
    keywords = [kw.strip() for kw in user_input.split() if kw.strip()]
    if not keywords:
        return {"original": user_input, "prod_idx_list": []}

    # WHERE 절 만들기
    where_clause = " OR ".join(["prod_name LIKE %s OR prod_performance LIKE %s" for _ in keywords])
    params = [f"%{kw}%" for kw in keywords for _ in range(2)]

    sql = f"""
        SELECT prod_idx, prod_category
        FROM tb_product
        WHERE {where_clause}
        ORDER BY prod_category
    """

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(sql, params)
        rows = cursor.fetchall()
        conn.close()
    except Exception as e:
        print("❌ DB 에러:", e)
        return {"original": user_input, "prod_idx_list": []}

    # 카테고리별 최대 10개
    category_map = defaultdict(list)
    for row in rows:
        cat = row["prod_category"]
        category_map[cat].append(row["prod_idx"])

    result_ids = [pid for ids in category_map.values() for pid in ids]
    return {
        "original": user_input,
        "prod_idx_list": result_ids
    }


# 상품 정보 조회
@app.post("/getProductsByIds")
async def get_products_by_ids(payload: dict):
    ids = payload.get("ids", [])

    if not ids:
        return {"products": []}

    placeholders = ','.join(['%s'] * len(ids))

    sql = f"""
        SELECT 
            p.prod_idx,
            p.prod_name,
            p.prod_category,
            p.prod_performance,
            p.prod_img,
            MIN(pp.prod_price) AS prod_price
        FROM 
            tb_product p
        JOIN 
            tb_product_price pp ON p.prod_idx = pp.prod_idx
        WHERE 
            p.prod_idx IN ({placeholders})
        GROUP BY 
            p.prod_idx, p.prod_name, p.prod_category, p.prod_performance, p.prod_img
    """
    try:
        conn = get_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        cursor.execute(sql, ids)
        # 커서로 찍기: 데이터베이스에서 가져온 결과를 직접 찍어봄
        rows = cursor.fetchall()
        cursor.close()
        conn.commit()
        conn.close()
        return {"products": rows}
    except Exception as e:
        print("❌ DB 에러:", e)
        return {"products": []}
    
#--------------------------------------------------------------
# 총 접속자 수 나타내기
VISIT_COUNT_FILE = 'main_home_visits.txt'

def get_visit_count():
    try:
        with open(VISIT_COUNT_FILE, 'r') as f:
            count = int(f.read())
    except FileNotFoundError:
        count = 0
    return count

def increment_visit_count():
    count = get_visit_count()
    count += 1
    with open(VISIT_COUNT_FILE, 'w') as f:
        f.write(str(count))

@app.post('/main-home-visit')
async def record_visit():
    increment_visit_count()
    return {"message": "Main homepage visit recorded successfully"}

# 2. 방문 횟수 조회 (GET `/api/main-home-visits`):
@app.get('/main-home-visits')
async def get_visits():
    count = get_visit_count()
    return {"count": count}



#상품조회
@app.get("/getProducts")
async def get_products():
    sql = """
        SELECT 
            p.prod_idx AS id,
            p.prod_name AS productName,
            MIN(pp.prod_price) AS productPrice 
            FROM 
                tb_product p 
            JOIN
                tb_product_price pp ON p.prod_idx = pp.prod_idx
            Group by p.prod_idx

    """

    try:
        conn = get_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(sql)
        rows = cursor.fetchall()
        conn.close()
        return {"products": rows}  
    except Exception as e:
        print("❌ DB 에러:", e)
        raise HTTPException(status_code=500, detail="Database error")
    

@app.get("/getProductPrices/{prod_idx}")
async def get_product_prices(prod_idx: int):
    sql = """
        SELECT prod_price, prod_shoppingmall, prod_link 
        FROM tb_product_price 
        WHERE prod_idx = %s
        ORDER BY prod_price ASC
    """
    try:
        conn = get_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(sql, (prod_idx,))
        rows = cursor.fetchall()
        conn.close()
        return {"prices": rows}
    except Exception as e:
        print("❌ 가격 데이터 에러:", e)
        raise HTTPException(status_code=500, detail="가격 정보를 불러오는 중 오류 발생")
    

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message", "")

    # OpenAI ChatGPT 호출
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # 또는 "gpt-4"
        messages=[
            {"role": "system", "content": "당신은 친절한 고객 지원 챗봇입니다."},
            {"role": "user", "content": user_message}
        ]
    )

    reply = response.choices[0].message.content.strip()

    return {"reply": reply}

@app.get("/getMembers")
async def get_members():
    # DB 연결 및 쿼리 실행
    sql = """
        SELECT mb_name, mb_nick, mb_email, mb_gender, mb_birthdate, mb_role, joined_at, mb_id
        FROM tb_member
    """
    try:
        conn = get_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(sql)
        rows = cursor.fetchall()
        conn.close()
        
        # 결과를 리스트로 반환
        return {"members": rows}
    except Exception as e:
        print("❌ DB 에러:", e)
        raise HTTPException(status_code=500, detail="Database error")
    


@app.post("/change-role")
async def change_role(data: dict):
    mb_id = data.get("mb_id")
    new_role = data.get("new_role", "ADMIN")

    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("UPDATE tb_member SET mb_role = %s WHERE mb_id = %s", (new_role, mb_id))
        conn.commit()
        return {"success": True}
    except Exception as e:
        print("Error updating role:", e)
        return {"success": False}
    

# # DB 테스트용 엔드포인트
# @app.get("/test-db")
# def test_db_connection():
#     try:
#         conn = get_connection()
#         with conn.cursor() as cursor:
#             cursor.execute("SELECT NOW() AS now_time;")
#             result = cursor.fetchone()
#         return {"status": "success", "db_time": str(result["now_time"])}
#     except Exception as e:
#         return {
#             "status": "fail",
#             "error": str(e),
#         }


# 사용자 검색어 tb_search 저장
def insert_search_text(conn, mb_id, search_text):
    with conn.cursor() as cursor:
        sql = """
            INSERT INTO tb_search (mb_id, search_text, created_at)
            VALUES (%s, %s, NOW())
        """
        print("🟡 INSERT 실행 전:", mb_id, search_text)
        cursor.execute(sql, (mb_id, search_text))
        print("✅ 검색어 저장 완료:", mb_id, search_text)
    conn.commit()
    print("🟢 INSERT 완료")  # 추가


# 텍스트 임베딩
# 사용자 검색어를 벡터화하여 numpy 배열로 변환
def embed_text(text):
    response = client.embeddings.create(
        model="text-embedding-ada-002",
        input=text
    )
    return np.array(response.data[0].embedding, dtype="float32")


# 임베딩 테이블 로드
# tb_embedding 테이블에서 source_type = 'product'인 벡터들 로드
def load_product_embeddings(conn):
    with conn.cursor() as cursor:
        cursor.execute("SELECT embedding_id, source_id, embedding_text FROM tb_embedding WHERE source_type = 'product'")
        rows = cursor.fetchall()

    ids, metadata, vectors = [], [], []
    for row in rows:
        ids.append(row['embedding_id'])
        metadata.append(row['source_id'])
        vectors.append(json.loads(row['embedding_text']))

    return ids, metadata, np.array(vectors, dtype='float32')


# FAISS 유사도 검색
# FAISS를 사용해 벡터 유사도 기준으로 TOP 100 ID 추출
def find_top_n_similar(query_vec, vectors, metadata, top_n=100):
    dim = vectors.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(vectors)
    _, I = index.search(np.array([query_vec]), top_n)
    return [metadata[i] for i in I[0]]


# 제품 정보 조회
# 추천된 product_ids 기준으로 tb_product, tb_product_price, tb_review를 조인하여 상세 정보 조회
def fetch_product_info(conn, product_ids):
    if not product_ids:
        return []

    with conn.cursor() as cursor:
        format_strings = ','.join(['%s'] * len(product_ids))
        sql = f"""
            SELECT 
                p.prod_idx, 
                p.prod_name, 
                p.prod_category,
                p.prod_img,
                pp.prod_price,
                pp.prod_shoppingmall,
                pp.prod_link,
                r.review_text
            FROM tb_product p
            LEFT JOIN tb_product_price pp ON p.prod_idx = pp.prod_idx
            LEFT JOIN tb_review r ON p.prod_idx = r.prod_idx
            WHERE p.prod_idx IN ({format_strings})
        """
        cursor.execute(sql, tuple(product_ids))
        return cursor.fetchall()


# 추천 로직
def recommend_products_by_search(mb_id, search_text):
    conn = get_connection()
    try:
        print("🔵 검색어 저장 시도:", mb_id, search_text)
        insert_search_text(conn, mb_id, search_text)
        query_vector = embed_text(search_text)
        ids, metadata, vectors = load_product_embeddings(conn)
        top_ids = find_top_n_similar(query_vector, vectors, metadata)
        products = fetch_product_info(conn, top_ids)

        category_dict = defaultdict(list)
        for item in products:
            category_dict[item['prod_category']].append(item)

        top5_by_category = []
        for category, items in category_dict.items():
            top5_by_category.extend(items[:5])

        return top5_by_category
    
    except Exception as e:
        print("❌ 검색어 저장 실패:", e)

    finally:
        conn.close()


# 요청 모델 정의
class SearchRequest(BaseModel):
    mb_id: str
    query: str


# 최종 추천 API
# 추천 결과를 카테고리별 딕셔너리 형태로 반환
# 프론트에서 Object.entries()로 반복 렌더링 가능
@app.post("/ai-search")
def ai_search(data: SearchRequest):
    try:
        recommendations = recommend_products_by_search(data.mb_id, data.query)

        result_by_category = defaultdict(list)
        for item in recommendations:
            result_by_category[item["prod_category"]].append(item)

        return result_by_category
    except Exception as e:
        print("❌ AI 추천 처리 실패:", e)
        raise HTTPException(status_code=500, detail=str(e))
