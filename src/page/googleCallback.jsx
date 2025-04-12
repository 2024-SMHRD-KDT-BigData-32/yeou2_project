import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");

    if (code) {
      axios.post("http://localhost:8084/controller/google-login", { code })
        .then(res => {
          console.log(res);
          alert("Google 로그인 성공! 이메일: " + res.data.email);
          navigate("/");
        })
        .catch(err => {
          console.error(err);
        }).finally(res=>{
          navigate("/");
        });
    }
  }, [location]);

  return <div>로그인 중입니다...</div>;
};

export default GoogleCallback;
