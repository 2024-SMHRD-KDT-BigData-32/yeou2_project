import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";
import React from 'react';

const SignUp = () => {
    const navigate = useNavigate(); 
    
    const loginBtnClick = () => {
        navigate('/login');
    };

    return (
        <div id='signUp'>
            <div className="mainLabel">회원가입</div>

            <div className="idLabel">ID</div>
            <div className="inputRow">
                <input className="idInput" />
                <button className="idBtn">중복확인</button>
            </div>

            <div className="pwLabel">PW</div>
            <input className="pwInput" type="password" />

            <div className="pwLabel2">PW 확인</div>
            <input className="pwInput2" type="password" />

            <div className="nameLabel">이름</div>
            <input className="nameInput" />

            <div className="nickLabel">닉네임</div>
            <input className="nickInput" />

            <div className="genderLabel">성별</div>
            <div className="genderOptions">
                <label><input type="radio" className="maleRio" name='gender' /> 남자</label>
                <label><input type="radio" className="femaleRio" name='gender' /> 여자</label>
            </div>

            <div className="birthLabel">생년월일</div>
            <div className="birthDropbox">
                <select className='yearInput' name="year">
                    <option value="1990">1990</option>
                    <option value="1992">1992</option>
                    <option value="1999">1999</option>
                    <option value="2002">2002</option>
                </select>

                <select className='monthInput' name="month">
                    <option value="01">1월</option>
                    <option value="02">2월</option>
                    <option value="03">3월</option>
                    <option value="04">4월</option>
                    <option value="05">5월</option>
                    <option value="06">6월</option>
                    <option value="07">7월</option>
                    <option value="08">8월</option>
                    <option value="09">9월</option>
                    <option value="10">10월</option>
                    <option value="11">11월</option>
                    <option value="12">12월</option>
                </select>

                <select className='dayInput' name="day">
                    <option value="12">12일</option>
                </select>
            </div>

            <div className="emailLabel">이메일</div>
            <input type="email" className="emailInput" />

            <button className="signUpBtn" onClick={loginBtnClick}>회원가입 완료</button>
            <button className="backBtn" onClick={loginBtnClick}>로그인</button>
        </div>
    );
}

export default SignUp;
