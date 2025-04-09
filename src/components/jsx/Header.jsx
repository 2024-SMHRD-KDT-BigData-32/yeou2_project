import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [userType, setUserType] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('general');

    // ✅ 검색 버튼 클릭 시: 일반 / 추천 구분
    const handleSearch = () => {
        if (searchType === 'general') {
            handleSearchGeneral(); // 일반 검색
        } else {
            handleSearchAI(); // 추천 검색
        }
    };

    // ✅ 일반 검색 (그대로 유지)
    const handleSearchGeneral = async () => {
        try {
            const response = await axios.post("http://localhost:8001/searchGeneral", {
                text: searchText
            });

            const ids = response.data.prod_idx_list;
            console.log("검색 결과:", ids);

            navigate(`/Search?ids=${ids.join(",")}`);
        } catch (error) {
            console.error("자연어 처리 실패:", error);
        }
    };

    // ✅ AI 추천 검색 (더미 추천 ID 기반 이동)
    const handleSearchAI = () => {
        // 🔸 실제 서버 통신 없이, 프론트에서 더미 ID로 이동
        const dummyRecommendedIds = [24]; // 추후 백엔드 연동 시 대체 예정
        console.log("추천 검색(더미) 결과:", dummyRecommendedIds);
        navigate(`/AISearch?ids=${dummyRecommendedIds.join(",")}`);
    };

    return (
        <header id="headerLogout">
            <div className="logo" onClick={moveMain}>
                <img className="headerImg" src="/img/computer.png" alt="Logo" />
                <span className="siteName">Compoota</span>
            </div>

            <div className="searchContainer">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="검색어 입력"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

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

                {/* ✅ 선택된 검색 유형에 따라 분기 */}
                <button className="searchBtn" onClick={handleSearch}>검색</button>
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
