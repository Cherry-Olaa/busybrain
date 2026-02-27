// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import api from '@/lib/api';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'staff' | 'student';
  token: string;
  refresh: string;
  assignedClasses?: string[];
  admissionNumber?: string;
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
    // Check localStorage on initial load
    const token = localStorage.getItem('token');
    const refresh = localStorage.getItem('refresh');
    const role = localStorage.getItem('role') as User['role'];
    const name = localStorage.getItem('name');
    const id = localStorage.getItem('id');
    const assignedClasses = localStorage.getItem('assignedClasses');
    const admissionNumber = localStorage.getItem('admissionNumber');
    
    if (token && refresh && role && name && id) {
      return { 
        id, 
        token, 
        refresh, 
        role, 
        name,
        assignedClasses: assignedClasses ? JSON.parse(assignedClasses) : undefined,
        admissionNumber: admissionNumber || undefined
      };
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

      console.log("Login request:", body);
      
      const res = await api.post('/auth/login', body);
      console.log("Login response:", res.data);

      const data = res.data;

      // Validate response
      if (!data.token || !data.refresh || !data.role || !data.name || !data.id) {
        throw new Error("Invalid response from server");
      }

      // Save in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      localStorage.setItem('id', data.id);
      
      if (data.assignedClasses) {
        localStorage.setItem('assignedClasses', JSON.stringify(data.assignedClasses));
      }
      
      if (data.admissionNumber) {
        localStorage.setItem('admissionNumber', data.admissionNumber);
      }

      // Update user state
      const userData: User = {
        id: data.id,
        token: data.token,
        refresh: data.refresh,
        role: data.role,
        name: data.name,
        assignedClasses: data.assignedClasses,
        admissionNumber: data.admissionNumber,
      };
      
      setUser(userData);

    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
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
      value={{ 
        user, 
        loading, 
        login, 
        logout, 
        isAuthenticated: !!user, 
        setUser 
      }}
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