import "../css/Footer.css";

export const Footer = () => {
    return (
        <footer id="footer">
            {/* 회사 정보 영역 */}
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="/img/computer.png" alt="회사 로고" className="footer-img" />
                    <span className="company-name">Compoota</span>
                </div>

                <div className="footer-links">
                    <a href="/about">회사 소개</a>
                    <a href="/contact">고객 센터</a>
                    <a href="/terms">이용 약관</a>
                    <a href="/privacy">개인정보 처리방침</a>
                </div>
            </div>

            {/* 저작권 정보 */}
            <div className="copyright">
                © 2025 여유. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
