"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import YachtList from "@/components/YachtList";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-gray-600 text-lg font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-cyan-400/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Image
                  src="/logo-ancla.png"
                  alt="R-R Yates Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Bienvenido a{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                  R-R Yates Acapulco
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Descubre la mejor experiencia en yates de lujo en las hermosas
                aguas de Acapulco. Navega hacia la aventura con elegancia y
                confort.
              </p>
            </div>

            {user ? (
              <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    🚢 Funcionalidades Disponibles
                  </h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">⛵</span>
                        <span className="text-gray-700 font-medium">
                          Ver Catálogo de Yates
                        </span>
                      </div>
                      <span className="text-green-600 font-semibold">
                        ✓ Disponible
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">📅</span>
                        <span className="text-gray-700 font-medium">
                          Crear Reservas
                        </span>
                      </div>
                      <span className="text-green-600 font-semibold">
                        ✓ Disponible
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">💳</span>
                        <span className="text-gray-700 font-medium">
                          Gestionar Pagos
                        </span>
                      </div>
                      <span className="text-green-600 font-semibold">
                        ✓ Disponible
                      </span>
                    </div>
                    {user.role === "ADMIN" && (
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">⚙️</span>
                          <span className="text-gray-700 font-medium">
                            Panel de Administración
                          </span>
                        </div>
                        <span className="text-yellow-600 font-semibold">
                          ✓ Admin
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link
                    href="/catalog"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg text-center"
                  >
                    🚢 Ver Catálogo
                  </Link>
                  <Link
                    href="/booking"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg text-center"
                  >
                    📋 Mis Reservas
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    🌊 Comienza tu Aventura
                  </h3>
                  <p className="text-gray-600 text-lg text-center mb-6">
                    Para acceder a todas las funcionalidades y reservar tu yate
                    de ensueño, por favor inicia sesión o regístrate.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link
                      href="/login"
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg text-center"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/register"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg text-center"
                    >
                      Registrarse
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir R-R Yates?
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos la mejor experiencia en navegación de lujo en Acapulco
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">🌟</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Experiencia Premium
              </h4>
              <p className="text-gray-600">
                Yates de lujo con los más altos estándares de calidad y
                servicio.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">🌊</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Aguas Cristalinas
              </h4>
              <p className="text-gray-600">
                Navega por las hermosas aguas de la bahía de Acapulco.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Reservas Fáciles
              </h4>
              <p className="text-gray-600">
                Sistema intuitivo para reservar tu yate en pocos clics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Yacht List Section */}
      <YachtList />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo-ancla.png"
                  alt="R-R Yates Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-xl font-bold">R-R Yates Acapulco</h4>
            </div>
            <p className="text-gray-300 text-lg mb-4">
              Tu puerta de entrada a la aventura marítima en Acapulco
            </p>
            <p className="text-gray-400">
              © 2024 R-R Yates Acapulco. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
