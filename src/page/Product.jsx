import React from 'react'
import '../css/Product.css'
const Product = () => {
    return (
        <div className="cp-productp-700">
            {/* 상품 정보 */}
            <div className="product-details">
                <h1 className="product-title">PALIT 지포스 RTX 5070 GAMINGPRO D7 12GB 이엠텍</h1>
                <div className="product-rating">
                    <span className="star">★</span>
                    <span className="rating-text">4.5 / 5</span>
                </div>
                <div className="product-price">1,049,760원</div>
            </div>

            {/* 상품 이미지들 */}
            <div className="product-images">
                <img className="main-image" src="image0.png" alt="PALIT RTX 5070" />
                <div className="image-thumbnails">
                    <img className="thumbnail" src="image-50.png" alt="Thumbnail 1" />
                    <img className="thumbnail" src="image-60.png" alt="Thumbnail 2" />
                    <img className="thumbnail" src="image-70.png" alt="Thumbnail 3" />
                </div>
            </div>

            {/* AI 리뷰 분석 */}
            <div className="ai-review">
                <h3 className="ai-title">AI리뷰분석시스템</h3>
                <p className="ai-description">
                    이 제품에 대한 AI 분석 결과를 확인하세요. 사용자 리뷰 및 평가를 기반으로 한 인사이트 제공.
                </p>
            </div>

            {/* 제품 특징 */}
            <div className="product-features">
                <ul>
                    <li>12GB GDDR6 메모리</li>
                    <li>최신 NVIDIA 기술 적용</li>
                    <li>최고의 게이밍 성능</li>
                </ul>
            </div>

            {/* 구매 버튼 */}
            <div className="purchase-options">
                <button className="add-to-cart">장바구니에 추가</button>
                <button className="buy-now">지금 구매</button>
            </div>
        </div>
    )
}

export default Product