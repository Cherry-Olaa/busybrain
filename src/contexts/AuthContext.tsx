// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'staff' | 'student';
  token: string;
  refresh: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (usernameOrAdmission: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');
    const refresh = localStorage.getItem('refresh');
    const role = localStorage.getItem('role') as User['role'];
    const name = localStorage.getItem('name') || undefined;
    const id = localStorage.getItem('id') || undefined;
    if (token && refresh && role && name && id) {
      return { id, token, refresh, role, name } as User;
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (usernameOrAdmission: string, password: string) => {
    setLoading(true);
    try {
      const body = usernameOrAdmission.includes('/')
        ? { admissionNumber: usernameOrAdmission, password }
        : { username: usernameOrAdmission, password };

      const res = await api.post('/auth/login', body);
      const data = res.data;

      const userData: User = {
        id: data.id,
        token: data.token,
        refresh: data.refresh,
        role: data.role,
        name: data.name,
      };

      // Save in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      localStorage.setItem('id', data.id);

      setUser(userData);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated: !!user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};