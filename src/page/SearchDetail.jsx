import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/SearchDetail.css';
import axios from 'axios';

const SearchDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { item } = location.state || {};

    const [priceList, setPriceList] = useState([]);

    useEffect(() => {
        if (item?.id) {
            axios.get(`http://localhost:8001/getProductPrices/${item.id}`)
                .then(res => {
                    setPriceList(res.data.prices || []);
                })
                .catch(err => {
                    console.error("🔴 가격 정보 로드 실패:", err);
                });
        }
    }, [item]);

    if (!item) return <div>아이템을 찾을 수 없습니다.</div>;

    const handleGoBack = () => navigate(-1);

    return (
        <div id="searchDetail">
            <div className="itemDetail">
                <h2>{item.name}</h2>
                <img src={item.image} alt={item.name} className="itemImage" />
                <div className="itemInfo">
                    <p><strong>최저가:</strong> {item.price}</p>
                    <p><strong>스펙:</strong> {item.specs}</p>
                    <button onClick={handleGoBack} className="goBackButton">뒤로 가기</button>
                </div>
            </div>

            <div className="shoppingPriceTable">
                <h3>쇼핑몰별 가격 정보</h3>
                {priceList.length === 0 ? (
                    <p>가격 정보를 불러오는 중이거나 없습니다.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>쇼핑몰</th>
                                <th>가격</th>
                                <th>링크</th>
                            </tr>
                        </thead>
                        <tbody>
                            {priceList.map((priceInfo, index) => {
                            const shoppingmall = priceInfo.prod_shoppingmall === "" ? "NAVERSTORE" : priceInfo.prod_shoppingmall;

                            return (
                                <tr key={index}>
                                <td>{shoppingmall}</td>
                                <td>{priceInfo.prod_price.toLocaleString()}원</td>
                                <td>
                                    <a href={priceInfo.prod_link} target="_blank" rel="noopener noreferrer">
                                    바로가기
                                    </a>
                                </td>
                                </tr>
                            );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default SearchDetail;
