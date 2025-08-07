import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient, User } from '../lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateUserLanguage: (language: "en" | "hi") => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const currentUser = await apiClient.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Failed to get current user:', error);
          localStorage.removeItem('auth_token');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ email, password });
      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (userData: any) => {
    try {
      const response = await apiClient.signup(userData);
      setUser(response.user);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    apiClient.clearToken();
    setUser(null);
  };

  const updateUserLanguage = async (language: "en" | "hi") => {
    try {
      await apiClient.updateLanguage(language);
      if (user) {
        setUser({ ...user, language });
      }
    } catch (error) {
      console.error('Failed to update language:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      logout,
      updateUserLanguage
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
