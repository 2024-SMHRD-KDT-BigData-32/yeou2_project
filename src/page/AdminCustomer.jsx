import "../css/AdminCustomer.css";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import useMove from "../components/Fun.jsx";
import axios from "axios";  // axios 추가

const AdminPage = () => {
    const [mainHomePageVisits, setMainHomePageVisits] = useState(0);
    const [search, setSearch] = useState(""); // 검색어 상태
    const [customers, setCustomers] = useState([]); // 회원 데이터
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 오류 상태

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const itemsPerPage = 10; // 페이지 당 항목 수
    const maxPageButtons = 5; // 최대 페이지 버튼 수

    const {
        moveAdminCustomer,
        moveAdminQuestion,
        moveAdminProduct,
    } = useMove(); // 네비게이션 함수

    const fetchCustomers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:8001/getMembers");
            setCustomers(response.data.members || []);
        } catch (err) {
            setError("회원 데이터를 불러오는 데 실패했습니다.");
            console.error("회원 데이터 로딩 오류:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8001/main-home-visits')
            .then(response => {
                setMainHomePageVisits(response.data.count);
            })
            .catch(error => {
                console.error('메인 홈페이지 방문 횟수 조회 실패:', error);
            });
        fetchCustomers();
    }, []);

    const handleRoleChange = async (mb_id) => {
        setCustomers((prev) =>
            prev.map((customer) =>
                customer.mb_id === mb_id ? { ...customer, mb_role: "ADMIN" } : customer
            )
        );

        try {
            const response = await axios.post("http://localhost:8001/change-role", {
                mb_id: mb_id,
                new_role: "ADMIN",
            });

            if (!response.data.success) {
                alert("역할 변경 실패");
                setCustomers((prev) =>
                    prev.map((customer) =>
                        customer.mb_id === mb_id ? { ...customer, mb_role: "USER" } : customer
                    )
                );
            }
        } catch (error) {
            console.error("역할 변경 중 오류 발생:", error);
            alert("서버 오류로 역할 변경에 실패했습니다.");
            setCustomers((prev) =>
                prev.map((customer) =>
                    customer.mb_id === mb_id ? { ...customer, mb_role: "USER" } : customer
                )
            );
        }
    };

    const filteredCustomers = customers.filter(customer => {
        const searchTerm = search.toLowerCase();
        return (
            customer.mb_name.toLowerCase().includes(searchTerm) ||
            customer.mb_nick.toLowerCase().includes(searchTerm) ||
            customer.mb_email.toLowerCase().includes(searchTerm)
        );
    });

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    return (
        <div id="adminCustomer">
            <aside className="sidebar">
                <h2 className="logo"><MdDashboard /> Dashboard</h2>
                <nav>
                    <ul>
                        <li className="active" onClick={moveAdminCustomer}><FiUsers /> Customers</li>
                        <li onClick={moveAdminProduct}><FiUsers /> Product</li>
                        <li onClick={moveAdminQuestion}><FiUsers /> Question</li>
                    </ul>
                </nav>
            </aside>

            <main className="content">
                <header className="header">
                    <h1>Customers</h1>
                    <div className="stats">
                        <div className="stat-box">
                            <p>총 유저 수</p>
                            <h2>{customers.length}</h2>
                        </div>
                        <div className="stat-box">
                            <p>총 방문자 수</p>
                            <h2>{mainHomePageVisits}</h2>
                        </div>
                        <div className="stat-box">
                            <p>최근 7일 가입자 수</p>
                            <h2>{customers.filter(customer => {
                                const joinDate = new Date(customer.joined_at);
                                const now = new Date();
                                const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
                                return joinDate >= sevenDaysAgo;
                            }).length}</h2>
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
                <section className="customer-table">
                    <h2>전체 유저</h2>
                    {loading && <p>로딩 중...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {!loading && !error && (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>유저명</th>
                                        <th>닉네임</th>
                                        <th>Email</th>
                                        <th>성별</th>
                                        <th>생일</th>
                                        <th>역할</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedCustomers.map((customer, index) => (
                                        <tr key={index}>
                                            <td>{customer.mb_name}</td>
                                            <td>{customer.mb_nick}</td>
                                            <td>{customer.mb_email}</td>
                                            <td>{customer.mb_gender}</td>
                                            <td>{customer.mb_birthdate}</td>
                                            <td>
                                                {customer.mb_role === "ADMIN" ? (
                                                    <div style={{ color: "red", fontWeight: "bold" }}>관리자</div>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm(`${customer.mb_nick}님을 관리자로 전환하시겠습니까?`)) {
                                                                handleRoleChange(customer.mb_id);
                                                            }
                                                        }}
                                                        style={{
                                                            padding: "4px 8px",
                                                            backgroundColor: "#007bff",
                                                            color: "white",
                                                            border: "none",
                                                            borderRadius: "4px",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        관리자로 전환
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* ✅ 페이지네이션 */}
                            {filteredCustomers.length > itemsPerPage && (
                                <div className="pagination" style={{ marginTop: "20px", textAlign: "center" }}>
                                    {currentPage > 1 && (
                                        <button onClick={() => setCurrentPage(currentPage - 1)} style={{ margin: "0 5px" }}>
                                            ◀ 이전
                                        </button>
                                    )}

                                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            style={{
                                                margin: "0 5px",
                                                padding: "6px 12px",
                                                backgroundColor: currentPage === pageNum ? "#007bff" : "#f0f0f0",
                                                color: currentPage === pageNum ? "#fff" : "#000",
                                                border: "1px solid #ccc",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {pageNum}
                                        </button>
                                    ))}

                                    {currentPage < totalPages && (
                                        <button onClick={() => setCurrentPage(currentPage + 1)} style={{ margin: "0 5px" }}>
                                            다음 ▶
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AdminPage;