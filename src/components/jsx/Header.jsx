import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 라우터 훅 추가
import useMove from "../Fun.jsx";
import '../css/Header.css';

const Header = () => {
    const {
        moveMain,
        moveMyPage,
        moveLogin,
        moveAdminCustomer,
    } = useMove();

    const navigate = useNavigate(); // ✅ useNavigate 사용
    const [isVisible, setIsVisible] = useState(true);
    const [userType, setUserType] = useState(true);
    const [searchText, setSearchText] = useState(''); // ✅ 검색어 상태

    const handleSearch = () => {
        navigate('/search', { state: { query: searchText } }); // ✅ 검색어와 함께 이동
    };

    return (
        <header id="headerLogout">
            <div className="logo" onClick={moveMain}>
                <img className="headerImg" src="/img/computer.png" alt="Logo" />
                <span className="siteName">Compoota</span>
            </div>

            {/* 검색창 */}
            <div className="searchContainer">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="검색어 입력"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
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
