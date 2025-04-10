import { useState } from "react";
import "../css/UserQuestion.css";
import { useQuestionContext } from "../contexts/QuestionContext.jsx";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import axios from "axios";

const UserQuestion = () => {
    const loggedInUser = "user123"; // 임시 사용자 (스프링 연동 시 대체)
    const { questions, setQuestions } = useQuestionContext();
    const navigate = useNavigate(); // ✅ 추가

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        //formData.append("id", loggedInUser);
        formData.append("title", title);
        formData.append("content", content);
        if(image)formData.append("file", image); // 파일은 null일 수 있음
    
        try {
            const response = await axios.post("http://localhost:8084/controller/insert", formData, {
                withCredentials: true, // ✅ 세션 쿠키 포함!
                //method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                  },
            })
            
            console.log("✅ 등록 성공:", response.data);
            alert("문의가 등록되었습니다!");

        const newQuestion = {
            id: Date.now(),
            title,
            content,
            user: loggedInUser,
            date: new Date().toLocaleDateString(),
            status: "", // 답변 없음
            answer: "", // 답변 내용
            image: preview, // 이미지 base64 저장
        };

        setQuestions([newQuestion, ...questions]);

        // ✅ 등록 완료 후 리스트로 이동
        alert("문의가 등록되었습니다!");
        setTitle("");
        setContent("");
        setImage(null);
        setPreview(null);
        setIsSubmitting(false);
        navigate("/UserQuestionList"); // ✅ 리스트 페이지로 이동
    }catch (error) {
        console.error("❌ 등록 중 에러 발생:", error);
        alert("오류가 발생했습니다.");
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
            </div>
        </div>
    );
};

export default UserQuestion;
