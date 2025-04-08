import "../css/AdminCustomer.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

import useMove from "../components/Fun.jsx"

const customers = [
    { name: "Jane Cooper", company: "Microsoft", phone: "(225) 555-0118", email: "jane@microsoft.com", country: "United States", status: "Active" },
    { name: "Floyd Miles", company: "Yahoo", phone: "(205) 555-0100", email: "floyd@yahoo.com", country: "Kiribati", status: "Inactive" },
    { name: "Ronald Richards", company: "Adobe", phone: "(302) 555-0107", email: "ronald@adobe.com", country: "Israel", status: "Inactive" },
    { name: "Marvin McKinney", company: "Tesla", phone: "(252) 555-0126", email: "marvin@tesla.com", country: "Iran", status: "Active" },
    { name: "Jerome Bell", company: "Google", phone: "(629) 555-0129", email: "jerome@google.com", country: "Réunion", status: "Active" },
    { name: "Kathryn Murphy", company: "Microsoft", phone: "(408) 555-0120", email: "kathryn@microsoft.com", country: "Curaçao", status: "Active" },
    { name: "Jacob Jones", company: "Yahoo", phone: "(208) 555-0112", email: "jacob@yahoo.com", country: "Brazil", status: "Active" },
    { name: "Kristin Watson", company: "Facebook", phone: "(704) 555-0127", email: "kristin@facebook.com", country: "Åland Islands", status: "Inactive" },
    { name: "Kristin Watson", company: "Facebook", phone: "(704) 555-0127", email: "kristin@facebook.com", country: "Åland Islands", status: "Inactive" },
    { name: "Kristin Watson", company: "Facebook", phone: "(704) 555-0127", email: "kristin@facebook.com", country: "Åland Islands", status: "Inactive" },
];

const AdminPage = () => {
    const [search, setSearch] = useState("");
    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase())
    );

    const {
        moveAdminCustomer,
        moveAdminQuestion,
        moveAdminProduct,
    } = useMove(); // ✅ Hook을 호출하여 네비게이션 함수 가져오기

    return (
        <div id="adminCustomer">
            <aside className="sidebar">
                <h2 className="logo"><MdDashboard /> Dashboard</h2>
                <nav>
                    <ul>
                        <li className="active" onClick={()=>moveAdminCustomer}><FiUsers /> Customers</li>
                        <li onClick={()=>moveAdminProduct()}><FiUsers /> Product</li>
                        <li onClick={()=>moveAdminQuestion()}><FiUsers /> Question</li>
                    </ul>
                </nav>
            </aside>


            <main className="content">
                <header className="header">
                    <h1>Customers</h1>
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
                <section className="customer-table">
                    <h2>전체 유저</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>유저명</th>
                                <th>회사</th>
                                <th>핸드폰 번호</th>
                                <th>Email</th>
                                <th>국가</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer, index) => (
                                <tr key={index}>
                                    <td>{customer.name}</td>
                                    <td>{customer.company}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.country}</td>
                                    <td className={customer.status.toLowerCase()}>{customer.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default AdminPage;
