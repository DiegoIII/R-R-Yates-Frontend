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
      // Verificar todos los servicios del backend
      const services = [
        { name: 'catalog', url: 'http://localhost:8081/api/catalog/yachts' },
        { name: 'booking', url: 'http://localhost:8082/api/bookings' },
        { name: 'user', url: 'http://localhost:8083/api/users/register' } // Usar endpoint público
      ];
      
      let availableServices = 0;
      
      for (const service of services) {
        try {
          const response = await fetch(service.url, { 
            method: 'GET',
            // Agregar timeout para evitar esperas largas
            signal: AbortSignal.timeout(5000)
          });
          
          if (response.ok || response.status === 405) { // 405 Method Not Allowed también indica que el servicio está vivo
            availableServices++;
            console.log(`Servicio ${service.name} disponible`);
          }
        } catch (error) {
          console.log(`Servicio ${service.name} no disponible:`, error);
        }
      }
      
      // Considerar el backend disponible si al menos 2 de 3 servicios responden
      const isAvailable = availableServices >= 2;
      
      if (isAvailable) {
        setBackendStatus('connected');
        console.log(`Backend disponible: ${availableServices}/3 servicios respondiendo`);
      } else {
        setBackendStatus('disconnected');
        console.log(`Backend no disponible: solo ${availableServices}/3 servicios respondiendo`);
      }
      
      return isAvailable;
    } catch (error) {
      console.log('Error al verificar estado del backend:', error);
      setBackendStatus('disconnected');
      return false;
    }
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
              // Intentar obtener la información actualizada del usuario con retry logic
              let currentUser: User | null = null;
              let retryCount = 0;
              const maxRetries = 2;
              
              while (retryCount < maxRetries && !currentUser) {
                try {
                  if (retryCount > 0) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                  }
                  
                  currentUser = await authAPI.getCurrentUser(savedToken);
                  console.log('Usuario actual obtenido exitosamente en intento', retryCount + 1);
                  break;
                } catch (error) {
                  retryCount++;
                  console.log(`Intento ${retryCount} de obtener usuario actual falló:`, error);
                  
                  // Si es un error de autenticación, no seguir intentando
                  if (error instanceof Error && (error.message.includes('Token inválido') || error.message.includes('Acceso denegado'))) {
                    break;
                  }
                }
              }
              
              if (currentUser) {
                setUser(currentUser);
                localStorage.setItem('user', JSON.stringify(currentUser));
              } else {
                // Si falla después de todos los intentos, usar la información guardada
                console.log('Usando información de usuario guardada después de fallar getCurrentUser');
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
              }
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
      
      // Obtener información completa del usuario con retry logic
      let userData: User | null = null;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries && !userData) {
        try {
          // Esperar un poco antes de intentar obtener el usuario (para dar tiempo al backend)
          if (retryCount > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }
          
          userData = await authAPI.getCurrentUser(response.token);
          console.log('Usuario obtenido exitosamente en intento', retryCount + 1);
          break;
        } catch (error) {
          retryCount++;
          console.log(`Intento ${retryCount} de obtener usuario falló:`, error);
          
          // Si es el último intento o es un error de autenticación, no seguir intentando
          if (retryCount >= maxRetries || 
              (error instanceof Error && (error.message.includes('Token inválido') || error.message.includes('Acceso denegado')))) {
            break;
          }
        }
      }
      
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        // Si falla getCurrentUser después de todos los intentos, usar la información del login si está disponible
        if (response.user) {
          setUser(response.user);
          localStorage.setItem('user', JSON.stringify(response.user));
        } else {
          // Crear usuario básico como fallback
          const fallbackUser: User = {
            email: credentials.email,
            name: credentials.email.split('@')[0],
            role: 'USER'
          };
          setUser(fallbackUser);
          localStorage.setItem('user', JSON.stringify(fallbackUser));
        }
        
        console.log('Usando información de usuario fallback después de fallar getCurrentUser');
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