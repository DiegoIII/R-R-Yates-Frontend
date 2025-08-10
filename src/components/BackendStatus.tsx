'use client';

import { useState, useEffect } from 'react';
import { API_CONFIG } from '@/config/environment';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ServiceStatus {
  name: string;
  url: string;
  status: 'checking' | 'online' | 'offline' | 'error';
  responseTime?: number;
  error?: string;
}

export default function BackendStatus() {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Servicio de Usuarios', url: API_CONFIG.userService, status: 'checking' },
    { name: 'Servicio de Reservas', url: API_CONFIG.bookingService, status: 'checking' },
    { name: 'Servicio de Catálogo', url: API_CONFIG.catalogService, status: 'checking' },
  ]);

  const checkService = async (service: ServiceStatus): Promise<ServiceStatus> => {
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${service.url}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Timeout de 5 segundos
        signal: AbortSignal.timeout(5000),
      });
      
      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        return {
          ...service,
          status: 'online',
          responseTime,
        };
      } else {
        return {
          ...service,
          status: 'error',
          error: `HTTP ${response.status}`,
          responseTime,
        };
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      let errorMessage = 'Error desconocido';
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = 'No se pudo conectar';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      return {
        ...service,
        status: 'offline',
        error: errorMessage,
        responseTime,
      };
    }
  };

  const checkAllServices = async () => {
    setServices(prev => prev.map(service => ({ ...service, status: 'checking' })));
    
    const updatedServices = await Promise.all(
      services.map(service => checkService(service))
    );
    
    setServices(updatedServices);
  };

  useEffect(() => {
    checkAllServices();
  }, []);

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'checking':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'online':
        return 'En línea';
      case 'offline':
        return 'Desconectado';
      case 'error':
        return 'Error';
      case 'checking':
        return 'Verificando...';
      default:
        return 'Desconocido';
    }
  };

  const getStatusColor = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'online':
        return 'text-green-600';
      case 'offline':
        return 'text-red-600';
      case 'error':
        return 'text-yellow-600';
      case 'checking':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Estado del Backend</h3>
        <button
          onClick={checkAllServices}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Verificar
        </button>
      </div>
      
      <div className="space-y-3">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(service.status)}
              <div>
                <p className="font-medium text-gray-900">{service.name}</p>
                <p className="text-sm text-gray-500">{service.url}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-medium ${getStatusColor(service.status)}`}>
                {getStatusText(service.status)}
              </p>
              {service.responseTime && (
                <p className="text-xs text-gray-500">
                  {service.responseTime}ms
                </p>
              )}
              {service.error && (
                <p className="text-xs text-red-500 max-w-32 truncate" title={service.error}>
                  {service.error}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Nota:</strong> Si algún servicio aparece como "Desconectado", verifica que el backend esté ejecutándose 
          y que las URLs en la configuración sean correctas.
        </p>
      </div>
    </div>
  );
}
