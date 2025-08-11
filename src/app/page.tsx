"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import YachtList from "@/components/YachtList";
import Navbar from "@/components/Navbar";
import { ArrowRight, Star, Shield, Clock, MapPin } from "lucide-react";

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

      {/* Hero Section - Improved */}
      <section className="relative overflow-hidden">
        {/* Background with animated elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-cyan-400/20"></div>
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-300/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-indigo-300/30 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-300/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Logo and Title */}
            <div className="mb-12">
              <div className="relative w-28 h-28 mx-auto mb-8 animate-float">
                <Image
                  src="/logo-ancla.png"
                  alt="R-R Yates Logo"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
                Bienvenido a{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                  R-R Yates
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-indigo-600 font-semibold mb-6">
                Acapulco
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Descubre la mejor experiencia en yates de lujo en las hermosas
                aguas de Acapulco. Navega hacia la aventura con elegancia y
                confort.
              </p>
            </div>

            {/* User-specific content */}
            {user ? (
              <div className="space-y-12">
                {/* Features Grid */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-12 max-w-4xl mx-auto border border-blue-100">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    🚢 Funcionalidades Disponibles
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">⛵</span>
                        <span className="text-gray-700 font-semibold text-lg">
                          Ver Catálogo de Yates
                        </span>
                      </div>
                      <span className="text-green-600 font-bold text-lg">
                        ✓ Disponible
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">📅</span>
                        <span className="text-gray-700 font-semibold text-lg">
                          Crear Reservas
                        </span>
                      </div>
                      <span className="text-green-600 font-bold text-lg">
                        ✓ Disponible
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">💳</span>
                        <span className="text-gray-700 font-semibold text-lg">
                          Gestionar Pagos
                        </span>
                      </div>
                      <span className="text-green-600 font-bold text-lg">
                        ✓ Disponible
                      </span>
                    </div>
                    {user.role === "ADMIN" && (
                      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <span className="text-3xl">⚙️</span>
                          <span className="text-gray-700 font-semibold text-lg">
                            Panel de Administración
                          </span>
                        </div>
                        <span className="text-yellow-600 font-bold text-lg">
                          ✓ Admin
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                  <Link
                    href="/catalog"
                    className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 text-xl text-center flex items-center justify-center space-x-3"
                  >
                    <span>🚢 Ver Catálogo</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/booking"
                    className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 text-xl text-center flex items-center justify-center space-x-3"
                  >
                    <span>📋 Mis Reservas</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Call to Action */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-12 max-w-3xl mx-auto border border-blue-100">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    🌊 Comienza tu Aventura
                  </h3>
                  <p className="text-gray-600 text-xl text-center mb-8 leading-relaxed">
                    Para acceder a todas las funcionalidades y reservar tu yate
                    de ensueño, por favor inicia sesión o regístrate.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                    <Link
                      href="/login"
                      className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 text-xl text-center flex items-center justify-center space-x-3"
                    >
                      <span>Iniciar Sesión</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/register"
                      className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 text-xl text-center flex items-center justify-center space-x-3"
                    >
                      <span>Registrarse</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Yates Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Clientes Satisfechos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Soporte Disponible</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">5★</div>
              <div className="text-gray-600 font-medium">Calificación Promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Improved */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Por qué elegir R-R Yates?
            </h3>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ofrecemos la mejor experiencia en navegación de lujo en Acapulco con servicios premium
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🌟</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Experiencia Premium
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Yates de lujo con los más altos estándares de calidad y
                servicio personalizado.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🌊</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Aguas Cristalinas
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Navega por las hermosas aguas de la bahía de Acapulco con vistas espectaculares.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Reservas Fáciles
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Sistema intuitivo para reservar tu yate en pocos clics con confirmación instantánea.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🛡️</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Seguridad Garantizada
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Todos nuestros yates cumplen con los más altos estándares de seguridad marítima.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">⏰</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Disponibilidad 24/7
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Reserva en cualquier momento del día con nuestro sistema disponible las 24 horas.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📍</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Ubicación Privilegiada
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Situados en el corazón de Acapulco, con fácil acceso desde cualquier punto de la ciudad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Yacht List Section */}
      <YachtList />

      {/* Footer CTA Section - New */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para tu Aventura?
          </h3>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Descubre la libertad de navegar por las aguas de Acapulco con R-R Yates
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <Link
              href="/catalog"
              className="group bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 text-xl text-center flex items-center justify-center space-x-3"
            >
              <span>Explorar Yates</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            {!user && (
              <Link
                href="/register"
                className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 text-xl text-center flex items-center justify-center space-x-3"
              >
                <span>Registrarse Ahora</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
