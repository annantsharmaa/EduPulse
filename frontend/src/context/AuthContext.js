import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          setUser(res.data.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', { email, password });
      localStorage.setItem('token', res.data.data.accessToken);
      setUser(res.data.data.user);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
