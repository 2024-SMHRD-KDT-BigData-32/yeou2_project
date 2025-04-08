import React, { useState } from 'react';
import '../css/Chatbot.css'; // 챗봇 스타일 파일

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false); // 챗봇 열림/닫힘 상태

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            // AI 챗봇과의 통신 로직 추가
        }
    };

    const toggleChatbot = () => {
        setIsOpen(!isOpen); // 챗봇 열림/닫힘 상태 변경
    };

    return (
        <div>
            <div className="chatbot-header" onClick={toggleChatbot}>
                Chat {/* 챗봇 헤더 (클릭 시 열고 닫음) */}
            </div>
            {isOpen && ( // isOpen 상태가 true일 때만 챗봇 내용 표시
                <div className="chatbot-content">
                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="chatbot-input">
                        <input type="text" value={input} onChange={handleInputChange} />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chatbot;