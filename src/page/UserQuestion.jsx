import { useState } from "react";
import "../css/UserQuestion.css";

const UserQuestion = () => {
    // 👤 로그인한 사용자 정보 (예시)
    const loggedInUser = "user123";

    const [questions, setQuestions] = useState([
        {
            id: 1,
            title: "배송이 너무 느려요",
            content: "3일 지났는데 아직도 안 와요",
            date: "2025-04-06",
            author: "user123",
        },
        {
            id: 2,
            title: "상품 문의",
            content: "이 상품 재입고 언제 되나요?",
            date: "2025-04-05",
            author: "user456",
        },
    ]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", loggedInUser);
        if (image) formData.append("image", image);

        try {
            // Spring 연동 전 테스트용
            const mockResponse = {
                ok: true,
                json: async () => ({
                    id: Date.now(),
                    title,
                    content,
                    author: loggedInUser,
                    date: new Date().toLocaleDateString(),
                }),
            };

            const response = mockResponse;

            /*
            const response = await fetch("http://localhost:8080/api/questions", {
                method: "POST",
                body: formData,
            });
            */

            if (response.ok) {
                const newQuestion = await response.json();
                setQuestions([newQuestion, ...questions]);
                alert("문의가 등록되었습니다!");
                setTitle("");
                setContent("");
                setImage(null);
                setPreview(null);
            } else {
                alert("등록 실패. 서버 오류");
            }
        } catch (err) {
            alert("서버 연결 실패");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="userQuestion">
            <div className="questionContainer">
                <h2>문의 등록</h2>
                <form onSubmit={handleSubmit} className="questionForm" encType="multipart/form-data">
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="문의 내용을 입력하세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {preview && (
                        <div className="imagePreview">
                            <img src={preview} alt="미리보기" />
                        </div>
                    )}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "등록 중..." : "등록하기"}
                    </button>
                </form>

                <div className="questionList">
                    <h3>내 문의 내역</h3>
                    {questions.length === 0 ? (
                        <p>등록된 문의가 없습니다.</p>
                    ) : (
                        <ul>
                            {questions.map((q) => (
                                <li key={q.id}>
                                    <strong>{q.title}</strong>
                                    <p>{q.content}</p>
                                    <span>{q.date}</span>
                                    <br />
                                    <small>작성자: {q.author}</small>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserQuestion;
