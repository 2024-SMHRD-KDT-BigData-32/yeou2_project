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

    const handleSearch = () => {
        navigate('/AISearch')
        if (searchType === 'general') {
            handleSearchGeneral();
        } else {
            handleSearchAI();
        }
        setSearchText('');
    };

    const handleSearchGeneral = async () => {
        try {
            const response = await axios.post("http://localhost:8001/searchGeneral", {
                text: searchText
            });
            const ids = response.data.prod_idx_list;
            navigate(`/Search?ids=${ids.join(",")}`);
        } catch (error) {
            console.error("자연어 처리 실패:", error);
        }
        setSearchText('');
    };

    const handleSearchAI = () => {
        if (searchText.trim()) {
            // 추천 검색은 Header에서 직접 요청하지 않음
            // 결과 요청 및 렌더링은 /AISearch 페이지에서 처리
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
                            e.preventDefault(); // ✅ 기본 동작(폼 제출 등) 방지
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
