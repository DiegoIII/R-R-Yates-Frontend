"use client";

import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function BookingPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="mt-6 text-gray-600 text-lg font-medium">Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Acceso Requerido
            </h1>
            <p className="text-gray-600 mb-6">
              Debes iniciar sesión para acceder a tus reservas.
            </p>
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-4 text-blue-700">
            Mis Reservas
          </h1>
          <p className="text-xl text-gray-600">
            Gestiona y revisa todas tus reservas de yates
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No tienes reservas aún
            </h2>
            <p className="text-gray-600 mb-6">
              Explora nuestro catálogo de yates y crea tu primera reserva
            </p>
            <Link
              href="/catalog"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ver Catálogo
            </Link>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-100 text-center">
            <div className="text-3xl mb-3">🚢</div>
            <h3 className="font-semibold text-gray-900 mb-2">Reservas Activas</h3>
            <p className="text-gray-600 text-sm">
              Revisa el estado de tus reservas confirmadas
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-100 text-center">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-900 mb-2">Historial</h3>
            <p className="text-gray-600 text-sm">
              Consulta tus reservas anteriores
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-100 text-center">
            <div className="text-3xl mb-3">💳</div>
            <h3 className="font-semibold text-gray-900 mb-2">Pagos</h3>
            <p className="text-gray-600 text-sm">
              Gestiona tus métodos de pago
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
