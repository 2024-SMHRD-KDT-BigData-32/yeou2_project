# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import openai
import pymysql
import asyncio
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from pydantic import BaseModel
import ast  # 문자열 리스트를 리스트로 바꿔주는 안전한 방법

# 🔐 여기에 OpenAI API 키 입력 (또는 .env로 관리 가능)
client = openai.OpenAI(api_key="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")

app = FastAPI()

# CORS 설정 (React 포트 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React 개발 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FastAPI 서버 동작 중!"}





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

async def process_search_text(user_input):
    loop = asyncio.get_event_loop()
    prompt = f"'{user_input}' 이라는 검색어에서 핵심 키워드를 뽑아줘. 너무 길지 않게 핵심만."

    response = await loop.run_in_executor(
        None,
        lambda: client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
    )

    return response.choices[0].message.content.strip()

# 검색어 저장 API
@app.post("/save-search")
async def save_search(request: Request):
    data = await request.json()
    search_text = data.get("text", "")
    mb_id = data.get("mb_id", None)  # 로그인한 경우만 전달받고 없으면 None

    conn = get_connection()
    cursor = conn.cursor()

    sql = """
        INSERT INTO tb_search (mb_id, search_text)
        VALUES (%s, %s)
    """
    cursor.execute(sql, (mb_id, search_text))  # None이면 NULL로 들어감

    conn.commit()


    # 방금 삽입된 search_id 얻기
    search_id = cursor.lastrowid

    # 2. 벡터화
    embedding_vector = await get_embedding(search_text)
    embedding_json = json.dumps(embedding_vector)

    # 3. tb_embedding 저장
    embedding_id = f"search_{search_id}"
    insert_embedding_sql = """
        INSERT INTO tb_embedding (embedding_id, source_type, source_id, original_text, embedding_text)
        VALUES (%s, %s, %s, %s, %s)
    """
    cursor.execute(insert_embedding_sql, (
        embedding_id, "search", search_id, search_text, embedding_json
    ))

    conn.commit()

    # 1. 상품 벡터들 불러오기
    conn = get_connection()  # 다시 연결
    cursor = conn.cursor()
    cursor.execute("""
        SELECT source_id, embedding_text
        FROM tb_embedding
        WHERE source_type = 'product'
    """)
    product_rows = cursor.fetchall()

    # 2. 유사도 계산
    search_vec = np.array(embedding_vector).reshape(1, -1)

    product_vectors = []
    product_ids = []

    for row in product_rows:
        vec = np.array(json.loads(row['embedding_text']))
        product_vectors.append(vec)
        product_ids.append(row['source_id'])

    product_vectors = np.array(product_vectors)
    cosine_scores = cosine_similarity(search_vec, product_vectors)[0]

    # 3. 유사도 높은 상위 500개 상품 추출
    top_n = 500
    top_indices = cosine_scores.argsort()[-top_n:][::-1]
    top_product_ids = [product_ids[i] for i in top_indices]

    # 4. 상품 상세 정보 가져오기
    format_ids = ",".join(map(str, top_product_ids))
    cursor.execute(f"""
        SELECT prod_idx, prod_name, prod_performance, prod_category
        FROM tb_product
        WHERE prod_idx IN ({format_ids})
    """)
    all_products = cursor.fetchall()

    # ✅ 카테고리별 하나씩만 담기
    category_map = {}
    for product in all_products:
        category = product["prod_category"]
        if category not in category_map:
            category_map[category] = product  # 첫 번째 등장만 저장

    # 최종 추천 리스트
    products = list(category_map.values())
    recommended_ids = [p["prod_idx"] for p in products]
    # # 5. GPT 프롬프트 구성
    # product_info = "\n".join([f"- {p['prod_name']}: {p['prod_performance']}" for p in products])
    # prompt = f"""
    # 사용자 질문: {search_text}
    # 관련 제품:
    # {product_info}

    # 이 중에서 사용자에게 가장 적합한 걸 추천해줘. 이유도 간단히 설명해줘.
    # """

    # # 6. GPT 추천 받기
    # loop = asyncio.get_event_loop()
    # response = await loop.run_in_executor(
    #     None,
    #     lambda: client.chat.completions.create(
    #         model="gpt-3.5-turbo",
    #         messages=[{"role": "user", "content": prompt}]
    #     )
    # )

    # recommendation = response.choices[0].message.content.strip()








    conn.close()
    processed_text = await process_search_text(search_text)
    return {
    "message": "검색어 저장 완료",
    "processed": processed_text,
    "recommended_ids": recommended_ids,
    }


# 벡터화 함수
async def get_embedding(text):
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(
        None,
        lambda: client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
    )
    return response.data[0].embedding  # 벡터 리스트 반환



