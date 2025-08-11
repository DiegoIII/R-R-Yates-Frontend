'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface SessionNotificationProps {
  onClose: () => void;
}

export default function SessionNotification({ onClose }: SessionNotificationProps) {
  const { token, logout } = useAuth();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!token) return;

    const updateTimeLeft = () => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        const timeUntilExpiration = payload.exp - currentTime;
        
        if (timeUntilExpiration <= 0) {
          setTimeLeft(0);
          setShowWarning(false);
          logout();
          return;
        }

        setTimeLeft(timeUntilExpiration);

        // Mostrar advertencia cuando queden 5 minutos o menos
        if (timeUntilExpiration <= 300) {
          setShowWarning(true);
        } else {
          setShowWarning(false);
        }
      } catch (error) {
        console.error('Error al procesar token:', error);
        setTimeLeft(0);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [token, logout]);

  if (!showWarning || timeLeft <= 0) {
    return null;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);

  const handleExtendSession = () => {
    // Aquí podrías implementar un refresh token si el backend lo soporta
    alert('Para mantener la sesión activa, por favor recarga la página o vuelve a iniciar sesión.');
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed top-20 right-4 z-50 bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-yellow-800 text-sm font-bold">!</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">
            Sesión por expirar
          </h3>
          <p className="text-sm text-yellow-700 mb-3">
            Tu sesión expirará en{' '}
            <span className="font-mono font-bold">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleExtendSession}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Extender
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-yellow-400 hover:text-yellow-600"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
