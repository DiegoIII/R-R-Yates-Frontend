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
  backendStatus: 'connected' | 'disconnected' | 'unknown';
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
  const [backendStatus, setBackendStatus] = useState<'connected' | 'disconnected' | 'unknown'>('unknown');

  // Función para verificar si un token es válido
  const isTokenValid = (token: string): boolean => {
    try {
      // Decodificar el token JWT (solo la parte del payload)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      // Verificar si el token ha expirado
      if (payload.exp && payload.exp < currentTime) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error al verificar token:', error);
      return false;
    }
  };

  // Función para verificar el estado del backend
  const checkBackendStatus = async () => {
    try {
      // Intentar hacer una petición simple al backend
      const response = await fetch('http://localhost:8081/api/catalog/yachts');
      if (response.ok) {
        setBackendStatus('connected');
        return true;
      }
    } catch (error) {
      console.log('Backend no disponible:', error);
      setBackendStatus('disconnected');
      return false;
    }
    return false;
  };

  // Función para cargar la sesión desde localStorage
  const loadSession = async () => {
    try {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (savedToken && savedUser) {
        // Verificar si el token es válido
        if (isTokenValid(savedToken)) {
          setToken(savedToken);
          
          // Solo intentar obtener información del usuario si el backend está disponible
          const backendAvailable = await checkBackendStatus();
          
          if (backendAvailable) {
            try {
              // Intentar obtener la información actualizada del usuario
              const currentUser = await authAPI.getCurrentUser(savedToken);
              setUser(currentUser);
              
              // Actualizar la información del usuario en localStorage
              localStorage.setItem('user', JSON.stringify(currentUser));
            } catch (error) {
              console.log('Error al obtener usuario actual, usando información guardada:', error);
              
              // Si falla, usar la información guardada
              const parsedUser = JSON.parse(savedUser);
              setUser(parsedUser);
            }
          } else {
            // Si el backend no está disponible, usar la información guardada
            console.log('Backend no disponible, usando información de sesión guardada');
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
          }
        } else {
          // Token expirado, limpiar sesión
          clearSession();
        }
      } else {
        // Verificar estado del backend aunque no haya sesión
        await checkBackendStatus();
      }
    } catch (error) {
      console.error('Error al cargar sesión:', error);
      clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  // Función para limpiar la sesión
  const clearSession = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Función para verificar periódicamente el token
  const checkTokenValidity = () => {
    if (token && !isTokenValid(token)) {
      console.log('Token expirado, cerrando sesión');
      clearSession();
    }
  };

  useEffect(() => {
    // Cargar sesión al montar el componente
    loadSession();
    
    // Verificar validez del token cada 5 minutos
    const interval = setInterval(checkTokenValidity, 5 * 60 * 1000);
    
    // Verificar validez del token cuando se cambia la ventana
    const handleVisibilityChange = () => {
      if (!document.hidden && token) {
        checkTokenValidity();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [token]);

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      
      // Verificar que el backend esté disponible antes de intentar hacer login
      const backendAvailable = await checkBackendStatus();
      if (!backendAvailable) {
        throw new Error('El servidor no está disponible. Por favor, verifica tu conexión e intenta nuevamente.');
      }
      
      const response: LoginResponse = await authAPI.login(credentials);
      
      // Verificar que el token sea válido
      if (!response.token || !isTokenValid(response.token)) {
        throw new Error('Token inválido recibido del servidor');
      }
      
      setToken(response.token);
      localStorage.setItem('token', response.token);
      
      // Obtener información completa del usuario
      try {
        const userData = await authAPI.getCurrentUser(response.token);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Error al obtener usuario después del login:', error);
        
        // Si falla getCurrentUser, usar la información del login si está disponible
        if (response.user) {
          setUser(response.user);
          localStorage.setItem('user', JSON.stringify(response.user));
        } else {
          // Crear usuario básico como fallback
          const userData: User = {
            email: credentials.email,
            name: credentials.email.split('@')[0],
            role: 'USER'
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: User) => {
    try {
      setIsLoading(true);
      
      // Verificar que el backend esté disponible
      const backendAvailable = await checkBackendStatus();
      if (!backendAvailable) {
        throw new Error('El servidor no está disponible. Por favor, verifica tu conexión e intenta nuevamente.');
      }
      
      const newUser = await authAPI.register(userData);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearSession();
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    backendStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 