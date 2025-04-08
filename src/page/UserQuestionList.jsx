import React, { useEffect, useState } from "react";
import "../css/UserQuestionList.css"; // ✅ CSS 경로를 카멜표기로 표기
import { useNavigate } from "react-router-dom";

const UserQuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    // 🧪 더미 데이터 (서버 연동 전 임시용)
    const dummyData = [
        {
            id: 1,
            title: "배송 관련 문의",
            content: "언제쯤 배송되나요?",
            user: "홍길동",
            date: "2024-04-01",
            status: "답변완료",
        },
        {
            id: 2,
            title: "상품 교환 요청",
            content: "상품이 불량이라 교환 원합니다.",
            user: "이영희",
            date: "2024-04-05",
            status: "처리중",
        },
        {
            id: 3,
            title: "환불 문의",
            content: "환불 진행은 어떻게 하나요?",
            user: "김철수",
            date: "2024-04-03",
            status: "답변완료",
        },
        {
            id: 4,
            title: "로그인 문제",
            content: "비밀번호가 맞는데 로그인이 안돼요.",
            user: "박지민",
            date: "2024-04-06",
            status: "처리중",
        },
        {
            id: 5,
            title: "배송지 변경 요청",
            content: "배송지를 변경하고 싶은데 가능할까요?",
            user: "최수정",
            date: "2024-04-02",
            status: "답변완료",
        },
        {
            id: 6,
            title: "결제 오류가 발생했어요",
            content: "결제가 안 되고 오류가 납니다. 확인 부탁드립니다.",
            user: "장민호",
            date: "2024-04-07",
            status: "미답변",
        },
    ];

    // 🚀 컴포넌트 마운트 시 더미 데이터 세팅
    useEffect(() => {
        setQuestions(dummyData);
    }, []);

    // 📄 문의 항목 클릭 시 상세 페이지로 이동
    const handleClick = (question) => {
        navigate(`/question/${question.id}`, { state: question });
    };

    // 🆕 문의 등록 페이지로 이동
    const handleRegisterClick = () => {
        navigate("/register-question");
    };

    return (
        <div id="userQuestionList"> {/* ✅ 최상위 ID 지정 */}
            <div className="listContainer">
                <h2>문의 내역</h2>

                {/* ➕ 문의 등록 버튼 */}
                <div className="registerButtonWrapper">
                    <button className="registerButton" onClick={handleRegisterClick}>
                        문의 등록하기
                    </button>
                </div>

                {/* 📋 문의 목록 */}
                <ul className="questionList">
                    {questions.length === 0 ? (
                        <p>등록된 문의가 없습니다.</p>
                    ) : (
                        questions.map((q) => (
                            <li key={q.id} className="questionItem" onClick={() => handleClick(q)}>
                                <div className="questionHeader">
                                    <h3>{q.title}</h3>
                                    <span className={`status ${q.status}`}>{q.status}</span>
                                </div>
                                <p className="content">{q.content}</p>
                                <div className="metaInfo">
                                    <span className="user">{q.user}</span>
                                    <span className="date">{q.date}</span>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserQuestionList;
