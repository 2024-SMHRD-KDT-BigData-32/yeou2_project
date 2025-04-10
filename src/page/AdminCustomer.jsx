import "../css/AdminCustomer.css";
import { useState, useEffect, useMemo } from "react";
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

    const {
        moveAdminCustomer,
        moveAdminQuestion,
        moveAdminProduct,
    } = useMove(); // 네비게이션 함수

    // 서버에서 회원 데이터를 가져오는 함수 (axios 사용)
    const fetchCustomers = async () => {
        setLoading(true);  // 데이터 로딩 시작
        setError(null); // 이전 에러 초기화
        try {
            const response = await axios.get("http://localhost:8001/getMembers");
            console.log(response)
            console.log(response.data)
            setCustomers(response.data.members || []); // 데이터를 받아와 상태 업데이트
            console.log(customers)
            // console.log(customers.data.members[1].joined_at)
        } catch (err) {
            setError("회원 데이터를 불러오는 데 실패했습니다."); // 에러 상태 업데이트
            console.error("회원 데이터 로딩 오류:", err);
        } finally {
            setLoading(false);  // 데이터 로딩 종료
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
          fetchCustomers();  // 데이터를 가져오는 함수 호출
      }, []);

  
    return (
        <div id="adminCustomer">
            <aside className="sidebar">
                <h2 className="logo"><MdDashboard /> Dashboard</h2>
                <nav>
                    <ul>
                        <li className="active" onClick={() => moveAdminCustomer()}><FiUsers /> Customers</li>
                        <li onClick={() => moveAdminProduct()}><FiUsers /> Product</li>
                        <li onClick={() => moveAdminQuestion()}><FiUsers /> Question</li>
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
                            <h2>
                                {
                                    customers.filter(customer => {
                                        const joinDate = new Date(customer.joined_at);
                                        const now = new Date();
                                        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
                                        return joinDate >= sevenDaysAgo;
                                    }).length
                                }
                            </h2>
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

                    {/* 로딩 중일 때 */}
                    {loading && <p>로딩 중...</p>}
                    {/* 에러가 있을 때 */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {/* 고객 테이블 */}
                    {!loading && !error && (
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
                            {customers.map((customer, index) => (
                                    <tr key={index}>
                                        <td>{customer.mb_name}</td>
                                        <td>{customer.mb_nick}</td>
                                        <td>{customer.mb_email}</td>
                                        <td>{customer.mb_gender}</td>
                                        <td>{customer.mb_birthdate}</td>
                                        <td>{customer.mb_role}</td>
                                    </tr>
                                 ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AdminPage;
