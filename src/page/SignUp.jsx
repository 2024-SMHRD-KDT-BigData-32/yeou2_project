import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";
import React, { useState } from 'react';
import axios from "axios";
import useMove from "../components/Fun";

const SignUp = () => {

    const navigate = useNavigate();

    const {

        moveLogin,
    } = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [gender, setGender] = useState("N");
    const [birthdate, setBirthdate] = useState("");
    const [email, setEmail] = useState("");


    const handleSignUp = async (e) => {
        e.preventDefailt();
        try {
            const response = await axios.post(
                "http://localhost:8084/controller/joinMember",
                {
                    mb_id: userId,
                    mb_pw: password,
                    mb_name: name,
                    mb_nick: nickname,
                    mb_email: email,
                    mb_gender: gender,
                    mb_birthdate: birthdate,
                    mb_role: "USER ",
                    mb_timestamp: new Date().toISOString(),
                });


            alert(response.data);
            navigate("/login");
        } catch (error) {
            alert("회원가입실패")
        }
    }

    const hadleGenderChange = (e) => {
        setGender(e.target.value);
    }


    return (
        <div id='signUp'>
            {/* 제목 */}
            <div className="mainLabel">회원가입</div>

            {/* 아이디 */}
            <div className="idLabel">ID</div>
            <input className="idInput" onChange={(e) => setUserId(e.target.value)}></input>
            <button className="idBtn">중복확인</button>

            {/* 비밀번호 */}
            <div className="pwLabel">PW</div>
            <input className="pwInput" onChange={(e) => setPassword(e.target.value)}></input>

            {/* 비번 확인 */}
            <div className="pwLabel2">PW 확인</div>
            <input className="pwInput2" onChange={(e) => setPassword(e.target.value)}></input>

            {/* 이름 */}
            <div className="nameLabel">이름</div>
            <input className="nameInput" onChange={(e) => setName(e.target.value)}></input>

            {/* 닉네임 */}
            <div className="nickLabel">닉네임</div>
            <input className="nickInput" onChange={(e) => setNickname(e.target.value)}></input>

            {/* 이메일 */}
            <div className="emailLabel">이메일</div>
            <input type="email" className="emailInput" onChange={(e) => setEmail(e.target.value)}></input>

            {/* 성별 */}
            <div className="genderLabel">성별</div>

            <div className="maleLabel">남자</div>
            <input type="radio" className="maleRio" name='gender' onChange={hadleGenderChange}></input>

            <div className="femaleLabel">여자</div>
            <input type="radio" className="femaleRio" name='gender' onChange={hadleGenderChange}></input>

            {/* 생년월일 */}
            <div className="birthLabel">생년월일</div>

            <div className="birthDropbox">
                {/* year 드롭박스 */}
                <select className='yearInput' name="year" id="">
                    <option value="01">1990</option>
                    <option value="02">1992</option>
                    <option value="03">1999</option>
                    <option value="04">2002</option>
                </select>

                {/* month 드롭박스 */}
                <select className='monthInput' name="month" id="">
                    <option value="01">1월</option>
                    <option value="02">2월</option>
                    <option value="03">3월</option>
                    <option value="04">4월</option>
                    <option value="08">5월</option>
                    <option value="06">6월</option>
                    <option value="07">7월</option>
                    <option value="08">8월</option>
                    <option value="09">9월</option>
                    <option value="10">10월</option>
                    <option value="11">11월</option>
                    <option value="12">12월</option>
                </select>
                {/* day 드롭박스 */}
                <select className='dayInput' name="day" id="">
                    <option value="12">12일</option>
                </select>
            </div>

            <button className="signUpBtn" onClick={handleSignUp} >회원가입 완료</button>
            <button className="backBtn" onClick={moveLogin}>로그인</button>





        </div>
    )
}

export default SignUp