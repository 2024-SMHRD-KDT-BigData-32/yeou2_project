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
    
