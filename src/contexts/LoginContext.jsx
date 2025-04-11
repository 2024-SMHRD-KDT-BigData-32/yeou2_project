// src/contexts/LoginContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// Context 생성
const LoginContext = createContext();

// Provider 컴포넌트
export const LoginProvider = ({ children }) => {
    // 초기값은 localStorage에서 불러오기
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLogin') === 'true';
    });

    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('userType') === 'admin';
    });

    // 상태가 변경될 때 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('isLogin', isLoggedIn ? 'true' : 'false');
        localStorage.setItem('userType', isAdmin ? 'admin' : 'user');
    }, [isLoggedIn, isAdmin]);

    return (
        <LoginContext.Provider value={{ isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin }}>
            {children}
        </LoginContext.Provider>
    );
};

// Custom Hook
export const useLoginContext = () => useContext(LoginContext);
