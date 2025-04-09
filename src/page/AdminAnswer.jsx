// src/page/AdminAnswer.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/AdminAnswer.css";
import { useQuestionContext } from "../contexts/QuestionContext.jsx";

const AdminAnswer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions, setQuestions } = useQuestionContext();
    const question = location.state;

    const [answer, setAnswer] = useState(question.answer || "");

    const handleSave = () => {
        const updatedQuestions = questions.map((q) => {
            if (q.id === question.id) {
                return {
                    ...q,
                    answer: answer,
                    status: "답변완료",
                };
            }
            return q;
        });

        setQuestions(updatedQuestions);
        alert("답변이 저장되었습니다.");
        navigate("/AdminQuestion");
    };

    return (
        <div id="adminAnswer">
            <div className="adminAnswerContainer">
                <h2>문의 상세 및 답변</h2>

                <div className="questionBox">
                    <h3>{question.title}</h3>
                    <p>{question.content}</p>
                    {question.image && (
                        <div className="imageWrapper">
                            <img src={question.image} alt="문의 이미지" />
                        </div>
                    )}
                </div>

                <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="답변을 입력하세요"
                />

                <button onClick={handleSave}>답변 저장</button>
            </div>
        </div>
    );
};

export default AdminAnswer;
