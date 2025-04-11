import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../css/AISearch.css";
import { div } from "framer-motion/client";

// 카테고리별 섹션 렌더링 함수
const renderCategory = (categoryName, productList) => {
    return (
        <section className="categorySection" key={categoryName}>
            <h2>{categoryName.toUpperCase()}</h2>
            <div className="productList">
                {productList.map((product, index) => (
                    <div className="productCard" key={`${categoryName}_${product.prod_idx}_${index}`}>
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

const AISearch = () => {
    const location = useLocation();
    const [aiResults, setAiResults] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const mbId = "qwe";

    const getQueryParam = () => {
        const params = new URLSearchParams(location.search);
        return params.get("query") || "";
    };

    const fetchData = async (searchText) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.post("http://localhost:8001/ai-search", {
                mb_id: mbId,
                query: searchText
            });

            const rawData = response.data;
            const cleanedData = {};

            for (const [category, products] of Object.entries(rawData)) {
                const sorted = [...products].sort((a, b) => Number(a.prod_price) - Number(b.prod_price));
                const cheapestIdx = sorted[0]?.prod_idx;
                const cheapestPrice = Number(sorted[0]?.prod_price);

                const sliced = sorted.slice(0, 5);
                const productsWithFlag = sliced.map(prod => ({
                    ...prod,
                    isCheapest: prod.prod_idx === cheapestIdx && Number(prod.prod_price) === cheapestPrice
                }));

                cleanedData[category] = productsWithFlag;
            }

            setAiResults(cleanedData);
        } catch (err) {
            console.error("AI 검색 실패:", err);
            setError("추천 검색 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const query = getQueryParam();
        if (query) fetchData(query);
    }, [location.search]);

    return (
        <div id="aiSearch">
            {isLoading ? (
                
                <img className="loadingMessage" src="/img/Vho.gif"/>
                // <div className="loadingMessage">🔄 검색 중입니다...</div>
            ) : error ? (
                <div className="errorMessage">❗ {error}</div>
            ) : Object.keys(aiResults).length > 0 ? (
                Object.entries(aiResults).map(([category, products]) =>
                    renderCategory(category, products)
                )
            ) : (
                <div className="noResults">추천 결과가 없습니다.</div>
            )}
        </div>
    );
};

export default AISearch;
