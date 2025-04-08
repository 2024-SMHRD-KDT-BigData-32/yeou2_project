import React, { useState } from 'react';
import '../css/Search.css';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['cpu', 'gpu', 'storage', 'mb', 'ram'];

const Search = () => {
    const [selectedTab, setSelectedTab] = useState('cpu');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        setCurrentPage(1);
    };

    const productsData = {
        cpu: Array.from({ length: 50 }, (_, i) => ({
            name: `CPU 제품 ${i + 1}`,
            price: `${(200000 + i * 5000).toLocaleString()}원`,
            specs: `스펙 정보 ${i + 1}`,
            image: '/img/pr.png',
        })),
        gpu: Array.from({ length: 18 }, (_, i) => ({
            name: `GPU 제품 ${i + 1}`,
            price: `${(300000 + i * 10000).toLocaleString()}원`,
            specs: `스펙 정보 ${i + 1}`,
            image: '/img/pr.png',
        })),
        storage: Array.from({ length: 12 }, (_, i) => ({
            name: `저장장치 ${i + 1}`,
            price: `${(100000 + i * 4000).toLocaleString()}원`,
            specs: `스펙 정보 ${i + 1}`,
            image: '/img/pr.png',
        })),
        mb: Array.from({ length: 15 }, (_, i) => ({
            name: `메인보드 ${i + 1}`,
            price: `${(150000 + i * 3000).toLocaleString()}원`,
            specs: `스펙 정보 ${i + 1}`,
            image: '/img/pr.png',
        })),
        ram: Array.from({ length: 20 }, (_, i) => ({
            name: `RAM 제품 ${i + 1}`,
            price: `${(80000 + i * 2500).toLocaleString()}원`,
            specs: `스펙 정보 ${i + 1}`,
            image: '/img/pr.png',
        })),
    };

    const products = productsData[selectedTab] || [];
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginatedItems = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div id="search">
            <div className="tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`tabButton ${tab} ${selectedTab === tab ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={`${selectedTab}-${currentPage}`}
                    className="tabContent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {paginatedItems.map((item, index) => (
                        <div className="itemCard" key={index}>
                            <img src={item.image} alt={item.name} />
                            <h4>{item.name}</h4>
                            <p>{item.price}</p>
                            <p>{item.specs}</p>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

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