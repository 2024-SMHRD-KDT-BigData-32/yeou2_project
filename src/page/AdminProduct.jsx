import React, { useEffect, useState } from "react";
import "../css/AdminProduct.css";
import { FiUsers } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
import useMove from "../components/Fun.jsx";

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ productName: "", productPrice: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // ✅ 검색 키워드 상태
    const [searchKeyword, setSearchKeyword] = useState("");

    const {
        moveAdminCustomer,
        moveAdminQuestion,
        moveAdminProduct,
    } = useMove();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:8001/getProducts");
            setProducts(response.data.products || []);
        } catch (err) {
            setError("상품 데이터를 불러오는 데 실패했습니다.");
            console.error("상품 데이터 로딩 오류:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleAdd = () => {
        if (newProduct.productName && newProduct.productPrice) {
            setProducts([...products, { id: Date.now(), ...newProduct }]);
            setNewProduct({ productName: "", productPrice: "" });
        }
    };

    // ✅ 검색 필터 적용된 상품 리스트
    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }

        return pages;
    };

    return (
        <div id="adminProduct">
            <aside className="sidebar">
                <h2 className="logo"><MdDashboard /> Dashboard</h2>
                <nav>
                    <ul>
                        <li onClick={moveAdminCustomer}><FiUsers /> Customers</li>
                        <li className="active" onClick={moveAdminProduct}><FiUsers /> Product</li>
                        <li onClick={moveAdminQuestion}><FiUsers /> Question</li>
                    </ul>
                </nav>
            </aside>

            <main className="content">
                <h1>Product Management</h1>
                {loading && <p>로딩 중...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* ✅ 검색창 추가 */}
                <div className="searchBox">
                    <input className ='searchInput'
                        type="text"
                        placeholder="상품명을 검색하세요"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>

                <div className="productTable">
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.productName}</td>
                                    <td>{product.productPrice}</td>
                                    <td>
                                        <button className="deleteBtn" onClick={() => handleDelete(product.id)}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ✅ 페이지네이션 */}
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        이전
                    </button>

                    {getPageNumbers().map((num, index) =>
                        num === "..." ? (
                            <span key={index} style={{ margin: "0 5px" }}>...</span>
                        ) : (
                            <button
                                key={index}
                                className={num === currentPage ? "activePage" : ""}
                                onClick={() => setCurrentPage(num)}
                            >
                                {num}
                            </button>
                        )
                    )}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        다음
                    </button>
                </div>

                <div className="addProduct">
                    <input
                        type="text"
                        placeholder="상품명"
                        value={newProduct.productName}
                        onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="가격"
                        value={newProduct.productPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, productPrice: e.target.value })}
                    />
                    <button onClick={handleAdd}>추가</button>
                </div>
            </main>
        </div>
    );
};

export default AdminProduct;
