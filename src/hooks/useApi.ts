import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const { token } = useAuth();

  const execute = useCallback(
    async (apiCall: () => Promise<T>) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const data = await apiCall();
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        setState({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook específico para operaciones que requieren autenticación
export function useAuthenticatedApi<T>() {
  const { token } = useAuth();
  const apiHook = useApi<T>();

  const executeWithAuth = useCallback(
    async (apiCall: (token: string) => Promise<T>) => {
      if (!token) {
        throw new Error('No hay token de autenticación');
      }
      return apiHook.execute(() => apiCall(token));
    },
    [token, apiHook]
  );

  return {
    ...apiHook,
    execute: executeWithAuth,
  };
} 