import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('voting_token') || null);
  const [loading, setLoading] = useState(true);

  // Fetch profile on initial mount or token change
  useEffect(() => {
    const loadProfile = async () => {
      if (token) {
        try {
          const res = await api.getProfile();
          setUser(res.user);
        } catch (err) {
          console.error('Session expired or invalid token:', err);
          logout();
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    loadProfile();
  }, [token]);

  const login = async (credentials) => {
    const res = await api.login(credentials);
    if (res.token) {
      localStorage.setItem('voting_token', res.token);
      setToken(res.token);
      // Load user profile right after login
      const profileRes = await api.getProfile();
      setUser(profileRes.user);
    }
    return res;
  };

  const signup = async (userData) => {
    const res = await api.signup(userData);
    if (res.token) {
      localStorage.setItem('voting_token', res.token);
      setToken(res.token);
      if (res.response) {
        setUser(res.response);
      }
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('voting_token');
    setToken(null);
    setUser(null);
  };

  const refreshProfile = async () => {
    if (token) {
      try {
        const res = await api.getProfile();
        setUser(res.user);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const isAdmin = user?.roles === 'admin';
  const isVoter = user?.roles === 'voter';
  const hasVoted = user?.isVoted || false;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        refreshProfile,
        isAdmin,
        isVoter,
        hasVoted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
