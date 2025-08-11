"use client";

import React, { useState, useEffect } from 'react';
import { testBackendConnectivity } from '@/lib/api';

interface BackendStatusProps {
  className?: string;
}

export default function BackendStatus({ className = '' }: BackendStatusProps) {
  const [status, setStatus] = useState<{
    user: boolean;
    booking: boolean;
    catalog: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const results = await testBackendConnectivity();
      setStatus(results);
      setLastChecked(new Date());
    } catch (error) {
      console.error('Error checking backend status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
    
    // Verificar cada 30 segundos
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getOverallStatus = () => {
    if (!status) return 'unknown';
    const availableServices = Object.values(status).filter(Boolean).length;
    if (availableServices === 3) return 'connected';
    if (availableServices >= 2) return 'partial';
    return 'disconnected';
  };

  const getStatusColor = (serviceStatus: boolean) => {
    return serviceStatus ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (serviceStatus: boolean) => {
    return serviceStatus ? '🟢' : '🔴';
  };

  const overallStatus = getOverallStatus();

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Estado del Backend</h3>
        <button
          onClick={checkStatus}
          disabled={loading}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Verificando...' : 'Verificar'}
        </button>
      </div>

      {status && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Servicio de Usuarios:</span>
            <span className={`text-sm ${getStatusColor(status.user)}`}>
              {getStatusIcon(status.user)} {status.user ? 'Disponible' : 'No disponible'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Servicio de Catálogo:</span>
            <span className={`text-sm ${getStatusColor(status.catalog)}`}>
              {getStatusIcon(status.catalog)} {status.catalog ? 'Disponible' : 'No disponible'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Servicio de Reservas:</span>
            <span className={`text-sm ${getStatusColor(status.booking)}`}>
              {getStatusIcon(status.booking)} {status.booking ? 'Disponible' : 'No disponible'}
            </span>
          </div>

          <div className="border-t pt-2 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Estado General:</span>
              <span className={`text-sm font-semibold ${
                overallStatus === 'connected' ? 'text-green-600' :
                overallStatus === 'partial' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {overallStatus === 'connected' ? '🟢 Conectado' :
                 overallStatus === 'partial' ? '🟡 Parcialmente Conectado' : '🔴 Desconectado'}
              </span>
            </div>
          </div>
        </div>
      )}

      {lastChecked && (
        <div className="text-xs text-gray-500 mt-3 text-center">
          Última verificación: {lastChecked.toLocaleTimeString()}
        </div>
      )}

      {overallStatus === 'disconnected' && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">
            <strong>Problema de conectividad detectado.</strong> Verifica que todos los servicios del backend estén ejecutándose:
          </p>
          <ul className="text-xs text-red-600 mt-2 space-y-1">
            <li>• Servicio de Usuarios: http://localhost:8083</li>
            <li>• Servicio de Catálogo: http://localhost:8081</li>
            <li>• Servicio de Reservas: http://localhost:8082</li>
          </ul>
        </div>
      )}
    </div>
  );
}
