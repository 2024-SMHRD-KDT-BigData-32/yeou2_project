// src/page/UserQuestionList.jsx
import React from "react";
import "../css/UserQuestionList.css";
import { useNavigate } from "react-router-dom";
import { useQuestionContext } from "../contexts/QuestionContext.jsx";

const UserQuestionList = () => {
    const { questions } = useQuestionContext();
    const navigate = useNavigate();

    const handleClick = (question) => {
        navigate(`/question/${question.id}`, { state: question });
    };

    const handleRegisterClick = () => {
        navigate("/UserQuestion");
    };

    return (
        <div id="userQuestionList">
            <div className="listContainer">
                <h2>문의 내역</h2>
                <div className="registerButtonWrapper">
                    <button className="registerButton" onClick={handleRegisterClick}>
                        문의 등록하기
                    </button>
                </div>
                <ul className="questionList">
                    {questions.length === 0 ? (
                        <p>등록된 문의가 없습니다.</p>
                    ) : (
                        questions.map((q) => {
                            const status = q.status ? "답변완료" : "미답변";
                            return (
                                <li key={q.id} className="questionItem" onClick={() => handleClick(q)}>
                                    <div className="questionHeader">
                                        <h3>{q.title}</h3>
                                        <span className={`status ${status}`}>{status}</span>
                                    </div>
                                    <p className="content">{q.content}</p>
                                    <div className="metaInfo">
                                        <span className="user">{q.user}</span>
                                        <span className="date">{q.date}</span>
                                    </div>
                                </li>
                            );
                        })
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserQuestionList;
