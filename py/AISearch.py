print("test")
from fastapi import FastAPI, HTTPException # FastAPI 사용, API 에러 체크 
from fastapi.middleware.cors import CORSMiddleware # Cross-Origin Resource Sharing 설정 
from pydantic import BaseModel # JSON 데이터의 유효성 검사 및 자동 변환
from dotenv import load_dotenv # .env 파일에 저장된 환경 변수 사용
from collections import defaultdict # Python의 딕셔너리 확장
import pymysql #Python, MySQL 연결 및 쿼리실행
import numpy as np
import os
import json
import faiss
from openai import OpenAI

# FastAPI 초기화
app1 = FastAPI()


# CORS 설정
app1.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 환경변수 로드 및 OpenAI 클라이언트 초기화
load_dotenv()
oai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# DB 연결 함수(pymysql 사용)
def get_connection():
    return pymysql.connect(
        host='project-db-campus.smhrd.com',
        port=3307,
        user='campus_24K_BigData32_p2_3',
        password='smhrd3',
        database='campus_24K_BigData32_p2_3',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )


# DB 테스트용 엔드포인트
@app1.get("/test-db")
def test_db_connection():
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT NOW() AS now_time;")
            result = cursor.fetchone()
        return {"status": "success", "db_time": str(result["now_time"])}
    except Exception as e:
        return {
            "status": "fail",
            "error": str(e),
        }


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
    response = oai_client.embeddings.create(
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
@app1.post("/ai-search")
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
