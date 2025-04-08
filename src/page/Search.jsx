import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 🔍 검색어 전달 및 페이지 이동
import '../css/Search.css';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// 🔧 카테고리 탭 정의
const TABS = ['cpu', 'graphiccard', 'ssd', 'hdd', 'mainboard', 'ram'];

const Search = () => {
    const location = useLocation(); // 🔁 Header에서 전달된 검색어 받기
    const navigate = useNavigate(); // 📍 상세 페이지 이동용
    const searchQuery = location.state?.query || ''; // ✅ 검색어 없을 경우 기본값

    // ✅ 상태 변수들
    const [selectedTab, setSelectedTab] = useState('cpu'); // 현재 선택된 탭
    const [currentPage, setCurrentPage] = useState(1);     // 현재 페이지
    const itemsPerPage = 10;                               // 페이지 당 아이템 수
    const [productsByCategory, setProductsByCategory] = useState({}); // 카테고리별 상품들

    const queryParams = new URLSearchParams(location.search);
    const idsParam = queryParams.get("ids"); // "1,5,7"

    // 🚀 useEffect로 서버에서 상품 데이터 받아오기
    useEffect(() => {
        if (idsParam) {
            const idsArray = idsParam.split(',').map(id => parseInt(id.trim(), 10));
            
            axios.post('http://localhost:8001/getProductsByIds', { ids: idsArray })
                .then(res => {
                    const categorized = {};
                    res.data.products.forEach(product => {
                        console.log(product)
                        const cat = product.prod_category.toLowerCase();
                        console.log(`Product Name: ${product.prod_name}, Price: ${product.prod_price}`); // 가격 확인
                        if (!categorized[cat]) categorized[cat] = [];
                        categorized[cat].push({
                            id: product.prod_idx,
                            name: product.prod_name,
                            price: product.prod_price ? `${Number(product.prod_price).toLocaleString()}원` : '가격 정보 없음', // 가격을 포맷팅
                            specs: product.prod_performance,
                            image: product.prod_img || '/img/pr.png',
                        });
                    });
                    setProductsByCategory(categorized);
                })
                .catch(err => console.error("❌ 상품 정보 불러오기 실패:", err));
        }
    }, [idsParam]);

    // 📂 선택된 탭의 전체 데이터
    const allItems = productsByCategory[selectedTab] || [];

    // 🔍 검색어로 필터링
    const filteredItems = allItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 📄 전체 페이지 수
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // ✂ 페이지 아이템 슬라이스
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // 🧭 상세 페이지로 이동
    const handleItemClick = (item) => {
        navigate('/search-detail', { state: { item } }); // 상세 페이지로 아이템 전달
    };

    return (
        <div id="search">
            {/* 🔘 탭 메뉴 */}
            <div className="tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`tabButton ${tab} ${selectedTab === tab ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedTab(tab);
                            setCurrentPage(1); // 탭 변경 시 페이지는 1로 초기화
                        }}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* 🎞️ 콘텐츠 애니메이션 출력 */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${selectedTab}-${currentPage}-${searchQuery}`}
                    className="tabContent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {paginatedItems.map((item) => (
                        <div
                            className="itemCard"
                            key={item.id}
                            onClick={() => handleItemClick(item)} // 클릭 시 상세 페이지로 이동
                        >
                            <img src={item.image} alt={item.name} />
                            <h4>{item.name}</h4>
                            <p>{item.price}</p> {/* 가격이 제대로 표시될 것 */}
                            <p>{item.specs}</p>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* 📚 페이지네이션 */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                        key={idx + 1}
                        className={`pageButton ${currentPage === idx + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(idx + 1)}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Search;