# 쉬운 자연어 처리 함수
# 🔍 핵심 키워드 추출 함수
async def simplify_text(user_input):
    loop = asyncio.get_event_loop()
    prompt = f"'{user_input}' 이라는 검색어에서 핵심 키워드를 뽑아줘. 너무 길지 않게 핵심만."
    
    response = await loop.run_in_executor(
        None,
        lambda: client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
    )

    return response.choices[0].message.content.strip()

from collections import defaultdict

def expand_keywords(simplified: str) -> dict:
    prompt = f"""
    다음 단어들에 대해 의미상 유사하거나 관련 있는 단어들을 각 단어마다 3개씩 추천해줘. 
    단어: {simplified}
    결과는 각 키워드별로 "키워드: 유사어1, 유사어2, 유사어3" 형식의 줄로 구분해서 줘.
    """

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5
    )

    content = response.choices[0].message.content.strip()

    expanded_dict = {}
    for line in content.split("\n"):
        if ":" in line:
            key, value = line.split(":", 1)
            synonyms = [v.strip() for v in value.split(",") if v.strip()]
            expanded_dict[key.strip()] = synonyms
    return expanded_dict




@app.post("/searchGeneral")
async def search_general(request: Request):
    data = await request.json()
    user_input = data.get("text", "")
    simplified = await simplify_text(user_input)

    # ✅ 동기 함수는 await 없이 호출!
    expanded = expand_keywords(simplified)
    print("🧠 추출된 핵심 키워드:", simplified)

    if not simplified.strip():
        return {"original": user_input, "simplified": simplified, "prod_idx_list": []}

    # 🔄 유사어 확장
    expanded = expand_keywords(simplified)
    print("🔁 확장된 키워드:", expanded)

    # 키워드 + 유사어 통합
    all_keywords = []
    for k, synonyms in expanded.items():
        all_keywords.append(k)
        all_keywords.extend(synonyms)

    # 중복 제거
    all_keywords = list(set(all_keywords))
    print("📚 최종 검색 키워드:", all_keywords)

    # 🔍 SQL 구성
    where_clauses = " OR ".join([
        "prod_name LIKE %s OR prod_performance LIKE %s" for _ in all_keywords
    ])
    params = []
    for word in all_keywords:
        like = f"%{word}%"
        params.extend([like, like])

    sql = f"""
        SELECT * 
        FROM tb_product
        WHERE {where_clauses}
        ORDER BY prod_category
    """

    print("🧩 최종 SQL:", sql)
    print("🧩 파라미터:", params)

    try:
        conn = get_connection()
        cursor = conn.cursor() 
        cursor.execute(sql, params)
        rows = cursor.fetchall()
        conn.close()
    except Exception as e:
        print("❌ DB 에러:", e)
        return {"original": user_input, "simplified": simplified, "prod_idx_list": []}

    # ✅ prod_category 기준으로 10개씩만 추출
    category_map = defaultdict(list)
    for row in rows:
        cat = row["prod_category"]
        if len(category_map[cat]) < 10:
            category_map[cat].append(row["prod_idx"])

    # ✅ 결과 flatten
    result_ids = [pid for ids in category_map.values() for pid in ids]

    return {
        "original": user_input,
        "simplified": simplified,
        "prod_idx_list": result_ids
    }




@app.post("/getProductsByIds")
async def get_products_by_ids(request: Request):
    data = await request.json()
    ids = data.get("ids", [])

    if not ids:
        return {"products": []}

    conn = get_connection()
    cursor = conn.cursor()

    # IN절에 쓰기 위해 %s를 id 수만큼 만들어줌
    placeholders = ','.join(['%s'] * len(ids))
    sql = f"""
        SELECT * FROM tb_product
        WHERE prod_idx IN ({placeholders})
    """
    cursor.execute(sql, ids)
    products = cursor.fetchall()

    conn.close()
    return {"products": products}



@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message", "")

    if not user_message:
        return {"reply": "메시지를 입력해 주세요."}

    # ✅ OpenAI API 호출
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # 사용할 모델
        messages=[
            {"role": "user", "content": user_message}
        ]
    )

    # ✅ OpenAI 응답 추출
    bot_reply = response.choices[0].message.content
    return {"reply": bot_reply}



class IdList(BaseModel):
    ids: list[int]

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
        cursor = conn.cursor()

        cursor.execute(sql, ids)
        # 커서로 찍기: 데이터베이스에서 가져온 결과를 직접 찍어봄
        rows = cursor.fetchall()
        conn.commit()
        conn.close()
        return {"products": rows}
    except Exception as e:
        print("❌ DB 에러:", e)
        return {"products": []}
