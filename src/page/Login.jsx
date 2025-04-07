import "../css/Login2.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

const Login = () => {



    
    const navigate = useNavigate(); 
    
    const signUpBtnClick = () => {
        navigate('/SingUp'); // 이동할 경로
    };
    const findIdBtnClick = () => {
        navigate('/FindID'); // 이동할 경로
    };
    const findPwBtnClick = () => {
        navigate('/FindPW'); // 이동할 경로
    };

    const [userId, setUserId] = useState();
    const [password, setPassWord] = useState();


  const tryLogin = async()=>{
    try{
    const response = await axios.post(
      "http://localhost:8084/controller/login",
      {mb_id:userId, 
    mb_pw:password,});
    
    alert(response.data);
    navigate("/main");
}catch(error){
    alert("로그인 실패")
}
  };
    return (
        <div id='login'>

            <div className="loginLabel">로그인</div>
            <div className="idLabel">ID</div>
            <input className="idInput" placeholder="아이디를 입력해주세요" type="text" onChange={(e)=>setUserId(e.target.value)} />

            <div className="pwLabel">PW</div>
            <input className="pwInput" placeholder="비밀번호를 입력해주세요" type="text" onChange={(e)=>setPassWord(e.target.value)}/>


            
            <input className="userDio" type="radio"  name="terms"></input>
            <div className="userLabel ">사용자</div>

            <input className="adminDio" type="radio"  name="terms"></input>
            <div className="adminLabel">관리자</div>


            <button className="loginBtn" onClick={tryLogin}>로그인</button>
            <button className="googleBtn">Google로그인</button>
            
            <button className="kakaoBtn">KaKAO로그인</button>
            

            <button className="div7" onClick={ findIdBtnClick }>아이디찾기</button>
            <button className="div9" onClick={ findPwBtnClick }>비밀번호찾기</button>
            <button className="div11" onClick={ signUpBtnClick }>회원가입</button>

            


        </div>
    )
}

export default Login