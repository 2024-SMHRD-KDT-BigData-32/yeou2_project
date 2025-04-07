import React from 'react'
import useMove from "../Fun.jsx"
import '../css/HeaderLogin.css'

const HeaderLogin = () => {

    const {
        moveLogin,
        moveMain,
        moveSearch,
    } = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기

    return (
        <header id="headerLogin">
            {/* 로고 & 사이트명 */}
            <div  className="logo"onClick={()=>moveMain()}>
                <img className="headerImg" src="/img/computer.png" alt="Logo" />
                <span className="siteName">Compoota</span>
            </div>

            {/* 검색창 */}
            <div className="searchContainer">
                <input className="searchInput" type="text" placeholder="검색어 입력" />
                <button className="searchBtn"onClick={()=>moveSearch()}>검색</button>
            </div>

            {/* 로그인 버튼 */}
            <div  className="loginBtn" onClick={()=>moveLogin()}>Login</div>


        </header>
    )
}

export default HeaderLogin