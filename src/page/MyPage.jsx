import React from 'react';
import "../css/MyPage.css";
import axios from 'axios';

const products = [
  {
    name: 'AMD 라이젠5-6세대 9600X (그래니트 릿지) (멀티팩(정품))',
    image: '/img/라이젠.png',
    price: '385,970원',
  },
  {
    name: 'ASUS PRIME B650M-A II 대원씨티에스',
    image: '/img/ASUS.png',
    price: '154,000원',
  },
  {
    name: '마이크론 Crucial DDR4-3200 CL22 대원씨티에스 (8GB)',
    image: '/img/마이크론.png',
    price: '21,230원',
  },
  {
    name: 'Seagate BarraCuda 5400/256M (8TB, ST8000DM004)',
    image: '/img/BarraCuda.png',
    price: '219,000원',
  },
  {
    name: 'PALIT 지포스 RTX 5070 GAMINGPRO D7 12GB 이엠텍',
    image: '/img/지포스.png',
    price: '1,070,000원',
  },
];

const handleDelete = async () => {
  const userId = localStorage.getItem("userId"); // ✅ 먼저 가져오기!
  console.log("삭제 요청 아이디:", userId);

  if (!userId) {
    alert("로그인 정보가 없습니다.");
    return;
  }

  if (!window.confirm("정말로 회원탈퇴 하시겠습니까?")) return;

  try {
    const response = await axios.post("http://localhost:8084/controller/deleteMember", {
      mb_id: userId,
    });

    console.log("서버 응답:", response.data);
    if (response.data === "success") {
      alert("탈퇴 완료!");
      localStorage.removeItem("userId");
      window.location.href = "/";
    } else {
      alert("탈퇴 실패: 서버에서 실패 처리됨");
    }
  } catch (err) {
    console.error("탈퇴 실패:", err);
    alert("탈퇴 실패 (네트워크 또는 서버 에러)");
  }
};

const MyPage = () => {
  return (
    <div id="cp-searchp-800">
      {/* 최근 검색 상품 섹션 */}
      <div className="recent-search">
        <h3 className="section-title">최근 검색 상품</h3>
        <div className="product-list">
          {products.map((product, index) => (
            <div className="product-item" key={index}>
              <img className="product-image" src={product.image} alt={product.name} />
              <a href="#" className="product-link">{product.name}</a>
              <div className="product-price">{product.price}</div>
              <hr />
            </div>
          ))}
        </div>
      </div>

      {/* 즐겨찾기 섹션 */}
      <div className="favorite-items">
        <h3 className="section-title">즐겨찾기</h3>
        <div className="product-list">
          {products.map((product, index) => (
            <div className="product-item" key={index}>
              <img className="product-image" src={product.image} alt={product.name} />
              <a href="#" className="product-link">{product.name}</a>
              <div className="product-price">{product.price}</div>
              <hr />
            </div>
          ))}
        </div>
      </div>

      {/* 🔸 계정 삭제 버튼 (기능 없음) */}
      <div className="delete-account">
        <button className="delete-account-button" onClick={handleDelete}>계정 삭제</button>
      </div>
    </div>
  );
};

export default MyPage;
