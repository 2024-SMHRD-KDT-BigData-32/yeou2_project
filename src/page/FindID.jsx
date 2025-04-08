import { useNavigate } from "react-router-dom";
import "../css/FindID.css";
import React, { useState } from 'react';

import useMove from "../components/Fun.jsx"

const FindID = () => {

    

    const {
        
        moveSignUp,
        moveLogin,
        moveFindId,
        moveFindPw,
        moveMain
    } = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기

    const

    
    return (
        <div id="findID">
            <div className="mainLabel">아이디찾기</div>
            
            <div className="nameLabel">이름</div>
            <input className="nameInput" type="text"></input>

            <div className="emailLabel">이메일</div>
            <input className="emailInput" type="text"></input>
            <button className="emailBtn" onClick={}>전송</button>
            <br />
            
            <div className="authLabel">인증번호</div>
            <input className="authInput" type="text"></input>
            <button className="authBtn">인증번호확인</button>
            <button className="loginBtn" onClick={()=>moveLogin()}>로그인</button>
            
            <button className="signUpBtn" onClick={()=>moveSignUp()}>회원가입</button>
            
            <button className="findPWBtn" onClick={()=>moveFindPw()}>비밀번호 찾기</button>
            
        </div>

    )
}

export default FindID