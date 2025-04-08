import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    axios.post("http://localhost:8084/controller/kakao-login", { code })
      .then(res => {
        alert("카카오 로그인 성공: " + res.data.email);
        navigate("/main");  // 로그인 후 메인으로
      })
      .catch(() => {
        alert("카카오 로그인 실패");
      });
  }, []);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoCallback;
