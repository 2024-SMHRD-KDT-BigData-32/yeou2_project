import "../css/AdminQuestion.css";
import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

import useMove from "../components/Fun.jsx"

const AdminQuestion = () => {
    const questions = [
        { name: "질서수", title: "제품 A 사용 중 오류 발생", response: "응답" },
        { name: "이영희", title: "링크 발송 오류", response: "응답안됨" },
        { name: "박지성", title: "링크 발송 오류", response: "응답" },
        { name: "제미나", title: "홈페이지 오류 페이지", response: "응답" },
        { name: "정현우", title: "홈페이지 오류 페이지", response: "응답" },
        { name: "강민지", title: "홈페이지 오류 페이지", response: "응답" },
        { name: "송준호", title: "홈페이지 오류 페이지", response: "응답" },
        { name: "한가람", title: "홈페이지 오류 페이지", response: "응답" },
    ];
    const [search, setSearch] = useState("");
    const {
        moveAdminCustomer,
        moveAdminQuestion,
        moveAdminProduct,
    } = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기

    return (
        <div id="adminQuestion">
            <aside className="sidebar">
                <h2 className="logo"><MdDashboard /> Dashboard</h2>
                <nav>
                    <ul>
                        <li onClick={() => moveAdminCustomer()}><FiUsers /> Customers</li>
                        <li onClick={() => moveAdminProduct()}><FiUsers /> Product</li>
                        <li className="active" onClick={() => moveAdminQuestion()}><FiUsers /> Question</li>
                    </ul>
                </nav>
            </aside>
            <main className="content">
                <header className="header">
                    <h1>Question</h1>
                    <div className="stats">
                        <div className="stat-box">
                            <p>총 유저 수</p>
                            <h2>5,423</h2>
                        </div>
                        <div className="stat-box">
                            <p>회원수</p>
                            <h2>1,893</h2>
                        </div>
                        <div className="stat-box">
                            <p>사용중인 유저</p>
                            <h2>189</h2>
                        </div>
                    </div>
                    <div className="search-bar">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </header>
                <h1></h1>
                <div className="question-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Title</th>
                                <th>Response</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, index) => (
                                <tr key={index}>
                                    <td>{q.name}</td>
                                    <td>{q.title}</td>
                                    <td className={q.response === "응답" ? "response-yes" : "response-no"}>{q.response}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminQuestion;
