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
    const [userType, setUserType] = useState(true); // true: 관리자, false: 일반 유저
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('general'); // 'general' 또는 'recommendation'

    // 🔍 검색 버튼 클릭 또는 Enter 키 입력 시 실행
    const handleSearch = () => {
        if (searchType === 'general') {
            handleSearchGeneral(); // 일반 검색 처리
        } else {
            handleSearchAI(); // 추천 검색 처리
        }
        setSearchText('');
    };

    // 🧠 일반 검색 처리 함수
    const handleSearchGeneral = async () => {
        try {
            const response = await axios.post("http://localhost:8001/searchGeneral", {
                text: searchText
            });
            const ids = response.data.prod_idx_list;
            navigate(`/Search?ids=${ids.join(",")}`); // 일반 검색 결과 페이지로 이동
        } catch (error) {
            console.error("자연어 처리 실패:", error);
        }
    };

    // 🤖 추천 검색 처리 함수
    const handleSearchAI = () => {
        if (searchText.trim()) {
            // 추천 검색은 AISearch 페이지에서 결과 요청 및 렌더링 처리
            navigate(`/AISearch?query=${encodeURIComponent(searchText.trim())}`);
        }
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
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault(); // ✅ 기본 동작 방지
                            handleSearch();
                        }
                    }}
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
                {/* 관리자용 설정 버튼 */}
                <div className="loginBtn" onClick={moveAdminCustomer} style={{ display: isVisible && userType ? 'block' : 'none' }}>
                    Admin Settings
                </div>

                {/* 일반 사용자용 마이페이지 */}
                <div className="myPage" onClick={moveMyPage} style={{ display: isVisible && !userType ? 'block' : 'none' }}>
                    MyPage
                </div>

                {/* 로그인 버튼 (비로그인 상태에서만 표시) */}
                <div className="loginBtn" onClick={moveLogin} style={{ display: isVisible ? 'none' : 'block' }}>
                    Login
                </div>

                {/* 로그아웃 버튼 (로그인 상태에서만 표시) */}
                <div className="loginBtn" onClick={moveMain} style={{ display: isVisible ? 'block' : 'none' }}>
                    Logout
                </div>
            </div>
        </header>
    );
};

export default Header;
