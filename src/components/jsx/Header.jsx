// src/components/jsx/Header.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMove from '../Fun';
import '../css/Header.css';
import axios from 'axios';
import { useLoginContext } from '../../contexts/LoginContext';

const Header = () => {
    const {
        moveMain, moveMyPage, moveLogin, moveAdminCustomer
    } = useMove();
    const navigate = useNavigate();
    const { isLoggedIn, isAdmin, setIsLoggedIn } = useLoginContext();

    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('general');

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        alert('로그아웃 되었습니다.')
        navigate("/");
    };

    const handleSearch = () => {
        if (searchType === 'general') {
            handleSearchGeneral();
        } else {
            handleSearchAI();
        }
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
    };

    const handleSearchAI = () => {
        const dummyRecommendedIds = [24];
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
                <div
                    className="loginBtn"
                    onClick={moveAdminCustomer}
                    style={{ display: isLoggedIn && isAdmin ? 'block' : 'none' }}
                >
                    Admin Settings
                </div>
                <div
                    className="myPage"
                    onClick={moveMyPage}
                    style={{ display: isLoggedIn && !isAdmin ? 'block' : 'none' }}
                >
                    MyPage
                </div>
                <div
                    className="loginBtn"
                    onClick={moveLogin}
                    style={{ display: isLoggedIn ? 'none' : 'block' }}
                >
                    Login
                </div>
                <div
                    className="loginBtn"
                    onClick={handleLogout}
                    style={{ display: isLoggedIn ? 'block' : 'none' }}
                >
                    Logout
                </div>
            </div>
        </header>
    );
};

export default Header;
