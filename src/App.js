
import { Route, Routes } from 'react-router-dom';

import Main from './page/Main';
import Login from './page/Login';
import MyPage from './page/MyPage';
import Search from './page/Search';
import SignUp from './page/SignUp';
import FindID from './page/FindID';
import FindPW from './page/FindPW';
import Product from './page/Product';
import Chatbot from './page/Chatbot';
import AdminProduct from './page/AdminProduct';
import AdminCustomer from './page/AdminCustomer';
import AdminQuestion from './page/AdminQuestion';
import EditProfile from './page/EditProfile';
import Header from './components/jsx/Header';
import Footer from './components/jsx/Footer';
import UserQuestion from './page/UserQuestion';
import UserQuestionList from './page/UserQuestionList';
import UserQuestionDetail from './page/UserQuestionDetail';
import SearchDetail from './page/SearchDetail';
import AdminAnswer from './page/AdminAnswer';
import KakaoCallback from './page/kakaoCallback';
import GoogleCallback from './page/GoogleCallback.jsx';
import AISearch from './page/AISearch.jsx';
import axios from 'axios';
import { useState } from 'react';
import { LoginProvider } from './contexts/LoginContext.jsx';
// import './App.css';

import { QuestionProvider } from './contexts/QuestionContext.jsx'; // ✅ 전역 상태 import
import { useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  return (
    <LoginProvider>
      <QuestionProvider> {/* ✅ 전역 상태로 전체 감싸기 */}
        <div id="wrapper">
          <Header isLoggedIn={isLoggedIn} />
          <hr />
          <div className="content">
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/MyPage' element={<MyPage />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/kakao' element={<KakaoCallback />} />
              <Route path='/gogle' element={<GoogleCallback />} />
              <Route path='/SignUp' element={<SignUp />} />
              <Route path='/FindID' element={<FindID />} />
              <Route path='/FindPW' element={<FindPW />} />
              <Route path='/Search' element={<Search isLoggedIn={isLoggedIn} />} />
              <Route path='/AISearch' element={<AISearch />} /> {/* ✅ 추가된 라우트 */}
              <Route path='/Product' element={<Product />} />
              <Route path='/AdminProduct' element={<AdminProduct />} />
              <Route path='/AdminCustomer' element={<AdminCustomer />} />
              <Route path='/AdminQuestion' element={<AdminQuestion />} />
              <Route path='/EditProfile' element={<EditProfile />} />
              <Route path='/UserQuestion' element={<UserQuestion />} />
              <Route path='/UserQuestionList' element={<UserQuestionList />} />
              <Route path='/question' element={<UserQuestionList />} />
              <Route path='/question/:id' element={<UserQuestionDetail />} />
              <Route path='/search-detail' element={<SearchDetail />} />
              <Route path='/admin-answer/:id' element={<AdminAnswer />} />
            </Routes>
          </div>
          <Chatbot />
          <Footer />
        </div>
      </QuestionProvider>
    </LoginProvider>
  );
}

export default App;
