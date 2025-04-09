// src/page/AdminQuestion.jsx
import "../css/AdminQuestion.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import useMove from "../components/Fun.jsx";
import { useQuestionContext } from "../contexts/QuestionContext.jsx";

const AdminQuestion = () => {
    const { questions } = useQuestionContext();
    const [search, setSearch] = React.useState("");
    const navigate = useNavigate();

    const {
        moveAdminCustomer,
        moveAdminQuestion,
        moveAdminProduct,
    } = useMove();

    const handleRowClick = (question) => {
        navigate(`/admin-answer/${question.id}`, { state: question });
    };

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
                                <tr key={index} onClick={() => handleRowClick(q)} style={{ cursor: "pointer" }}>
                                    <td>{q.user}</td>
                                    <td>{q.title}</td>
                                    <td className={q.status ? "response-yes" : "response-no"}>
                                        {q.status ? "응답" : "응답안됨"}
                                    </td>
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
