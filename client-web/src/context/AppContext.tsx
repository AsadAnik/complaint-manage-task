import React, { useState, useContext, createContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

// Context Props
interface AuthContextProps {
  user: null | { email: string };
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { firstname: string; lastname: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  authCheck: () => boolean;
}

// Auth Context
const AuthContext = createContext<AuthContextProps | null>(null);

// Hook for context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be within app provider');
  }
  return context;
};

// Auth Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // LOGIN
  const login = async (userInfo: { email: string; password: string }): Promise<void> => {
    try {
      const response = await axios.post(`http://localhost:3001/api/auth/login`, userInfo, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { accessToken, refreshToken, user } = response.data.user;

      // Save tokens locally (localStorage/sessionStorage or HTTP-only cookies)
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setUser(user);
      toast.success('LoggedIn Successfully');

      if (user.role === 'Customer') {
        navigate('/customer-dashboard');
      } else {
        navigate('/admin-dashboard');
      }

    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials! Please try again.');
    }
  };

  // REGISTER
  const register = async (userInfo: { firstname: string; lastname: string; email: string; password: string }): Promise<void> => {
    try {
      const response = await axios.post(`http://localhost:3001/api/auth/register`, userInfo, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { user } = response.data;
      setUser(user);
      toast.success('User is Registered, Please login with your credentials now!');
      navigate('/');

    } catch (error) {
      console.error('Register error:', error);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await axios.get(`http://localhost:3001/api/user/logout`);

      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      navigate('/');

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // AUTH CHECKER
  const authCheck = (): boolean => {
    return !!(localStorage.getItem('accessToken') && localStorage.getItem('refreshToken'));
  }

  // Context Provider..
  return (
    <AuthContext.Provider value={{ user, login, logout, register, authCheck }}>
      {children}
    </AuthContext.Provider>
  );
};
