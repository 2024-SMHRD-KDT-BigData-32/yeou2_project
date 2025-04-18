import "../css/Main.css";
import { FlashDealCard } from "./FlashDealCard/FlashDealCard.jsx";

import useMove from "../components/Fun.jsx"
import axios from "axios";
import { useEffect } from "react";

export const Main = ({ className, ...props }) => {

  const {
    moveSearch
} = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기

  // 홈페이지 총 방문 수 기록하기 (파이썬 서버 열려있을 때만 가능)
  useEffect(() => {
    axios.post('http://localhost:8001/main-home-visit')
      .then(response => {
        console.log('Main 홈페이지 방문 기록 성공:', response.status);
      })
      .catch(error => {
        console.error('Main 홈페이지 방문 기록 실패:', error);
      });
  }, []);



  // 현재 경로에 따라 id 동적으로 설정
  const currentPath = window.location.pathname;

  return (
    <div id="main">
      {/* 상단 배경과 제목 */}
      <div className="rectangle-17">
        <div className="titleLabel">컴퓨터를 구매하려는 목적을 입력해주세요!</div>
      </div>

      {/* 검색창과 버튼 */}
      <div className="frame">
        <div className="order-card">
          <div className="bottom">
            <div className="text-field-button">
              <input className="text-field" type="text" placeholder="검색어 입력" />
              <button className="search-button" onClick={()=>moveSearch()}>검색</button>
            </div>
          </div>
        </div>
      </div>

      {/* 추천 카드 영역 */}
      <div className="flash-deals">
        
        <div className="flash-deal-card">
          <button className="recommend-btn">리그오브레전드 사양 추천</button>
          <img className="image-2" src="/img/lol.png" alt="리그오브레전드 사양 추천" />
        </div>

        <div className="flash-deal-card">
          <button className="recommend-btn">오버워치 사양 추천</button>
          <img className="image-2" src="/img/overwatch.png" alt="오버워치 추천" />
        </div>

        <div className="flash-deal-card">
          <button className="recommend-btn">영상 편집 컴퓨터 추천</button>
          <img className="image" src="/img/pr.png" alt="영상 편집 추천" />
        </div>

        <div className="flash-deal-card">
          <button className="recommend-btn">작업용 컴퓨터 추천</button>
          <img className="pexels-alphaen" src="/img/vscode.png" alt="작업용 추천" />
        </div>
      </div>
    </div>
  );
};

export default Main;
  