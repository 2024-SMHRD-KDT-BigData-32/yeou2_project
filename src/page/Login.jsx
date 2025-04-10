import "../css/Login.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

const Login = () => {




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

    const [userId, setUserId] = useState();
    const [password, setPassWord] = useState();

    const kakaoLogin = () => {
        const REST_API_KEY = "57f01c921ce408f83c0cef070e07b68e";
        const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    };

    const googleLogin = () => {
        const googleClientId = "681324437303-btref4o0qrpocsid88bh2tpmg2ctq2ir.apps.googleusercontent.com";
        const redirectUri = "http://localhost:3000/oauth/google/callback";

        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;

        window.location.href = url;
    };


    const tryLogin = async () => {
    try {
        const response = await axios.post(
            "http://localhost:8084/controller/login",
            {
                mb_id: userId,
                mb_pw: password,
            },
            {
                headers: { // ✅ 오타 수정: handers ➜ headers
                    "Content-Type": "application/json"
                }
            }
        );

        const result = response.data;

        // ✅ 로그인 성공 문자열 판별 (예: "로그인 성공")
        if (result.includes("성공")) {
            alert("로그인 성공");
            sessionStorage.setItem("isLogin", "true"); // 로그인 상태 저장

            // 🔒 사용자/관리자 정보 저장 (현재 주석 처리)
            // sessionStorage.setItem("userType", "user"); 
            // sessionStorage.setItem("user", JSON.stringify(result.user));

            navigate("/");
        } else {
            alert(result); // 서버에서 보낸 메시지 그대로 출력
        }

    } catch (error) {
        alert("로그인 실패");
        console.error(error);
    }
};


    return (
        <div id='login'>

            <div className="loginLabel">로그인</div>
            <div className="idLabel">ID</div>
            <input className="idInput" placeholder="아이디를 입력해주세요" type="text" onChange={(e) => setUserId(e.target.value)} />

            <div className="pwLabel">PW</div>
            <input className="pwInput" placeholder="비밀번호를 입력해주세요" type="text" onChange={(e) => setPassWord(e.target.value)} />



            <input className="userDio" type="radio" name="terms"></input>
            <div className="userLabel ">사용자</div>

            <input className="adminDio" type="radio" name="terms"></input>
            <div className="adminLabel">관리자</div>


            <button className="loginBtn" onClick={tryLogin}>로그인</button>
            <button className="googleBtn" onClick={googleLogin}><img src="/img/google_login.png" width="200" height="50"></img></button>

            <button className="kakaoBtn" onClick={kakaoLogin}><img src="/img/kakao_login.png" width="200" height="50"></img></button>


            <button className="div7" onClick={findIdBtnClick}>아이디찾기</button>
            <button className="div9" onClick={findPwBtnClick}>비밀번호찾기</button>
            <button className="div11" onClick={signUpBtnClick}>회원가입</button>




        </div>
    )
}

export default Login; // Login 컴포넌트를 내보냄
