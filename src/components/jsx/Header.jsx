import React, { useState, useEffect } from 'react';
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

    // ✅ 로그인 여부와 사용자 타입 상태
    const [isVisible, setIsVisible] = useState(false); // 로그인 여부
    const [userType, setUserType] = useState(true);     // true: 관리자, false: 사용자

    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('general');

    // ✅ 마운트 시 sessionStorage 기반 상태 설정
    useEffect(() => {
        const loginStatus = sessionStorage.getItem("isLogin") === "true";
        const storedUserType = sessionStorage.getItem("userType"); // "admin" 또는 "user"

        setIsVisible(loginStatus);
        setUserType(storedUserType === "admin");
    }, []);

    // ✅ 로그아웃 처리
    const handleLogout = () => {
        sessionStorage.clear();
        setIsVisible(false);
        navigate("/");
    };

    // ✅ 검색 버튼 클릭 시: 일반 / 추천 구분
    const handleSearch = () => {
        if (searchType === 'general') {
            handleSearchGeneral();
        } else {
            handleSearchAI();
        }
    };

    // ✅ 일반 검색
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

    // ✅ AI 추천 검색 (더미 ID)
    const handleSearchAI = () => {
        const dummyRecommendedIds = [24];
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

                <button className="searchBtn" onClick={handleSearch}>검색</button>
            </div>

            <div className="btnContainer">
                {/* ✅ 관리자 전용 버튼 */}
                <div
                    className="loginBtn"
                    onClick={moveAdminCustomer}
                    style={{ display: isVisible && userType ? 'block' : 'none' }}
                >
                    Admin Settings
                </div>

                {/* ✅ 사용자 전용 마이페이지 */}
                <div
                    className="myPage"
                    onClick={moveMyPage}
                    style={{ display: isVisible && !userType ? 'block' : 'none' }}
                >
                    MyPage
                </div>

                {/* ✅ 로그인 버튼 */}
                <div
                    className="loginBtn"
                    onClick={moveLogin}
                    style={{ display: isVisible ? 'none' : 'block' }}
                >
                    Login
                </div>

                {/* ✅ 로그아웃 버튼 */}
                <div
                    className="loginBtn"
                    onClick={handleLogout}
                    style={{ display: isVisible ? 'block' : 'none' }}
                >
                    Logout
                </div>
            </div>
        </header>
    );
};

export default Header;
