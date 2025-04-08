import React, { useState } from 'react';
import '../css/Chatbot.css';

function Chatbot() {
  // 📌 대화 메시지들을 저장하는 상태: [{text: '안녕', sender: 'user'}, {text: '안녕하세요!', sender: 'bot'}]
  const [messages, setMessages] = useState([]);

  // 📌 입력창에 입력된 텍스트 저장
  const [input, setInput] = useState('');

  // 📌 챗봇 열기/닫기 상태
  const [isOpen, setIsOpen] = useState(false);

  // 🔄 입력창이 바뀔 때마다 상태 업데이트
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // 🧠 Send 버튼 클릭 시 실행되는 함수
  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };

      // 1. 사용자 메시지를 먼저 화면에 표시
      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      try {
        // 2. FastAPI 서버로 메시지를 POST 요청
        const response = await fetch('http://localhost:8001/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }), // 메시지 전송
        });

        // 3. 응답 받아오기 (json 형태로)
        const data = await response.json();

        // 4. 챗봇 응답 메시지를 state에 추가
        const botMessage = { text: data.reply, sender: 'bot' };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('❌ 챗봇 응답 실패:', error);
      }
    }
  };

  // 챗봇 열기/닫기 toggle
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* 고정된 둥근 헤더 아이콘 - 클릭 시 열림/닫힘 */}
      <div className="chatbot-header" onClick={toggleChatbot}>
        Chat
      </div>

      {/* 열렸을 때만 챗봇 내용 표시 */}
      {isOpen && (
        <div className="chatbot-content">
          {/* 메시지 출력 영역 */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>

          {/* 입력창 + 버튼 */}
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
