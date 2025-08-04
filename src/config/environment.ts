// Configuración de las URLs base de los servicios
export const API_CONFIG = {
  userService: process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'http://localhost:8083',
  bookingService: process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL || 'http://localhost:8082',
  catalogService: process.env.NEXT_PUBLIC_CATALOG_SERVICE_URL || 'http://localhost:8081',
};

// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'R-R Yates Acapulco',
  description: 'Sistema de reservas de yates en Acapulco',
  version: '1.0.0',
};

// Configuración de autenticación
export const AUTH_CONFIG = {
  tokenKey: 'auth_token',
  refreshTokenKey: 'refresh_token',
  tokenExpiryKey: 'token_expiry',
};

// Configuración de paginación
export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  maxPageSize: 100,
};

// Configuración de validación
export const VALIDATION_CONFIG = {
  password: {
    minLength: 6,
    requireUppercase: false,
    requireLowercase: false,
    requireNumbers: false,
    requireSpecialChars: false,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
}; 