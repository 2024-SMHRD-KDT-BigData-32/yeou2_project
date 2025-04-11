// React 기본 훅과 axios, 스타일 import
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AISearch.css";

// 추천된 제품 리스트를 카테고리별 섹션으로 렌더링하는 함수
// 이미지, 이름, 가격, 쇼핑몰, 리뷰, 링크 등 출력
const renderCategory = (categoryName, productList) => {
    return (
        <section className="categorySection" key={categoryName}>
            <h2>{categoryName.toUpperCase()}</h2>
            <div className="productList">
                {productList.map((product, index) => (
                    <div className="productCard" key={`${categoryName}_${product.prod_idx}_${index}`}>
                        {/* 👉 최저가일 경우만 뱃지 표시 */}
                        {product.isCheapest && (
                            <div className="badge">최저가</div>
                        )}

                        <img src={product.prod_img} alt={product.prod_name} />
                        <h3>{product.prod_name}</h3>
                        <div className="productDetails">
                            <p className="price">{Number(product.prod_price).toLocaleString()}원</p>
                            <p>{product.prod_shoppingmall}</p>
                            <p>{product.review_text}</p>
                            <a href={product.prod_link} target="_blank" rel="noopener noreferrer">
                                자세히 보기
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const AISearch = ({ mbId }) => { //const AISearch = ({ mbId }), mbId삭제
    const [aiResults, setAiResults] = useState({});  // 추천 결과 저장
    const [query, setQuery] = useState("되노?"); // 검색어 기본값(최초 1회 자동실행)
    const [inputText, setInputText] = useState("");  // 입력창 값
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    // const mbId = "qwe";                              // 회원ID

    const fetchData = async (searchText) => {
        try {
            setIsLoading(true);
            console.log("검색어:", searchText, "회원:", mbId);
    
            const response = await axios.post("http://localhost:8084/ai-search", {
                mb_id: mbId,
                query: searchText
            });
    
            const rawData = response.data;
            console.log("원본 응답:", rawData);
    
            const cleanedData = {};
    
            for (const [category, products] of Object.entries(rawData)) {
                // 가격 오름차순 정렬
                const sorted = [...products].sort((a, b) => Number(a.prod_price) - Number(b.prod_price));
    
                // 최저가 제품의 prod_idx 저장
                const cheapestIdx = sorted[0]?.prod_idx;
                const cheapestPrice = Number(sorted[0]?.prod_price);
    
                // 총 5개 추출 (중복 허용)
                const sliced = sorted.slice(0, 5);
    
                // 각 상품에 isCheapest 플래그 추가 (카테고리 기준 최저가 1개만 true)
                const productsWithFlag = sliced.map(prod => ({
                    ...prod,
                    isCheapest: prod.prod_idx === cheapestIdx && Number(prod.prod_price) === cheapestPrice
                }));
    
                cleanedData[category] = productsWithFlag;
            }
    
            setAiResults(cleanedData);
        } catch (error) {
            console.error("AI 검색 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    /* 초기 렌더링 및 검색어 변경 감지
        query가 변경될 때마다 자동 실행됨
        초기에는 "되노?"라는 텍스트로 실행됨 */
    useEffect(() => {
        fetchData(query);
    }, [query]);

    // 검색 버튼 및 Enter 키 입력 처리
    const handleSearch = () => {
        if (inputText.trim() !== "") {
            setQuery(inputText.trim());
            console.log(inputText.trim())
        }
    };

    // 최종 렌더링
    return (
        <div id="aiSearch">
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch}>검색</button>
            </div>

            {/* 로딩 중일 때 메시지 표시 */}
            {isLoading ? (
                <div className="loadingMessage"> 🔄 검색 중입니다...</div>
            ) : (
            // 검색 결과 카테고리별 반복 렌더링
                Object.entries(aiResults).map(([category, products]) =>
                    renderCategory(category, products)
                )
            )}
        </div>
    );
};

export default AISearch;