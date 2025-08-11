'use client';

import { useState, useEffect } from 'react';
import { Yacht, catalogAPI } from '@/lib/api';
import { Anchor, MapPin, Users, Sailboat, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function YachtList() {
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYachts = async () => {
      try {
        setIsLoading(true);
        const yachtsData = await catalogAPI.getAllYachts();
        setYachts(yachtsData);
        setError(null);
      } catch (err) {
        console.error('Error al obtener yates:', err);
        setError('No se pudieron cargar los yates. Intenta de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchYachts();
  }, []);

  const getYachtTypeIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'MOTOR':
        return '🚤';
      case 'SAILING':
        return '⛵';
      case 'CATAMARAN':
        return '🛥️';
      default:
        return '🚢';
    }
  };

  const getYachtTypeName = (type: string) => {
    switch (type.toUpperCase()) {
      case 'MOTOR':
        return 'Motor';
      case 'SAILING':
        return 'Vela';
      case 'CATAMARAN':
        return 'Catamarán';
      default:
        return type;
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="mt-6 text-gray-600 text-lg font-medium">Cargando yates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl max-w-md mx-auto">
              <p className="text-lg font-medium">Error al cargar yates</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (yachts.length === 0) {
    return (
      <div className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-6 py-4 rounded-xl max-w-md mx-auto">
              <p className="text-lg font-medium">No hay yates disponibles</p>
              <p className="text-sm mt-2">Pronto tendremos más opciones para ti.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🚢 Nuestros Yates Disponibles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra flota de yates de lujo disponibles para tu próxima aventura marítima
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {yachts.map((yacht) => (
            <div
              key={yacht.id}
              className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Imagen del yate */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                {yacht.imageUrl ? (
                  <img
                    src={yacht.imageUrl}
                    alt={yacht.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Sailboat className="w-16 h-16 text-blue-400 mx-auto mb-2" />
                    <p className="text-blue-600 font-medium">{yacht.name}</p>
                  </div>
                )}
              </div>

              {/* Información del yate */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{yacht.name}</h3>
                  <span className="text-2xl">{getYachtTypeIcon(yacht.yachtType)}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {yacht.description}
                </p>

                {/* Características principales */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{yacht.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-green-500" />
                    <span>Capacidad: {yacht.capacity} personas</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Anchor className="w-4 h-4 mr-2 text-purple-500" />
                    <span>Tipo: {getYachtTypeName(yacht.yachtType)}</span>
                  </div>
                </div>

                {/* Precio y disponibilidad */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-lg font-bold text-green-600">
                      ${yacht.price?.toLocaleString()}/día
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      yacht.available ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className={`text-sm font-medium ${
                      yacht.available ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {yacht.available ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-3 mt-4">
                  <Link
                    href={`/booking?yachtId=${yacht.id}`}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {yacht.available ? 'Reservar' : 'Consultar'}
                  </Link>
                  
                  <Link
                    href={`/catalog/${yacht.id}`}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center text-sm"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón para ver más */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
            Ver Todos los Yates
          </button>
        </div>
      </div>
    </div>
  );
}
