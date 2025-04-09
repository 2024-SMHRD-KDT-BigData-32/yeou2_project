from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from openai import OpenAI
from dotenv import load_dotenv
from collections import defaultdict
from contextlib import closing
import pymysql
import asyncio
import json
import numpy as np
import pandas as pd
import os

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
    return response.data[0].embedding

# # 자연어 처리: 핵심 키워드 추출
# async def simplify_text(user_input):
#     loop = asyncio.get_event_loop()
#     prompt = f"'{user_input}' 이라는 검색어에서 핵심 키워드를 뽑아줘. 너무 길지 않게 핵심만."
#     response = await loop.run_in_executor(
#         None,
#         lambda: client.chat.completions.create(
#             model="gpt-3.5-turbo",
#             messages=[{"role": "user", "content": prompt}]
#         )
#     )
#     return response.choices[0].message.content.strip()

# # 유사어 확장
# def expand_keywords(simplified: str) -> dict:
#     prompt = f"""
#     다음 단어들에 대해 의미상 유사하거나 관련 있는 단어들을 각 단어마다 3개씩 추천해줘. 
#     단어: {simplified}
#     결과는 각 키워드별로 \"키워드: 유사어1, 유사어2, 유사어3\" 형식의 줄로 구분해서 줘.
#     """
#     response = client.chat.completions.create(
#         model="gpt-4",
#         messages=[{"role": "user", "content": prompt}],
#         temperature=0.5
#     )
#     content = response.choices[0].message.content.strip()
#     expanded_dict = {}
#     for line in content.split("\n"):
#         if ":" in line:
#             key, value = line.split(":", 1)
#             synonyms = [v.strip() for v in value.split(",") if v.strip()]
#             expanded_dict[key.strip()] = synonyms
#     return expanded_dict

# 검색어 저장 + 추천 API
@app.post("/save-search")
async def save_search(request: Request):
    data = await request.json()
    search_text = data.get("text", "")
    mb_id = data.get("mb_id")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO tb_search (mb_id, search_text) VALUES (%s, %s)
    """, (mb_id, search_text))
    conn.commit()
    search_id = cursor.lastrowid

    embedding_vector = await get_embedding(search_text)
    embedding_id = f"search_{search_id}"

    cursor.execute("""
        INSERT INTO tb_embedding (embedding_id, source_type, source_id, original_text, embedding_text)
        VALUES (%s, %s, %s, %s, %s)
    """, (embedding_id, "search", search_id, search_text, json.dumps(embedding_vector)))
    conn.commit()

    cursor.execute("""
        SELECT source_id, embedding_text FROM tb_embedding WHERE source_type = 'product'
    """)
    product_rows = cursor.fetchall()

    search_vec = np.array(embedding_vector).reshape(1, -1)
    product_vectors, product_ids = [], []

    for row in product_rows:
        vec = np.array(json.loads(row['embedding_text']))
        product_vectors.append(vec)
        product_ids.append(row['source_id'])

    cosine_scores = cosine_similarity(search_vec, np.array(product_vectors))[0]
    top_indices = cosine_scores.argsort()[-500:][::-1]
    top_product_ids = [product_ids[i] for i in top_indices]

    format_ids = ",".join(map(str, top_product_ids))
    cursor.execute(f"""
        SELECT prod_idx, prod_name, prod_performance, prod_category
        FROM tb_product
        WHERE prod_idx IN ({format_ids})
    """)
    all_products = cursor.fetchall()

    category_map = {}
    for product in all_products:
        cat = product["prod_category"]
        if cat not in category_map:
            category_map[cat] = product

    recommended_ids = [p["prod_idx"] for p in category_map.values()]
    conn.close()

    simplified = await simplify_text(search_text)
    return {
        "message": "검색어 저장 완료",
        "processed": simplified,
        "recommended_ids": recommended_ids,
    }

# # 일반 검색 API
# @app.post("/searchGeneral")
# async def search_general(request: Request):
#     data = await request.json()
#     user_input = data.get("text", "")

#     simplified = await simplify_text(user_input)
#     expanded = expand_keywords(simplified)

#     all_keywords = list({k for k, v in expanded.items()} | {s for v in expanded.values() for s in v})
#     if not all_keywords:
#         return {"original": user_input, "simplified": simplified, "prod_idx_list": []}

#     where_clause = " OR ".join(["prod_name LIKE %s OR prod_performance LIKE %s" for _ in all_keywords])
#     params = [f"%{kw}%" for kw in all_keywords for _ in range(2)]

#     sql = f"""
#         SELECT * FROM tb_product
#         WHERE {where_clause}
#         ORDER BY prod_category
#     """

#     try:
#         conn = get_connection()
#         cursor = conn.cursor()
#         cursor.execute(sql, params)
#         rows = cursor.fetchall()
#         conn.close()
#     except Exception as e:
#         print("❌ DB 에러:", e)
#         return {"original": user_input, "simplified": simplified, "prod_idx_list": []}

#     category_map = defaultdict(list)
#     for row in rows:
#         cat = row["prod_category"]
#         if len(category_map[cat]) < 10:
#             category_map[cat].append(row["prod_idx"])

#     result_ids = [pid for ids in category_map.values() for pid in ids]
#     return {
#         "original": user_input,
#         "simplified": simplified,
#         "prod_idx_list": result_ids
#     }

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