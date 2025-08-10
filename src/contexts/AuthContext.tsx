'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, LoginResponse, authAPI } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token guardado al cargar la aplicación
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // Aquí podrías validar el token con el backend
      // Por ahora solo lo guardamos
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response: LoginResponse = await authAPI.login(credentials);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      
      // Si el backend devuelve información del usuario, la usamos
      if (response.user) {
        setUser(response.user);
      } else {
        // Por ahora, creamos un usuario básico con la información disponible
        // En el futuro, esto se puede reemplazar con getCurrentUser cuando funcione
        const userData: User = {
          email: credentials.email,
          name: credentials.email.split('@')[0], // Usar parte del email como nombre temporal
          role: 'USER'
        };
        setUser(userData);
      }
      
      // Comentamos la llamada a getCurrentUser hasta que funcione
      // const userData = await authAPI.getCurrentUser(response.token);
      // setUser(userData);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const register = async (userData: User) => {
    try {
      const newUser = await authAPI.register(userData);
      setUser(newUser);
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 