import "../css/Login.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
// 추가 1: LoginContext import
import { useLoginContext } from '../contexts/LoginContext'; // 위치 확인 필요

const Login = () => {

    // ✅ 기존 코드 유지하면서 userId 가져옴
    const { setIsLoggedIn, setIsAdmin, setUserId, userId } = useLoginContext(); // ✅ userId 추가

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
                    withCredentials: false
                }
            );

            const result = response.data;

            console.log("🟢 서버 응답:", result); // 디버깅 필수!

            if (result === "관리자 로그인 성공") {
                alert("관리자 로그인 성공!");
                navigate("/");
                setIsLoggedIn(true);
                setIsAdmin(true);
                
                console.log('관리자 로그인 성공')
            } else if (result === "로그인성공") {
                alert("로그인 성공!");
                navigate("/");
                setIsLoggedIn(true);
                setIsAdmin(false);
                console.log('유저 로그인 성공')
            } else {
                alert(result || "로그인 실패");
                
                console.log('유저 로그인 성공')
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
                onChange={(e) => setUserId(e.target.value)} // ✅ context 기반 상태 업데이트
            />

            <div className="pwLabel">PW</div>
            <input
                className="pwInput"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                onChange={(e) => setPassWord(e.target.value)}
            />

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
            <div className="buttonRow">
                <img className='snsLogin' id="googleBtn" src="/img/loginGoogle.png" onClick={googleLogin} />
                <img className='snsLogin' id="kakaoBtn" src="/img/loginKakao.png" onClick={kakaoLogin} />
            </div>
            <button className="findIDBtn" onClick={findIdBtnClick}>아이디찾기</button>
            <button className="findPWBtn" onClick={findPwBtnClick}>비밀번호찾기</button>
            <button className="SignUpBtn" onClick={signUpBtnClick}>회원가입</button>
        </div>
    );
};

export default Login;
