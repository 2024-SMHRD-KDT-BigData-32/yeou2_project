import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 🔍 검색어 전달 및 페이지 이동
import '../css/Search.css';
import { motion, AnimatePresence } from 'framer-motion';

// 🔧 카테고리 탭 정의
const TABS = ['cpu', 'gpu', 'ssd', 'hdd', 'mb', 'ram'];

const Search = () => {
    const location = useLocation(); // 🔁 Header에서 전달된 검색어 받기
    const navigate = useNavigate(); // 📍 상세 페이지 이동용
    const searchQuery = location.state?.query || ''; // ✅ 검색어 없을 경우 기본값

    const [selectedTab, setSelectedTab] = useState('cpu'); // 현재 선택된 탭
    const [currentPage, setCurrentPage] = useState(1);     // 현재 페이지
    const itemsPerPage = 10;                               // 페이지 당 아이템 수

    // 🧪 DB 연동 전: 더미 데이터
    const productsData = {
        cpu: Array.from({ length: 50 }, (_, i) => ({
            id: `cpu-${i + 1}`,
            name: `CPU 제품 ${i + 1}`,
            price: `${(200000 + i * 5000).toLocaleString()}원`,
            specs: `스펙 정보 ${i + 1}`,
            image: '/img/pr.png',
        })),
        gpu: Array.from({ length: 18 }, (_, i) => ({
            id: `gpu-${i + 1}`,
            name: `GPU 제품 ${i + 1}`,
            price: `${(300000 + i * 10000).toLocaleString()}원`,
            specs: `스펙 정보 ${i + 1}`,
            image: '/img/pr.png',
        })),
        ssd: Array.from({ length: 6 }, (_, i) => ({
            id: `ssd-${i + 1}`,
            name: `SSD 저장장치 ${i + 1}`,
            price: `${(120000 + i * 5000).toLocaleString()}원`,
            specs: `SSD 속도/스펙 ${i + 1}`,
            image: '/img/pr.png',
        })),
        hdd: Array.from({ length: 6 }, (_, i) => ({
            id: `hdd-${i + 1}`,
            name: `HDD 저장장치 ${i + 1}`,
            price: `${(90000 + i * 3000).toLocaleString()}원`,
            specs: `HDD 속도/스펙 ${i + 1}`,
            image: '/img/pr.png',
        })),
        mb: Array.from({ length: 15 }, (_, i) => ({
            id: `mb-${i + 1}`,
            name: `메인보드 ${i + 1}`,
            price: `${(150000 + i * 3000).toLocaleString()}원`,
            specs: `스펙 정보 ${i + 1}`,
            image: '/img/pr.png',
        })),
        ram: Array.from({ length: 20 }, (_, i) => ({
            id: `ram-${i + 1}`,
            name: `RAM 제품 ${i + 1}`,
            price: `${(80000 + i * 2500).toLocaleString()}원`,
            specs: `스펙 정보 ${i + 1}`,
            image: '/img/pr.png',
        })),
    };

    // 📂 선택된 탭의 전체 데이터
    const allItems = productsData[selectedTab] || [];

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
