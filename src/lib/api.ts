import { API_CONFIG } from '@/config/environment';

// Configuración de las URLs base de los servicios
const API_BASE_URLS = {
  user: API_CONFIG.userService,
  booking: API_CONFIG.bookingService, 
  catalog: API_CONFIG.catalogService
};

// Tipos de datos
export interface User {
  id?: string;
  email: string;
  password?: string;
  name: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: User; // Agregar información del usuario si está disponible
}

export interface Yacht {
  id?: number;
  name: string;
  description: string;
  location: string;
  yachtType: string;
  capacity: number;
  price: number;
  available: boolean;
  imageUrl?: string;
}

export interface Booking {
  id?: number;
  userId: string;
  yachtId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  paymentConfirmed?: boolean;
}

// Funciones de autenticación
export const authAPI = {
  async register(user: User): Promise<User> {
    const response = await fetch(`${API_BASE_URLS.user}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    
    if (!response.ok) {
      throw new Error('Error en el registro');
    }
    
    return response.json();
  },

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('Intentando hacer login en:', `${API_BASE_URLS.user}/api/users/login`);
      console.log('Credenciales:', { email: credentials.email, password: '***' });
      
      const response = await fetch(`${API_BASE_URLS.user}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      console.log('Respuesta del servidor de login:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error del servidor de login:', errorText);
        throw new Error(`Error en login: ${response.status} ${response.statusText}`);
      }
      
      const loginData = await response.json();
      console.log('Login exitoso, token recibido:', loginData.token ? `${loginData.token.substring(0, 10)}...` : 'No token');
      console.log('Datos completos de login:', loginData);
      return loginData;
    } catch (error) {
      console.error('Error completo en login:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error(`No se pudo conectar al servidor de autenticación. Verifica que el backend esté ejecutándose en ${API_BASE_URLS.user}`);
      }
      throw error;
    }
  },

  async getCurrentUser(token: string): Promise<User> {
    try {
      console.log('Intentando obtener usuario actual desde:', `${API_BASE_URLS.user}/api/users/me`);
      console.log('Token:', token ? `${token.substring(0, 10)}...` : 'No token');
      
      const response = await fetch(`${API_BASE_URLS.user}/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      console.log('Respuesta del servidor:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        throw new Error(`Error al obtener usuario: ${response.status} ${response.statusText}`);
      }
      
      const userData = await response.json();
      console.log('Usuario obtenido exitosamente:', userData);
      return userData;
    } catch (error) {
      console.error('Error completo en getCurrentUser:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error(`No se pudo conectar al servidor. Verifica que el backend esté ejecutándose en ${API_BASE_URLS.user}`);
      }
      throw error;
    }
  }
};

// Funciones del catálogo
export const catalogAPI = {
  async getAllYachts(onlyAvailable: boolean = false): Promise<Yacht[]> {
    const response = await fetch(
      `${API_BASE_URLS.catalog}/api/catalog/yachts?onlyAvailable=${onlyAvailable}`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener yates');
    }
    
    return response.json();
  },

  async getYachtById(id: number): Promise<Yacht> {
    const response = await fetch(`${API_BASE_URLS.catalog}/api/catalog/yachts/${id}`);
    
    if (!response.ok) {
      throw new Error('Yate no encontrado');
    }
    
    return response.json();
  },

  async createYacht(yacht: Omit<Yacht, 'id'>, token: string): Promise<Yacht> {
    const response = await fetch(`${API_BASE_URLS.catalog}/api/catalog/yachts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(yacht),
    });
    
    if (!response.ok) {
      throw new Error('Error al crear yate');
    }
    
    return response.json();
  },

  async updateYacht(id: number, yacht: Omit<Yacht, 'id'>, token: string): Promise<Yacht> {
    const response = await fetch(`${API_BASE_URLS.catalog}/api/catalog/yachts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(yacht),
    });
    
    if (!response.ok) {
      throw new Error('Error al actualizar yate');
    }
    
    return response.json();
  },

  async deleteYacht(id: number, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URLS.catalog}/api/catalog/yachts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al eliminar yate');
    }
  },

  async setYachtAvailability(id: number, available: boolean, token: string): Promise<Yacht> {
    const response = await fetch(
      `${API_BASE_URLS.catalog}/api/catalog/yachts/${id}/availability?available=${available}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Error al cambiar disponibilidad');
    }
    
    return response.json();
  },

  async searchYachts(params: {
    location?: string;
    yachtType?: string;
    minCapacity?: number;
    maxPrice?: number;
  }): Promise<Yacht[]> {
    const searchParams = new URLSearchParams();
    if (params.location) searchParams.append('location', params.location);
    if (params.yachtType) searchParams.append('yachtType', params.yachtType);
    if (params.minCapacity) searchParams.append('minCapacity', params.minCapacity.toString());
    if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
    
    const response = await fetch(
      `${API_BASE_URLS.catalog}/api/catalog/yachts/search?${searchParams.toString()}`
    );
    
    if (!response.ok) {
      throw new Error('Error en la búsqueda');
    }
    
    return response.json();
  },

  async getYachtsByType(yachtType: string): Promise<Yacht[]> {
    const response = await fetch(
      `${API_BASE_URLS.catalog}/api/catalog/yachts/type/${yachtType}`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener yates por tipo');
    }
    
    return response.json();
  },

  async getYachtsByLocation(location: string): Promise<Yacht[]> {
    const response = await fetch(
      `${API_BASE_URLS.catalog}/api/catalog/yachts/location?location=${location}`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener yates por ubicación');
    }
    
    return response.json();
  }
};

// Funciones de reservas
export const bookingAPI = {
  async createBooking(booking: Omit<Booking, 'id'>, token: string): Promise<Booking> {
    const response = await fetch(`${API_BASE_URLS.booking}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(booking),
    });
    
    if (!response.ok) {
      throw new Error('Error al crear reserva');
    }
    
    return response.json();
  },

  async getAllBookings(token: string): Promise<Booking[]> {
    const response = await fetch(`${API_BASE_URLS.booking}/api/bookings`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener reservas');
    }
    
    return response.json();
  },

  async getBookingById(id: number, token: string): Promise<Booking> {
    const response = await fetch(`${API_BASE_URLS.booking}/api/bookings/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Reserva no encontrada');
    }
    
    return response.json();
  },

  async deleteBooking(id: number, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URLS.booking}/api/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al eliminar reserva');
    }
  },

  async confirmPayment(id: number, token: string): Promise<Booking> {
    const response = await fetch(`${API_BASE_URLS.booking}/api/bookings/${id}/pay`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al confirmar pago');
    }
    
    return response.json();
  }
}; 