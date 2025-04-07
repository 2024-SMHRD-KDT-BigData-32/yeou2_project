import React, { useState } from "react";
import "../css/AdminProduct.css";
import { FiUsers } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

import useMove from "../components/Fun.jsx"
const AdminProduct = () => {
    const [products, setProducts] = useState([
        { id: 1, productName: "노트북", productPrice: "1,200,000원" },
        { id: 2, productName: "스마트폰", productPrice: "900,000원" },
        { id: 3, productName: "태블릿", productPrice: "700,000원" },
    ]);

    const [newProduct, setNewProduct] = useState({ productName: "", productPrice: "" });

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleAdd = () => {
        if (newProduct.productName && newProduct.productPrice) {
            setProducts([...products, { id: Date.now(), ...newProduct }]);
            setNewProduct({ productName: "", productPrice: "" });
        }
    };

    const {
        moveAdminCustomer,
        moveAdminQuestion,
        moveAdminProduct,
    } = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기

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
