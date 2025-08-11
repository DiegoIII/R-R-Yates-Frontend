'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Yacht, catalogAPI } from '@/lib/api';
import { Anchor, MapPin, Users, Sailboat, ArrowLeft, Star, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function YachtDetailPage() {
  const params = useParams();
  const yachtId = params.id as string;
  const [yacht, setYacht] = useState<Yacht | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYacht = async () => {
      try {
        setIsLoading(true);
        const yachtsData = await catalogAPI.getAllYachts();
        const foundYacht = yachtsData.find(y => y.id === parseInt(yachtId));
        
        if (foundYacht) {
          setYacht(foundYacht);
        } else {
          setError('Yate no encontrado');
        }
      } catch (err) {
        console.error('Error al obtener el yate:', err);
        setError('No se pudo cargar la información del yate. Intenta de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    if (yachtId) {
      fetchYacht();
    }
  }, [yachtId]);

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="mt-6 text-gray-600 text-lg font-medium">Cargando detalles del yate...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !yacht) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl max-w-md mx-auto">
              <p className="text-lg font-medium">Error</p>
              <p className="text-sm mt-2">{error || 'Yate no encontrado'}</p>
              <Link
                href="/catalog"
                className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Volver al Catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/catalog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Catálogo
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          {/* Imagen del yate */}
          <div className="h-96 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
            {yacht.imageUrl ? (
              <img
                src={yacht.imageUrl}
                alt={yacht.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <Sailboat className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                <p className="text-blue-600 font-medium text-xl">{yacht.name}</p>
              </div>
            )}
          </div>

          {/* Información del yate */}
          <div className="p-8">
            {/* Header con nombre y tipo */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{yacht.name}</h1>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{getYachtTypeIcon(yacht.yachtType)}</span>
                  <span className="text-lg text-gray-600">{getYachtTypeName(yacht.yachtType)}</span>
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
              </div>
              
              {/* Precio */}
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  ${yacht.price?.toLocaleString()}
                </div>
                <div className="text-gray-600">por día</div>
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {yacht.description}
              </p>
            </div>

            {/* Características principales */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Características</h3>
                
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                  <span className="text-lg">Ubicación: {yacht.location}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Users className="w-5 h-5 mr-3 text-green-500" />
                  <span className="text-lg">Capacidad: {yacht.capacity} personas</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Anchor className="w-5 h-5 mr-3 text-purple-500" />
                  <span className="text-lg">Tipo: {getYachtTypeName(yacht.yachtType)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Servicios Incluidos</h3>
                
                <div className="flex items-center text-gray-700">
                  <Shield className="w-5 h-5 mr-3 text-green-500" />
                  <span className="text-lg">Seguro incluido</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-3 text-blue-500" />
                  <span className="text-lg">Horario flexible</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Star className="w-5 h-5 mr-3 text-yellow-500" />
                  <span className="text-lg">Tripulación profesional</span>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-6 border-t border-gray-200">
              <Link
                href={`/booking?yachtId=${yacht.id}`}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg text-center"
              >
                {yacht.available ? 'Reservar Ahora' : 'Consultar Disponibilidad'}
              </Link>
              
              <Link
                href="/catalog"
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg text-center"
              >
                Ver Otros Yates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
