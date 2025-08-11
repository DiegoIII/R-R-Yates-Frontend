'use client';

import { useState } from 'react';
import SessionNotification from './SessionNotification';

export default function SessionNotificationWrapper() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    // Mostrar de nuevo después de 30 segundos
    setTimeout(() => setIsVisible(true), 30000);
  };

  if (!isVisible) {
    return null;
  }

  return <SessionNotification onClose={handleClose} />;
}
