// src/contexts/LoginContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// Context 생성
const LoginContext = createContext();

// Provider
export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const loginStatus = localStorage.getItem('isLogin');
        const userType = localStorage.getItem('userType');

        if (loginStatus === 'true') {
            setIsLoggedIn(true);
            setIsAdmin(userType === 'admin');
        }
    }, []);

    return (
        <LoginContext.Provider value={{ isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin }}>
            {children}
        </LoginContext.Provider>
    );
};

// Custom Hook
export const useLoginContext = () => useContext(LoginContext);
