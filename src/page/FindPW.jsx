import React from 'react'
import "../css/FindPW.css";
import { useNavigate } from 'react-router-dom';

const FindPW = () => {

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

        <div id="findPW">
            <div className="mainLabel">비밀번호찾기</div>

            <div className="idLabel">ID</div>
            <input className="idInput" type='text'></input>

            <div className="nameLabel">이름</div>
            <input className="nameInput" type='text'></input>

            <div className="emailLabel">이메일</div>
            <input className="emailInput" type='text'></input>
            <button className="emailBtn">전송</button>

            <div className="authLabel">인증번호</div>
            <input className="authInput" type='text'></input>
            <button className="authBtn">확인</button>
            
            <button className="findPWBtn"onClick={findPwBtnClick}>비밀번호 찾기</button>
            
            <button className="signUpBtn"onClick={signUpBtnClick}>회원가입</button>
            <button className="loginBtntext"onClick={loginBtnClick}>로그인</button>
            <button className="findIDBtn" onClick={findIdBtnClick}>아이디 찾기</button>

            
        </div>


    )
}

export default FindPW