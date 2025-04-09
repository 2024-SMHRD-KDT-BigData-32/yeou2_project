import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Search.css';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// 🔧 카테고리 탭 정의 (전체 추가)
const TABS = ['all', 'cpu', 'graphiccard', 'ssd', 'hdd', 'mainboard', 'ram'];

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchQuery = location.state?.query || ''; // 기본값

    // ✅ 상태 변수들
    const [selectedTab, setSelectedTab] = useState('all'); // 초기값을 'all'로 설정
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [productsByCategory, setProductsByCategory] = useState({});

    const queryParams = new URLSearchParams(location.search);
    const idsParam = queryParams.get("ids");

    // 🚀 useEffect로 서버에서 상품 데이터 받아오기
    useEffect(() => {
        if (idsParam) {
            const idsArray = idsParam.split(',').map(id => parseInt(id.trim(), 10));
            
            axios.post('http://localhost:8001/getProductsByIds', { ids: idsArray })
                .then(res => {
                    const products = res.data.products;
                    if (products.length === 0) {
                        setProductsByCategory({});
                        return;
                    }
    
                    const categorized = {};
                    products.forEach(product => {
                        const cat = product.prod_category.toLowerCase();
                        if (!categorized[cat]) categorized[cat] = [];
                        categorized[cat].push({
                            id: product.prod_idx,
                            name: product.prod_name,
                            price: product.prod_price ? `${Number(product.prod_price).toLocaleString()}원` : '가격 정보 없음',
                            specs: product.prod_performance,
                            image: product.prod_img || '/img/pr.png',
                        });
                    });
    
                    setProductsByCategory(categorized);
                })
                .catch(error => {
                    console.error("상품 정보 불러오기 실패:", error);
                    setProductsByCategory({});
                });
        } else {
            setProductsByCategory({});
        }
    }, [idsParam]);

    // 📂 선택된 탭의 전체 데이터
    const allItems = selectedTab === 'all' 
        ? Object.values(productsByCategory).flat() // 모든 카테고리의 상품을 결합
        : productsByCategory[selectedTab] || [];

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
        navigate('/search-detail', { state: { item } });
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
                        {tab === 'all' ? '전체' : tab.toUpperCase()}
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
                            <p>{item.price}</p>
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
