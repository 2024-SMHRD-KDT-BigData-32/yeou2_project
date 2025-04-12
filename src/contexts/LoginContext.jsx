// 수정된 src/contexts/LoginContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Context 생성
const LoginContext = createContext();

// Provider 컴포넌트
export const LoginProvider = ({ children }) => {
    // 로그인 상태
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLogin') === 'true';
    });

    // 관리자 여부
    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('userType') === 'admin';
    });

    // 사용자 ID
    const [userId, setUserId] = useState(() => {
        return localStorage.getItem('userId') || '';
    });

    // 상태 변경 시 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('isLogin', isLoggedIn ? 'true' : 'false');
        localStorage.setItem('userType', isAdmin ? 'admin' : 'user');
        localStorage.setItem('userId', userId);
    }, [isLoggedIn, isAdmin, userId]);

    return (
        <LoginContext.Provider value={{
            isLoggedIn,
            isAdmin,
            setIsLoggedIn,
            setIsAdmin,
            userId,
            setUserId // ✅ 추가됨
        }}>
            {children}
        </LoginContext.Provider>
    );
};

// Custom Hook
export const useLoginContext = () => useContext(LoginContext);
