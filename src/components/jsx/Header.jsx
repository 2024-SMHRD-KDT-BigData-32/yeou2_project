import React, { useState } from 'react'
import useMove from "../Fun.jsx"
import '../css/Header.css'

const Header = () => {

    const {
        moveMain,
        moveSearch,
        moveMyPage,
        moveLogin,
        moveAdminCustomer,
    } = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기
    const [isVisible, setIsVisible] = useState(true);
    
    const [userType, setUserType] = useState(true);

    const logoin = () => {
        setIsVisible(true)
    }

    const logout = () => {
        setIsVisible(false)
    }


    return (
        <header id="headerLogout">
            {/* 로고 & 사이트명 */}
            <div className="logo" onClick={() => moveMain()}>
                <img className="headerImg" src="/img/computer.png" alt="Logo" />
                <span className="siteName">Compoota</span>
            </div>

            {/* 검색창 */}
            <div className="searchContainer">
                <input className="searchInput" type="text" placeholder="검색어 입력" />
                <button className="searchBtn" onClick={() => moveSearch()}>검색</button>
            </div>

            <div class="btnContainer">


                {/* 어드민 세팅 */}
                <div className="loginBtn" onClick={() => moveAdminCustomer()} 
                    style={{ display: isVisible && userType ? 'block' : 'none' }}>
                        Admin Settings
                </div>

                {/* 마이페이지 버튼*/}
                <div className="myPage" onClick={() => moveMyPage()}
                    style={{ display: isVisible && !userType ? 'block' : 'none' }}>
                    MyPage
                </div>
                {/* 로그인 버튼  */}
                <div className="loginBtn" onClick={() => moveLogin()}
                    style={{ display: isVisible ? 'none' : 'block' }}>
                        Login
                </div>

                {/* 로그아웃 버튼 */}
                <div className="loginBtn" onClick={() => moveMain()}
                    style={{ display: isVisible ? 'block' : 'none' }}>
                        Logout
                </div>

            </div>

        </header>
    )
}

export default Header