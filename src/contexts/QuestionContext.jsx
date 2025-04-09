// src/contexts/QuestionContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Context 생성
const QuestionContext = createContext();

// LocalStorage 키
const STORAGE_KEY = "questions";

export const QuestionProvider = ({ children }) => {
    const [questions, setQuestions] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    // localStorage에 저장
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    }, [questions]);

    return (
        <QuestionContext.Provider value={{ questions, setQuestions }}>
            {children}
        </QuestionContext.Provider>
    );
};

// 커스텀 훅
export const useQuestionContext = () => useContext(QuestionContext);
