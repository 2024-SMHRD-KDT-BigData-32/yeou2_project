import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 라우터 훅 추가
import useMove from "../Fun.jsx";
import '../css/Header.css';
import axios from 'axios';

const Header = () => {
    const {
        moveMain,
        moveMyPage,
        moveLogin,
        moveAdminCustomer,
    } = useMove();

    const navigate = useNavigate(); // ✅ useNavigate 사용
    const [isVisible, setIsVisible] = useState(false);
    const [userType, setUserType] = useState(true);
    const [searchText, setSearchText] = useState(''); // ✅ 검색어 상태
    const [searchType, setSearchType] = useState('general'); // ✅ 기본값을 'general'로 설정

    // 검색을 처리하는 함수
    const handleSearch = () => {
        navigate('/search', { state: { query: searchText, searchType } }); // ✅ 검색어와 검색 유형과 함께 이동
    };



    // AI 검색기능
    const handleSearchAI = async () => {
        console.log("🔍 handleSearch 호출됨");
        try {
            console.log("📡 axios 요청 시작");
            const res = await axios.post('http://localhost:8001/save-search', {
                text: searchText,
                mb_id: null,
            });
            console.log("✅ 응답:", res.data);

            const recommendedIds = res.data.recommended_ids; // ✅ 백엔드에서 받은 prod_idx 배열
            if (recommendedIds && recommendedIds.length > 0) {
                // 검색 페이지로 이동하면서 쿼리로 전달
                navigate(`/Search?ids=${recommendedIds.join(",")}`);
            } else {
                alert("추천 상품이 없습니다.");
            }
        } catch (error) {
            console.error("검색어 저장 실패:", error);
        }
    };

    // 일반적인 검색기능
    const handleSearchGeneral = async () => {
        try {
            const response = await axios.post("http://localhost:8001/searchGeneral", {
                text: searchText
            });

            const ids = response.data.prod_idx_list; // ✅ prod_idx 리스트 받기
            console.log("검색 결과:", ids);

            // 검색 페이지로 이동하면서 쿼리로 prod_idx들 넘기기
            navigate(`/Search?ids=${ids.join(",")}`);
        } catch (error) {
            console.error("자연어 처리 실패:", error);
        }
    };


    return (
        <header id="headerLogout">
            <div className="logo" onClick={moveMain}>
                <img className="headerImg" src="/img/computer.png" alt="Logo" />
                <span className="siteName">Compoota</span>
            </div>

            {/* 검색창과 레디오 버튼 그룹 */}
            <div className="searchContainer">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="검색어 입력"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                {/* 검색 유형 레디오 버튼 */}
                <div className="searchType">
                    <label>
                        <input
                            type="radio"
                            name="searchType"
                            value="general"
                            checked={searchType === 'general'}
                            onChange={() => setSearchType('general')}
                        />
                        일반
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="searchType"
                            value="recommendation"
                            checked={searchType === 'recommendation'}
                            onChange={() => setSearchType('recommendation')}
                        />
                        추천
                    </label>
                </div>

                {/* 검색 버튼 */}
                <button className="searchBtn" onClick={handleSearchGeneral}>검색</button>
            </div>

            <div className="btnContainer">
                <div className="loginBtn" onClick={moveAdminCustomer} style={{ display: isVisible && userType ? 'block' : 'none' }}>
                    Admin Settings
                </div>
                <div className="myPage" onClick={moveMyPage} style={{ display: isVisible && !userType ? 'block' : 'none' }}>
                    MyPage
                </div>
                <div className="loginBtn" onClick={moveLogin} style={{ display: isVisible ? 'none' : 'block' }}>
                    Login
                </div>
                <div className="loginBtn" onClick={moveMain} style={{ display: isVisible ? 'block' : 'none' }}>
                    Logout
                </div>
            </div>
        </header>
    );
};

export default Header;
