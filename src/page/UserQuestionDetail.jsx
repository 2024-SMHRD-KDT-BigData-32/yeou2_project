import React from "react";
import { useParams, useLocation } from "react-router-dom";
import "../css/UserQuestionDetail.css";

const UserQuestionDetail = () => {
    const { id } = useParams();
    const { state: question } = useLocation();

    if (!question) {
        return <div id="userQuestionDetail">해당 문의를 찾을 수 없습니다.</div>;
    }

    return (
        <div id="userQuestionDetail">
            <h1 className="title">{question.title}</h1>
            <div className="meta">작성일: {question.date}</div>
            <div className="content">{question.content}</div>

            <div className="answerSection">
                <h2>답변</h2>
                {question.answer ? (
                    <div className="answer">{question.answer}</div>
                ) : (
                    <div className="noAnswer">아직 답변이 등록되지 않았습니다.</div>
                )}
            </div>
        </div>
    );
};

export default UserQuestionDetail;
