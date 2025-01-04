'use client';

import React, { createContext } from 'react';

type AuthContextType = {
  addToken: (token: string) => void;
  getToken: () => string | null;
  removeToken: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  addToken: (token: string) => {},
  getToken: () => '',
  removeToken: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const addToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const removeToken = () => {
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ addToken, getToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
