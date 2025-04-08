import "../css/Login2.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import useMove from "../components/Fun.jsx"

const Login = () => {

    const navigate = useNavigate(); 

    const {
        moveMain,
        moveSignUp,
        moveFindId,
        moveFindPw,
    } = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기

    const [userId, setUserId] = useState();
    const [password, setPassWord] = useState();

    const kakaoLogin = () => {
        const REST_API_KEY = "57f01c921ce408f83c0cef070e07b68e";
        const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    }

    const googleLogin = () => {
        const googleClientId = "681324437303-btref4o0qrpocsid88bh2tpmg2ctq2ir.apps.googleusercontent.com";
        const REDIRECT_URI = "http://localhost:3000/oauth/google/callback";

        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;
    }


  const tryLogin = async()=>{
    try{
    const response = await axios.post(
      "http://localhost:8084/controller/login",
      {mb_id:userId, 
    mb_pw:password,},
    {
    handers:{
        "Content-Type":"application/json"
    }
}
);
    const result = 
    alert(response.data);
    navigate("/");
}catch(error){
    alert("로그인 실패")
}
};
    return (
        <div id='login'>

            <div className="loginLabel">로그인</div>
            
            <div>
                <input className="userRio" type="radio" name="terms" ></input>
                <span className="userLabel ">사용자</span>

                <input className="adminRio" type="radio" name="terms"></input>
                <span className="adminLabel">관리자</span>
            </div>
            
            <div className="idLabel">ID</div>
            <input className="idInput" placeholder="아이디를 입력해주세요" type="text" onChange={(e)=>setUserId(e.target.value)}/>

            <div className="pwLabel">PW</div>
            <input className="pwInput" placeholder="비밀번호를 입력해주세요" type="text" onChange={(e)=>setPassWord(e.target.value)}/>



            <button className="loginBtn" onClick={()=>moveMain()}>로그인</button>
            <button className="googleBtn" onClick={googleLogin}>Google로그인</button>

            <button className="kakaoBtn" onClick={kakaoLogin}>KaKAO로그인</button>

            <button className="signUpBtn" onClick={() => moveSignUp()}>회원가입</button>
            <div className="findIDPW">
                <button className="findIDBtn" onClick={() => moveFindId()}>아이디찾기</button>
                <button className="findPWBtn" onClick={() => moveFindPw()}>비밀번호찾기</button>    
            </div>
            




        </div>
    )
}

export default Login