import { useNavigate } from "react-router-dom";
import "../css/FindID.css";
import React from 'react';

const FindID = () => {

    const navigate = useNavigate(); 
    
    const signUpBtnClick = () => {
        navigate('/SignUp'); // 이동할 경로
    };
    const findIdBtnClick = () => {
        navigate('/FindID'); // 이동할 경로
    };
    const findPwBtnClick = () => {
        navigate('/FindPW'); // 이동할 경로
    };
    const loginBtnClick = () => {
        navigate('/login'); // 이동할 경로
    };





    
    return (
        <div id="findID">
            <div className="mainLabel">아이디찾기</div>
            
            <div className="nameLabel">이름</div>
            <div className="nameInput"></div>

            <div className="emailLabel">이메일</div>
            <div className="emailInput"></div>
            <button className="emailBtn">전송</button>
            
            <div className="authLabel">인증번호</div>
            <div className="authInput"></div>
            <button className="authBtn">인증번호확인</button>
            
            <button className="findIDBtn" onClick={findIdBtnClick}>아이디 찾기</button>
            
            <button className="signUpBtn"onClick={signUpBtnClick}>회원가입</button>
            <button className="loginBtn"onClick={loginBtnClick}>로그인</button>
            <button className="findPWBtn"onClick={findPwBtnClick}>비밀번호 찾기</button>
        </div>

    )
}

export default FindID