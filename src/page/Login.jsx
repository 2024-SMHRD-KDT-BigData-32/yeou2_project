import "../css/Login.css";
import React from 'react';
import useMove from '../components/Fun'

const Login = () => {

    const {
        moveMain,
        moveSignUp,
        moveFindId,
        moveFindPw,
    } = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기

    let dsd = ''

    return (
        <div id='login'>

            <div className="loginLabel">로그인</div>
            
            <div>
                <input className="userRio" type="radio" name="terms"></input>
                <span className="userLabel ">사용자</span>

                <input className="adminRio" type="radio" name="terms"></input>
                <span className="adminLabel">관리자</span>
            </div>
            
            <div className="idLabel">ID</div>
            <input className="idInput" placeholder="아이디를 입력해주세요" type="text" />

            <div className="pwLabel">PW</div>
            <input className="pwInput" placeholder="비밀번호를 입력해주세요" type="text" />



            <button className="loginBtn" onClick={()=>moveMain()}>로그인</button>
            <button className="googleBtn">Google로그인</button>

            <button className="kakaoBtn">KaKAO로그인</button>

            <button className="signUpBtn" onClick={() => moveSignUp()}>회원가입</button>
            <div className="findIDPW">
                <button className="findIDBtn" onClick={() => moveFindId()}>아이디찾기</button>
                <button className="findPWBtn" onClick={() => moveFindPw()}>비밀번호찾기</button>    
            </div>
            




        </div>
    )
}

export default Login