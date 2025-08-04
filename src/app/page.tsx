'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function HomePage() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                R-R Yates Acapulco
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700">
                    Bienvenido, {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Bienvenido a R-R Yates Acapulco
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Descubre la mejor experiencia en yates de lujo en las hermosas aguas de Acapulco. 
            Reserva tu aventura marítima con nosotros.
          </p>
          
          {user ? (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Funcionalidades Disponibles
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                    <span className="text-gray-700">Ver Catálogo de Yates</span>
                    <span className="text-green-600">✓ Disponible</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                    <span className="text-gray-700">Crear Reservas</span>
                    <span className="text-green-600">✓ Disponible</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                    <span className="text-gray-700">Gestionar Pagos</span>
                    <span className="text-green-600">✓ Disponible</span>
                  </div>
                  {user.role === 'ADMIN' && (
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-md">
                      <span className="text-gray-700">Panel de Administración</span>
                      <span className="text-yellow-600">✓ Admin</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Ver Catálogo
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Mis Reservas
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-gray-600">
                Para acceder a todas las funcionalidades, por favor inicia sesión o regístrate.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2024 R-R Yates Acapulco. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
