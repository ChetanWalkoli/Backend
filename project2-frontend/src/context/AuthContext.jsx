import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('spotify_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/login', credentials);
      const userData = res.data.user;
      const token = res.data.token;
      setUser(userData);
      localStorage.setItem('spotify_user', JSON.stringify(userData));
      if (token) localStorage.setItem('spotify_token', token);
      return { success: true, user: userData };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed',
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/register', userData);
      const newUser = res.data.user;
      const token = res.data.token;
      setUser(newUser);
      localStorage.setItem('spotify_user', JSON.stringify(newUser));
      if (token) localStorage.setItem('spotify_token', token);
      return { success: true, user: newUser };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed',
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.warn('Logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('spotify_user');
      localStorage.removeItem('spotify_token');
    }
  };

  const isArtist = user?.role === 'artist';

  return (
    <AuthContext.Provider
      value={{
        user,
        isArtist,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

