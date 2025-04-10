import React, { useEffect, useState } from "react";
import "../css/AdminProduct.css";
import { FiUsers } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import axios from "axios";  // axios 추가

import useMove from "../components/Fun.jsx"
const AdminProduct = () => {
    const [products, setProducts] = useState([]);

    const [newProduct, setNewProduct] = useState({ productName: "", productPrice: "" });
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 오류 상태


    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleAdd = () => {
        if (newProduct.productName && newProduct.productPrice) {
            setProducts([...products, { id: Date.now(), ...newProduct }]);
            setNewProduct({ productName: "", productPrice: "" });
        }
    };
    const fetchProducts = async () => {
        setLoading(true);  // 데이터 로딩 시작
        setError(null); // 이전 에러 초기화
        try {
            const response = await axios.get("http://localhost:8001/getProducts");
            console.log(response)
            console.log(response.data)
            setProducts(response.data.products || []); // 데이터를 받아와 상태 업데이트
            // console.log(customers.data.members[1].joined_at)
        } catch (err) {
            setError("상품 데이터를 불러오는 데 실패했습니다."); // 에러 상태 업데이트
            console.error("상품 데이터 로딩 오류:", err);
        } finally {
            setLoading(false);  // 데이터 로딩 종료
        }
    };
    const {
        moveAdminCustomer,
        moveAdminQuestion,
        moveAdminProduct,
    } = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div id="adminProduct">
            <aside className="sidebar">
                <h2 className="logo"><MdDashboard /> Dashboard</h2>
                <nav>
                    <ul>
                        <li onClick={() => moveAdminCustomer()}><FiUsers /> Customers</li>
                        <li className="active" onClick={() => moveAdminProduct()}><FiUsers /> Product</li>
                        <li onClick={() => moveAdminQuestion()}><FiUsers /> Question</li>
                    </ul>
                </nav>
            </aside>

            <main className="content">
                <h1>Product Management</h1>
                {/* 로딩 중일 때 */}
                {loading && <p>로딩 중...</p>}
                {/* 에러가 있을 때 */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* 상품 테이블 */}
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
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.productName}</td>
                                    <td>{product.productPrice}</td>
                                    <td>
                                        <button className="deleteBtn" onClick={() => handleDelete(product.id)}>
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
