import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useTokenExpiration = () => {
  const { token, logout } = useAuth();
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const expirationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!token) {
      // Limpiar timeouts si no hay token
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
        warningTimeoutRef.current = null;
      }
      if (expirationTimeoutRef.current) {
        clearTimeout(expirationTimeoutRef.current);
        expirationTimeoutRef.current = null;
      }
      return;
    }

    try {
      // Decodificar el token JWT
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      const timeUntilExpiration = payload.exp - currentTime;

      if (timeUntilExpiration <= 0) {
        // Token ya expiró
        logout();
        return;
      }

      // Mostrar advertencia 5 minutos antes de la expiración
      const warningTime = Math.max(timeUntilExpiration - 300, 0) * 1000;
      
      if (warningTime > 0) {
        warningTimeoutRef.current = setTimeout(() => {
          const shouldExtend = window.confirm(
            'Tu sesión expirará en 5 minutos. ¿Deseas mantener la sesión activa?'
          );
          
          if (shouldExtend) {
            // Aquí podrías implementar un refresh token si el backend lo soporta
            // Por ahora, solo mostramos un mensaje
            alert('Para mantener la sesión activa, por favor recarga la página o vuelve a iniciar sesión.');
          }
        }, warningTime);
      }

      // Configurar la expiración automática
      expirationTimeoutRef.current = setTimeout(() => {
        alert('Tu sesión ha expirado. Serás redirigido a la página de inicio de sesión.');
        logout();
      }, timeUntilExpiration * 1000);

    } catch (error) {
      console.error('Error al procesar token:', error);
      logout();
    }

    // Cleanup function
    return () => {
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      if (expirationTimeoutRef.current) {
        clearTimeout(expirationTimeoutRef.current);
      }
    };
  }, [token, logout]);

  // Función para limpiar manualmente los timeouts
  const clearTimeouts = () => {
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
    if (expirationTimeoutRef.current) {
      clearTimeout(expirationTimeoutRef.current);
      expirationTimeoutRef.current = null;
    }
  };

  return { clearTimeouts };
};
