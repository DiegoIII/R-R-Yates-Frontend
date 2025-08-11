'use client';

import { useTokenExpiration } from '@/hooks/useTokenExpiration';

export default function TokenExpirationHandler() {
  // Este componente no renderiza nada, solo ejecuta el hook
  // para manejar la expiración del token
  useTokenExpiration();
  
  return null;
}
