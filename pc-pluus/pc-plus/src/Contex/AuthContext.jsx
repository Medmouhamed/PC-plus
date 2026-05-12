import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  

    useEffect(() => {

        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                }
            } catch (err) {
                console.error("No active session found");
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    // دالة تسجيل الدخول

    const login = async (email, password) => {

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include', 
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                return { success: true };
            } else {
                const errorMsg = data.message || 'Email or password incorrect';
                setError(errorMsg)
                return { success: false, message: errorMsg };
            }
        } catch (err) {
            setError('Connection error');
            return { success: false, message: 'Server error' };
        } finally {
            setLoading(false);
        }
    };

    // تسجيل أول مرة 

    const register = async (name, email, password) => {

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
                credentials: 'include', 
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                return { success: true };
            } else {
                setError(data.message || 'error');
                return { success: false, message: data.message };
            }
        } catch (err) {
            setError('faild connect to server');
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // تسجيل الخروج 

    const logout = async () => {

        try {
            await fetch('http://localhost:5000/api/users/logout', {
                method: 'POST',
                credentials: 'include'

            });
            setUser(null);
        } catch (err) {
            console.error("Logout failed");
        }

    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);