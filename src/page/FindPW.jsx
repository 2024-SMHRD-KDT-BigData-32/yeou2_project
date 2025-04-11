import React from 'react'
import "../css/FindPW.css";
import { useNavigate } from 'react-router-dom';
import useMove from "../components/Fun.jsx"

const FindPW = () => {



    const {

        moveSignUp,
        moveLogin,
        moveFindId,
        moveFindPw,
    } = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기




    return (

        <div id="findPW">
            <div className="mainLabel">비밀번호찾기</div>

            <div className="idLabel">ID</div>
            <div className='group'>
                <input className="idInput" type='text'></input>
            </div>

            <div className="nameLabel">이름</div>
            <div className='group'>
                <input className="nameInput" type='text'></input>
            </div>

            <div className="emailLabel">이메일</div>
            <div className='group'>
                <input className="emailInput" type='text'></input>
                <button className="emailBtn">전송</button>
            </div>

            <div className="authLabel">인증번호</div>
            <div className='group'>
                <input className="authInput" type='text'></input>
                <button className="authBtn">확인</button>
            </div>
            <button className="findPWBtn" onClick={() => moveFindPw()}>비밀번호 찾기</button>

            <button className="signUpBtn" onClick={() => moveSignUp()}>회원가입</button>
            <button className="loginBtntext" onClick={() => moveLogin()}>로그인</button>
            <button className="findIDBtn" onClick={() => moveFindId()}>아이디 찾기</button>


        </div>


    )
}

export default FindPW