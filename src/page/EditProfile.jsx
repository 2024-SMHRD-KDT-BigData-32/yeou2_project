import { useNavigate } from "react-router-dom";
import "../css/EditProfile.css";
import React, { useState } from 'react';

const EditProfile = () => {
    const navigate = useNavigate();
    
    // 상태 초기화 예시 (실제로는 API에서 받아오는 데이터일 수 있음)
    const [userData, setUserData] = useState({
        id: "user123",
        name: "홍길동",
        nickname: "홍홍",
        gender: "male", // 또는 "female"
        birthYear: "1990",
        birthMonth: "01",
        birthDay: "12",
        email: "user123@example.com",
        password: "" // 비밀번호 추가
    });

    const [newPassword, setNewPassword] = useState(""); // 새로운 비밀번호 상태 추가

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleGenderChange = (e) => {
        setUserData({
            ...userData,
            gender: e.target.value
        });
    };

    const handleSaveBtnClick = () => {
        // 데이터 저장 처리 (예: API 호출)
        alert("정보가 수정되었습니다.");
        navigate('/profile'); // 수정 후 프로필 페이지로 이동
    };

    const handleCancelBtnClick = () => {
        navigate('/profile'); // 수정 취소 시 프로필 페이지로 이동
    };

    const handleDeleteAccount = () => {
        // 회원 탈퇴 처리 (예: API 호출)
        if (window.confirm("정말로 회원을 탈퇴하시겠습니까?")) {
            alert("회원 탈퇴가 완료되었습니다.");
            navigate('/home'); // 탈퇴 후 홈으로 이동
        }
    };

    const handlePasswordChange = () => {
        // 비밀번호 변경 처리 (예: API 호출)
        if (!newPassword) {
            alert("새 비밀번호를 입력해주세요.");
            return;
        }
        alert("비밀번호가 변경되었습니다.");
        setUserData({
            ...userData,
            password: newPassword
        });
        setNewPassword(""); // 비밀번호 입력 필드 초기화
    };

    return (
        <div id='editProfile'>
            {/* 제목 */}
            <div className="mainLabel">회원정보 수정</div>

            {/* 아이디 */}
            <div className="idLabel">ID</div>
            <input
                className="idInput"
                value={userData.id}
                disabled
            />

            {/* 이름 */}
            <div className="nameLabel">이름</div>
            <input
                className="nameInput"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
            />

            {/* 닉네임 */}
            <div className="nickLabel">닉네임</div>
            <input
                className="nickInput"
                name="nickname"
                value={userData.nickname}
                onChange={handleInputChange}
            />

            {/* 성별 */}
            <div className="genderLabel">성별</div>
            <div className="maleLabel">남자</div>
            <input
                type="radio"
                className="maleRadio"
                name="gender"
                value="male"
                checked={userData.gender === "male"}
                onChange={handleGenderChange}
            />

            <div className="femaleLabel">여자</div>
            <input
                type="radio"
                className="femaleRadio"
                name="gender"
                value="female"
                checked={userData.gender === "female"}
                onChange={handleGenderChange}
            />

            {/* 생년월일 */}
            <div className="birthLabel">생년월일</div>
            <div className="birthDropbox">
                <select
                    className='yearInput'
                    name="birthYear"
                    value={userData.birthYear}
                    onChange={handleInputChange}
                >
                    <option value="1990">1990</option>
                    <option value="1992">1992</option>
                    <option value="1999">1999</option>
                    <option value="2002">2002</option>
                </select>

                <select
                    className='monthInput'
                    name="birthMonth"
                    value={userData.birthMonth}
                    onChange={handleInputChange}
                >
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

                <select
                    className='dayInput'
                    name="birthDay"
                    value={userData.birthDay}
                    onChange={handleInputChange}
                >
                    <option value="01">1일</option>
                    <option value="02">2일</option>
                    <option value="12">12일</option>
                </select>
            </div>

            {/* 이메일 */}
            <div className="emailLabel">이메일</div>
            <input
                type="email"
                className="emailInput"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
            />

            {/* 비밀번호 변경 */}
            <div className="pwLabel">새 비밀번호</div>
            <input
                type="password"
                className="pwInput"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호 입력"
            />
            <button className="saveBtn" onClick={handlePasswordChange}>비밀번호 변경</button>

            {/* 저장 버튼 */}
            <button className="saveBtn" onClick={handleSaveBtnClick}>저장</button>

            {/* 취소 버튼 */}
            <button className="cancelBtn" onClick={handleCancelBtnClick}>취소</button>

            {/* 회원 탈퇴 버튼 */}
            <button className="deleteBtn" onClick={handleDeleteAccount}>회원 탈퇴</button>
        </div>
    );
};

export default EditProfile;
