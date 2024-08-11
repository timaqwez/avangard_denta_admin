import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

export interface Account {
  id: number,
  username: string,
  roles: {
    id: number,
    name: string,
    role_id: number,
  }[],
  permissions: string[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL: string = import.meta.env.VITE_API_URL

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(Cookies.get('token') || null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkToken = async () => {
    if (!token) {
      if (location.pathname != '/login' && location.pathname != '/register') {
          navigate('/login');
      }
    } else {
      if (location.pathname == '/login' || location.pathname == '/register') {
          navigate('/promotions');
      }
      Cookies.set('token', token);
      const response = await axios.get(API_URL + '/admin/accounts/get', {params: {token: token} } );
      if (response.data.state === 'successful') {
        localStorage.setItem('account', JSON.stringify(response.data.account))
      } else {
        Cookies.remove('token')
        navigate('/login');
        alert('Данный администратор имеет статус "неактивный" либо удален.')
        window.location.reload();
      }
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
