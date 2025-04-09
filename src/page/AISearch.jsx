import React from "react";
import "../css/AISearch.css";


// 카테고리별 더미 데이터
const dummyData = {
    cpu: [
        {
            prodIdx: 1,
            prodName: "인텔 코어i9-14900K",
            prodCategory: "cpu",
            prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
            prodPrice: 753120,
            prodShoppingmall: "SSG.COM",
            prodLink: "https://www.google.com/search?q=%ED%8C%8C%EC%84%B9+%EC%BB%A8%ED%8A%B8%EB%A1%A4+%ED%82%A4&oq=&gs_lcrp=EgZjaHJvbWUqCQgAEEUYOxjCAzIJCAAQRRg7GMIDMgkIARBFGDsYwgMyCQgCEEUYOxjCAzIJCAMQRRg7GMIDMgkIBBBFGDsYwgMyCQgFEEUYOxjCAzIJCAYQRRg7GMIDMgkIBxBFGDsYwgPSAQg2OTA5ajBqN6gCCLACAQ&sourceid=chrome&ie=UTF-8",
            reviewText: "고성능에 발열도 준수합니다.",
        },
        {
            prodIdx: 2,
            prodName: "AMD 라이젠 9 7950X",
            prodCategory: "cpu",
            prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
            prodPrice: 799000,
            prodShoppingmall: "컴퓨존",
            prodLink: "https://example.com/cpu2",
            reviewText: "다중 작업에 탁월한 성능입니다.",
        },
        {
            prodIdx: 3,
            prodName: "인텔 코어i7-14700F",
            prodCategory: "cpu",
            prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
            prodPrice: 495000,
            prodShoppingmall: "11번가",
            prodLink: "https://example.com/cpu3",
            reviewText: "가성비 좋은 고성능 CPU입니다.",
        },
        {
            prodIdx: 4,
            prodName: "AMD 라이젠 7 7700X",
            prodCategory: "cpu",
            prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
            prodPrice: 439000,
            prodShoppingmall: "쿠팡",
            prodLink: "https://example.com/cpu4",
            reviewText: "게임용으로 최적화된 성능입니다.",
        },
        {
            prodIdx: 5,
            prodName: "인텔 코어i5-14400",
            prodCategory: "cpu",
            prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
            prodPrice: 310000,
            prodShoppingmall: "G마켓",
            prodLink: "https://example.com/cpu5",
            reviewText: "일반 사용자를 위한 최적의 선택입니다.",
        },
    ],
    gpu: [
        {
            prodIdx: 6,
            prodName: "NVIDIA RTX 4090",
            prodCategory: "gpu",
            prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
            prodPrice: 2450000,
            prodShoppingmall: "SSG.COM",
            prodLink: "https://example.com/gpu1",
            reviewText: "4K 게임에서도 최고의 퍼포먼스.",
        },
        {
            prodIdx: 7,
            prodName: "AMD Radeon RX 7900 XTX",
            prodCategory: "gpu",
            prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
            prodPrice: 1390000,
            prodShoppingmall: "쿠팡",
            prodLink: "https://example.com/gpu2",
            reviewText: "고해상도 작업에 강력한 성능.",
        },
        {
            prodIdx: 8,
            prodName: "NVIDIA RTX 4070 Ti",
            prodCategory: "gpu",
            prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
            prodPrice: 1020000,
            prodShoppingmall: "다나와몰",
            prodLink: "https://example.com/gpu3",
            reviewText: "최신 게임도 쾌적하게 구동 가능.",
        },
        {
            prodIdx: 9,
            prodName: "AMD Radeon RX 7800 XT",
            prodCategory: "gpu",
            prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
            prodPrice: 950000,
            prodShoppingmall: "컴퓨존",
            prodLink: "https://example.com/gpu4",
            reviewText: "가성비 좋은 하이엔드 그래픽카드.",
        },
        {
            prodIdx: 10,
            prodName: "NVIDIA RTX 4060",
            prodCategory: "gpu",
            prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
            prodPrice: 480000,
            prodShoppingmall: "11번가",
            prodLink: "https://example.com/gpu5",
            reviewText: "보급형 그래픽카드 중 최고의 선택.",
        },
    ],
    mainboard: [{
        prodIdx: 6,
        prodName: "NVIDIA RTX 4090",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 2450000,
        prodShoppingmall: "SSG.COM",
        prodLink: "https://example.com/gpu1",
        reviewText: "4K 게임에서도 최고의 퍼포먼스.",
    },
    {
        prodIdx: 7,
        prodName: "AMD Radeon RX 7900 XTX",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 1390000,
        prodShoppingmall: "쿠팡",
        prodLink: "https://example.com/gpu2",
        reviewText: "고해상도 작업에 강력한 성능.",
    },
    {
        prodIdx: 8,
        prodName: "NVIDIA RTX 4070 Ti",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 1020000,
        prodShoppingmall: "다나와몰",
        prodLink: "https://example.com/gpu3",
        reviewText: "최신 게임도 쾌적하게 구동 가능.",
    },
    {
        prodIdx: 9,
        prodName: "AMD Radeon RX 7800 XT",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 950000,
        prodShoppingmall: "컴퓨존",
        prodLink: "https://example.com/gpu4",
        reviewText: "가성비 좋은 하이엔드 그래픽카드.",
    },
    {
        prodIdx: 10,
        prodName: "NVIDIA RTX 4060",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 480000,
        prodShoppingmall: "11번가",
        prodLink: "https://example.com/gpu5",
        reviewText: "보급형 그래픽카드 중 최고의 선택.",
    },], // 다음 메시지에서 이어서 작성 가능
    ram: [{
        prodIdx: 6,
        prodName: "NVIDIA RTX 4090",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 2450000,
        prodShoppingmall: "SSG.COM",
        prodLink: "https://example.com/gpu1",
        reviewText: "4K 게임에서도 최고의 퍼포먼스.",
    },
    {
        prodIdx: 7,
        prodName: "AMD Radeon RX 7900 XTX",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 1390000,
        prodShoppingmall: "쿠팡",
        prodLink: "https://example.com/gpu2",
        reviewText: "고해상도 작업에 강력한 성능.",
    },
    {
        prodIdx: 8,
        prodName: "NVIDIA RTX 4070 Ti",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 1020000,
        prodShoppingmall: "다나와몰",
        prodLink: "https://example.com/gpu3",
        reviewText: "최신 게임도 쾌적하게 구동 가능.",
    },
    {
        prodIdx: 9,
        prodName: "AMD Radeon RX 7800 XT",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 950000,
        prodShoppingmall: "컴퓨존",
        prodLink: "https://example.com/gpu4",
        reviewText: "가성비 좋은 하이엔드 그래픽카드.",
    },
    {
        prodIdx: 10,
        prodName: "NVIDIA RTX 4060",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 480000,
        prodShoppingmall: "11번가",
        prodLink: "https://example.com/gpu5",
        reviewText: "보급형 그래픽카드 중 최고의 선택.",
    },],
    ssd: [{
        prodIdx: 6,
        prodName: "NVIDIA RTX 4090",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 2450000,
        prodShoppingmall: "SSG.COM",
        prodLink: "https://example.com/gpu1",
        reviewText: "4K 게임에서도 최고의 퍼포먼스.",
    },
    {
        prodIdx: 7,
        prodName: "AMD Radeon RX 7900 XTX",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 1390000,
        prodShoppingmall: "쿠팡",
        prodLink: "https://example.com/gpu2",
        reviewText: "고해상도 작업에 강력한 성능.",
    },
    {
        prodIdx: 8,
        prodName: "NVIDIA RTX 4070 Ti",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 1020000,
        prodShoppingmall: "다나와몰",
        prodLink: "https://example.com/gpu3",
        reviewText: "최신 게임도 쾌적하게 구동 가능.",
    },
    {
        prodIdx: 9,
        prodName: "AMD Radeon RX 7800 XT",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 950000,
        prodShoppingmall: "컴퓨존",
        prodLink: "https://example.com/gpu4",
        reviewText: "가성비 좋은 하이엔드 그래픽카드.",
    },
    {
        prodIdx: 10,
        prodName: "NVIDIA RTX 4060",
        prodCategory: "gpu",
        prodImg: "https://img.danawa.com/prod_img/500000/964/798/img/28798964_1.jpg",
        prodPrice: 480000,
        prodShoppingmall: "11번가",
        prodLink: "https://example.com/gpu5",
        reviewText: "보급형 그래픽카드 중 최고의 선택.",
    },],
};

const renderCategory = (categoryName, productList) => {
    return (
        <section className="categorySection" key={categoryName}>
            <h2>{categoryName.toUpperCase()}</h2>
            <div className="productList">
                {productList.map((product) => (
                    <div className="productCard" key={product.prodIdx}>
                        <img src={product.prodImg} alt={product.prodName} />
                        <h3>{product.prodName}</h3>
                        
                        {/* 숨겨진 추가 정보 */}
                        <div className="productDetails">
                            <p>₩{product.prodPrice.toLocaleString()}</p>
                            <p>{product.prodShoppingmall}</p>
                            <p>{product.reviewText}</p>
                            <a href={product.prodLink} target="_blank" rel="noopener noreferrer">
                                자세히 보기
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// 전체 AI 추천 페이지
const AISearch = () => {
    return (
        <div id="aiSearch">
            {Object.entries(dummyData).map(([category, products]) =>
                renderCategory(category, products)
            )}
        </div>
    );
};

export default AISearch;