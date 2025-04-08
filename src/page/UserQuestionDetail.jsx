import React from "react";
import { useParams, useLocation } from "react-router-dom";
import "../css/UserQuestionDetail.css";

const UserQuestionDetail = () => {
    const { id } = useParams();
    const { state: question } = useLocation();

    // 예시 답변 (실제로는 API 또는 DB에서 받아오겠죠)
    const answers = {
        1: "고객님, 주문하신 상품은 1~2일 내로 도착 예정입니다. 감사합니다!",
        2: "불량 상품 확인 후, 택배 수거 및 새 상품으로 교환해드릴 예정입니다.",
    };

    const answer = answers[question?.id];

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
                {answer ? (
                    <div className="answer">{answer}</div>
                ) : (
                    <div className="noAnswer">아직 답변이 등록되지 않았습니다.</div>
                )}
            </div>
        </div>
    );
};

export default UserQuestionDetail;
