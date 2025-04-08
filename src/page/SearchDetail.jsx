import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 🔄 위치와 탐색 기능
import '../css/SearchDetail.css'; // 🔧 스타일 파일

const SearchDetail = () => {
    const location = useLocation(); // 📍 위치 객체 사용
    const navigate = useNavigate(); // 🔙 뒤로 가기 기능

    // Search 페이지에서 전달된 아이템 정보
    const { item } = location.state || {}; // 상태 객체에서 아이템 가져오기

    // 아이템 정보가 없을 경우 오류 처리
    if (!item) {
        return <div>아이템을 찾을 수 없습니다.</div>;
    }

    // 뒤로 가기 버튼 클릭 시 이전 페이지로 이동
    const handleGoBack = () => {
        navigate(-1); // 한 페이지 뒤로 이동
    };

    return (
        <div id="searchDetail">
            {/* 아이템 상세 정보 출력 */}
            <div className="itemDetail">
                <h2>{item.name}</h2>
                <img src={item.image} alt={item.name} className="itemImage" />
                <div className="itemInfo">
                    <p><strong>가격:</strong> {item.price}</p>
                    <p><strong>스펙:</strong> {item.specs}</p>
                </div>
                <button onClick={handleGoBack} className="goBackButton">뒤로 가기</button>
            </div>
        </div>
    );
};

export default SearchDetail;
