import React from 'react'
import useMove from "../Fun.jsx"
import '../css/HeaderLogout.css'

const HeaderLogout = () => {

    const {
        moveMain,
        moveSearch,
        moveMyPage,
    } = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기


    
    return (
        <header id="headerLogout">
            {/* 로고 & 사이트명 */}
            <div className="logo"onClick={()=>moveMain()}>
                <img className="headerImg" src="/img/computer.png" alt="Logo" />
                <span className="siteName">Compoota</span>
            </div>

            {/* 검색창 */}
            <div className="searchContainer">
                <input className="searchInput" type="text" placeholder="검색어 입력" />
                <button className="searchBtn"onClick={()=>moveSearch()}>검색</button>
            </div>
            <div class="btnContainer">
                <div className="myPage" onClick={()=>moveMyPage()}>MyPage</div>   
                {/* 로그인 버튼 */}
                <div className="loginBtn" onClick={()=>moveMain()}>Logout</div>   

            </div>
            
        </header>
    )
}

export default HeaderLogout