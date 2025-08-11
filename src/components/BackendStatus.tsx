"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function BackendStatus() {
  const { backendStatus } = useAuth();
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // Solo mostrar el estado si hay un problema de conexión
    if (backendStatus === 'disconnected') {
      setShowStatus(true);
    } else {
      setShowStatus(false);
    }
  }, [backendStatus]);

  if (!showStatus) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800 mb-2">
            Problema de Conexión
          </h3>
          <p className="text-sm text-red-700 mb-3">
            No se puede conectar al servidor. Algunas funcionalidades pueden no estar disponibles.
          </p>
          <div className="text-xs text-red-600">
            <p>• Verifica tu conexión a internet</p>
            <p>• El servidor puede estar en mantenimiento</p>
            <p>• Intenta recargar la página más tarde</p>
          </div>
        </div>
        <button
          onClick={() => setShowStatus(false)}
          className="flex-shrink-0 text-red-400 hover:text-red-600"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
