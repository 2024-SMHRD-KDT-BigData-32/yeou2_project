import './App.css';
import { Route, Routes } from 'react-router-dom';
import axios from 'react'

// header에 들어가야 하는 파일 
import Main from './page/Main';

// import Main2 from './page/jsx/Main2';
import Login from './page/Login';
import MyPage from './page/MyPage';
import Search from './page/Search';
import AdminProduct from './page/AdminProduct';

// 메인 화면에 들어가야하는 파일
import SignUp from './page/SignUp';
import FindID from './page/FindID';
import FindPW from './page/FindPW';
import AdminCustomer from './page/AdminCustomer';
import AdminQuestion from './page/AdminQuestion';
import Product from './page/Product';

// header=>비회원, headeruser=> 회원
import HeaderLogin from './components/jsx/HeaderLogin';  
import HeaderLogout from './components/jsx/HeaderLogout';
import Chatbot from './page/Chatbot';
import Footer from './components/jsx/Footer';
import { useState } from 'react';

function App() {
  
  const [headerComponent, setHeaderComponent] = useState(<HeaderLogin/>);

  
  return (
    <div className="App">
      {headerComponent}
      <hr></hr>
      <Routes>
        <Route path='/MyPage' element={<MyPage/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}></Route>
        <Route path='/FindID' element={<FindID/>}></Route>
        <Route path='/FindPW' element={<FindPW/>}></Route>
        <Route path='/Search' element={<Search/>}></Route>
        <Route path='/Product' element={<Product/>}></Route>


        <Route path='/' element={<Main/>}></Route>
        
        {/* <Route path='/2' element={<Main2/>}></Route> */}
        <Route path='/AdminProduct' element={<AdminProduct/>}></Route>
        <Route path='/AdminCustomer' element={<AdminCustomer/>}></Route>
        <Route path='/AdminQuestion' element={<AdminQuestion/>}></Route>
        
        
      </Routes>
      <Footer/>
      <Chatbot/>
    </div>
  );
}

export default App;
