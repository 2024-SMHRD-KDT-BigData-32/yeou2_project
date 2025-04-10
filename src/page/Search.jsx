import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Search.css';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const TABS = ['all', 'cpu', 'graphiccard', 'ssd', 'hdd', 'mainboard', 'ram'];

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchQuery = location.state?.query || '';
    const [selectedTab, setSelectedTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsByCategory, setProductsByCategory] = useState({});
    const itemsPerPage = 10;

    const idsParam = new URLSearchParams(location.search).get("ids");

    useEffect(() => {
        if (!idsParam) return setProductsByCategory({});
        const idsArray = idsParam.split(',').map(id => parseInt(id, 10));
        axios.post('http://localhost:8001/getProductsByIds', { ids: idsArray })
            .then(res => {
                const categorized = {};
                res.data.products.forEach(p => {
                    const cat = p.prod_category.toLowerCase();
                    if (!categorized[cat]) categorized[cat] = [];
                    categorized[cat].push({
                        id: p.prod_idx,
                        name: p.prod_name,
                        price: p.prod_price ? `${Number(p.prod_price).toLocaleString()}원` : '가격 정보 없음',
                        specs: p.prod_performance,
                        image: p.prod_img || '/img/pr.png',
                    });
                });
                setProductsByCategory(categorized);
            })
            .catch(() => setProductsByCategory({}));
    }, [idsParam]);

    const allItems = selectedTab === 'all' ? Object.values(productsByCategory).flat() : productsByCategory[selectedTab] || [];
    const filteredItems = allItems.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleItemClick = (item) => navigate('/search-detail', { state: { item } });

    // ✅ 간단한 페이지 버튼 생략 구현
    const renderPagination = () => {
        const btns = [];
        const addBtn = (n) => btns.push(
            <button key={n} className={`pageButton ${currentPage === n ? 'active' : ''}`} onClick={() => setCurrentPage(n)}>{n}</button>
        );
        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) addBtn(i);
        } else {
            addBtn(1);
            if (currentPage > 5) btns.push(<span key="startEll">...</span>);
            const start = Math.max(2, currentPage - 2);
            const end = Math.min(totalPages - 1, currentPage + 2);
            for (let i = start; i <= end; i++) addBtn(i);
            if (currentPage < totalPages - 4) btns.push(<span key="endEll">...</span>);
            addBtn(totalPages);
        }
        return btns;
    };

    return (
        <div id="search">
            <div className="tabs">
                {TABS.map(tab => (
                    <button key={tab} className={`tabButton ${selectedTab === tab ? 'active' : ''}`} onClick={() => { setSelectedTab(tab); setCurrentPage(1); }}>
                        {tab === 'all' ? '전체' : tab.toUpperCase()}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={`${selectedTab}-${currentPage}-${searchQuery}`}
                    className="tabContent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {paginatedItems.map(item => (
                        <div className="itemCard" key={item.id} onClick={() => handleItemClick(item)}>
                            <img src={item.image} alt={item.name} />
                            <h4>{item.name}</h4>
                            <p>{item.price}</p>
                            <p>{item.specs}</p>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

            <div className="pagination">{renderPagination()}</div>
        </div>
    );
};

export default Search;
