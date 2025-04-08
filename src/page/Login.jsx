import "../css/Login.css"; // 스타일 시트를 임포트합니다.
import React from 'react'; // React 라이브러리 임포트
import { useNavigate } from 'react-router-dom'; // 페이지 네비게이션을 위한 useNavigate 훅
import { useState } from "react"; // 상태 관리를 위한 useState 훅
import axios from "axios"; // HTTP 요청을 보내기 위한 axios 라이브러리
import useMove from "../components/Fun.jsx"; // 페이지 이동을 위한 커스텀 훅

const Login = () => {

    const navigate = useNavigate(); // useNavigate 훅을 사용해 페이지 이동 함수 가져오기

    const {
        moveMain,   // 메인 페이지로 이동하는 함수
        moveSignUp, // 회원가입 페이지로 이동하는 함수
        moveFindId, // 아이디 찾기 페이지로 이동하는 함수
        moveFindPw, // 비밀번호 찾기 페이지로 이동하는 함수
    } = useMove(); // 커스텀 훅에서 네비게이션 관련 함수 가져오기

    const [userId, setUserId] = useState(); // 사용자 ID 상태   
    const [password, setPassWord] = useState(); // 비밀번호 상태

    // 카카오 로그인 버튼 클릭 시 호출되는 함수
    const kakaoLogin = () => {
        const REST_API_KEY = "57f01c921ce408f83c0cef070e07b68e"; // 카카오 API 키
        const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback"; // 카카오 로그인 후 리다이렉트될 URI
        // 카카오 로그인 페이지로 리다이렉트
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    }

<<<<<<< HEAD
    const googleLogin = () => {
        const googleClientId = "681324437303-btref4o0qrpocsid88bh2tpmg2ctq2ir.apps.googleusercontent.com";
        const REDIRECT_URI = "http://localhost:3000/oauth/google/callback";

        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;
    }

=======
    // 로그인 시 호출되는 함수
    const tryLogin = async () => {
        try {
            // axios를 사용하여 서버에 로그인 요청
            const response = await axios.post(
                "http://localhost:8084/controller/login", // 로그인 API 엔드포인트
                {
                    mb_id: userId, // 사용자가 입력한 아이디
                    mb_pw: password, // 사용자가 입력한 비밀번호
                },
                {
                    headers: {
                        "Content-Type": "application/json" // 요청 헤더 설정
                    }
                }
            );
            alert(response.data); // 서버에서 반환된 응답을 alert로 표시
            navigate("/"); // 로그인 성공 시 메인 페이지로 이동
        } catch (error) {
            alert("로그인 실패"); // 로그인 실패 시 에러 메시지 출력
        }
    };
>>>>>>> 81247571d6648ce8aa1885ed8cc4bc47bd81940d

    return (
        <div id='login'>
            <div className="loginLabel">로그인</div> {/* 로그인 라벨 */}

            <div>
                <input className="userRio" type="radio" name="terms" /> {/* 사용자 라디오 버튼 */}
                <span className="userLabel">사용자</span> {/* 사용자 라벨 */}

                <input className="adminRio" type="radio" name="terms" /> {/* 관리자 라디오 버튼 */}
                <span className="adminLabel">관리자</span> {/* 관리자 라벨 */}
            </div>

            <div className="idLabel">ID</div> {/* ID 레이블 */}
            <input 
                className="idInput" 
                placeholder="아이디를 입력해주세요" 
                type="text" 
                onChange={(e) => setUserId(e.target.value)} 
            /> {/* 사용자 ID 입력 필드 */}

            <div className="pwLabel">PW</div> {/* 비밀번호 레이블 */}
            <input 
                className="pwInput" 
                placeholder="비밀번호를 입력해주세요" 
                type="password" 
                onChange={(e) => setPassWord(e.target.value)} 
            /> {/* 비밀번호 입력 필드 */}

            <button className="loginBtn" onClick={() => moveMain()}>로그인</button> {/* 로그인 버튼 */}
            <button className="googleBtn">Google로그인</button> {/* Google 로그인 버튼 */}

<<<<<<< HEAD
            <button className="loginBtn" onClick={()=>moveMain()}>로그인</button>
            <button className="googleBtn" onClick={googleLogin}>Google로그인</button>
=======
            <button className="kakaoBtn" onClick={kakaoLogin}>KaKAO로그인</button> {/* 카카오 로그인 버튼 */}
>>>>>>> 81247571d6648ce8aa1885ed8cc4bc47bd81940d

            <div className="signUpWrapper">
                <span className="signUpLink" onClick={() => moveSignUp()}>회원가입</span> {/* 회원가입 텍스트 클릭 시 이동 */}
            </div>

            <div className="findIDPW">
                <span className="findIDLink" onClick={() => moveFindId()}>아이디찾기</span> {/* 아이디 찾기 텍스트 클릭 시 이동 */}
                <span className="separator">|</span> {/* 구분선 */}
                <span className="findPWLink" onClick={() => moveFindPw()}>비밀번호찾기</span> {/* 비밀번호 찾기 텍스트 클릭 시 이동 */}
            </div>
        </div>
    )
}

export default Login; // Login 컴포넌트를 내보냄
