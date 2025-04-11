import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const SignUp = () => {
    const navigate = useNavigate(); 

    // 상태 선언
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [gender, setGender] = useState("N");
    const [email, setEmail] = useState("");

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [birthdate, setBirthdate] = useState("");

    // 생년월일 조합
    useEffect(() => {
        if (year && month && day) {
            setBirthdate(`${year}-${month}-${day}`);
        }
    }, [year, month, day]);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!year || !month || !day) {
            alert("생년월일을 모두 선택해주세요.");
            return;
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

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
                    mb_role: "USER",
                    mb_timestamp: new Date().toISOString(),
                }
            );

            console.log(response.data==="회원가입성공");
            alert("회원가입성공")
            navigate("/login");
        } catch (error) {
            alert("회원가입 실패");
            console.error(error);
        }
    };









    const getDaysInMonth = (year, month) => {
        if (!year || !month) {
          return 31; // 기본값 또는 에러 처리
        }
        return new Date(year, month, 0).getDate();
      };





    return (
        <div id='signUp'>
            <div className="mainLabel">회원가입</div>

            
            <div className="idLabel">ID</div>
            <div className="idContainer">
                <input className="idInput" onChange={(e) => setUserId(e.target.value)} />
                <button className="idBtn">중복확인</button>
            </div>

            <div className="pwLabel">PW</div>
            <input className="pwInput" type="password" onChange={(e) => setPassword(e.target.value)} />

            <div className="pwLabel2">PW 확인</div>
            <input className="pwInput2" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />

            <div className="nameLabel">이름</div>
            <input className="nameInput" onChange={(e) => setName(e.target.value)} />

            <div className="nickLabel">닉네임</div>
            <input className="nickInput" onChange={(e) => setNickname(e.target.value)} />

            <div className="emailLabel">이메일</div>
            <input type="email" className="emailInput" onChange={(e) => setEmail(e.target.value)} />

            <div className="genderLabel">성별</div>
            <div className="genderContainer">
                <div className="maleLabel">남자</div>
                <input type="radio" name='gender' value="M" onChange={(e) => setGender(e.target.value)} />
                <div className="femaleLabel">여자</div>
                <input type="radio" name='gender' value="F" onChange={(e) => setGender(e.target.value)} />
            </div>

            <div className="birthLabel">생년월일</div>
            <div className="birthDropbox">
                <select className='yearInput' onChange={(e) => setYear(e.target.value)} value={year}>
                <option value="">연도</option>
                {Array.from({ length: 2020 - 1950 + 1 }, (_, i) => 1950 + i).map((y) => (
                    <option key={y} value={y}>{y}</option>
                ))}
                </select>


                <select className='monthInput' onChange={(e) => setMonth(e.target.value)} value={month}>
                <option value="">월</option>
                {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0")).map((m) => (
                    <option key={m} value={m}>{m}월</option>
                ))}
                </select>

                <select
                className='dayInput'
                onChange={(e) => setDay(e.target.value)}
                value={day}
                >
                <option value="">일</option>
                {Array.from({ length: getDaysInMonth(year, month) }, (_, i) => (i + 1).toString().padStart(2, "0")).map((d) => (
                    <option key={d} value={d}>{d}일</option>
                ))}
                </select>
            </div>

            <button className="signUpBtn" onClick={handleSignUp}>회원가입 완료</button>
            <button className="backBtn" onClick={() => navigate('/login')}>로그인</button>
        </div>
    );
};

export default SignUp;
