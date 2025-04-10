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
    const [role, setRole] = useState('USER'); // 기본값 USER

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
        if (!userId || userId.trim() === "") {
            alert("아이디를 입력해주세요.");
            return;
        }
    
        const loginData = {
            mb_id: userId,
            mb_pw: password,
        };
    
        try {
            const response = await axios.post(
                "http://localhost:8084/controller/login",
                loginData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
    
            const result = response.data;
    
            console.log("🟢 서버 응답:", result); // 디버깅 필수!
    
            // 문자열 응답이라면
            if (result === "관리자 로그인 성공") {
                alert("관리자 로그인 성공!");
                navigate("/admin");
            } else if (result === "사용자 로그인 성공") {
                alert("사용자 로그인 성공!");
                navigate("/user");
            } else if (result === "로그인성공") {
                alert("일반 로그인 성공!");
                navigate("/");
            } else {
                alert(result || "로그인 실패");
            }
    
        } catch (error) {
            alert("서버 오류 또는 네트워크 문제로 로그인 실패");
            console.error(error);
        }
    };
    return (
        <div id='login'>
            <div className="loginLabel">로그인</div>
            <div className="idLabel">ID</div>
            <input
                className="idInput"
                placeholder="아이디를 입력해주세요"
                type="text"
                onChange={(e) => setUserId(e.target.value)}
            />

            <div className="pwLabel">PW</div>
            <input
                className="pwInput"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                onChange={(e) => setPassWord(e.target.value)}
            />

            {/* 사용자/관리자 선택 */}
            <div className="roleBox">
                <label>
                    <input
                        className="userDio"
                        type="radio"
                        name="role"
                        value="USER"
                        checked={role === "USER"}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    사용자
                </label>
                <label>
                    <input
                        className="adminDio"
                        type="radio"
                        name="role"
                        value="ADMIN"
                        checked={role === "ADMIN"}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    관리자
                </label>
            </div>

            <button className="loginBtn" onClick={tryLogin}>로그인</button>
            <button className="googleBtn" onClick={googleLogin}>Google로그인</button>
            <button className="kakaoBtn" onClick={kakaoLogin}>KaKAO로그인</button>
            <button className="div7" onClick={findIdBtnClick}>아이디찾기</button>
            <button className="div9" onClick={findPwBtnClick}>비밀번호찾기</button>
            <button className="div11" onClick={signUpBtnClick}>회원가입</button>
        </div>
    );
};

export default Login