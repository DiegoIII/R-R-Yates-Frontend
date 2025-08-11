'use client';

import { useState, useEffect } from 'react';
import { Yacht, catalogAPI } from '@/lib/api';
import { Anchor, MapPin, Users, Sailboat, DollarSign, Star, Calendar, Clock } from 'lucide-react';
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

  // Función para obtener la imagen específica de cada yate
  const getYachtImage = (yachtName: string, defaultImageUrl?: string) => {
    switch (yachtName) {
      case "Sea Princess":
        return "https://static.wixstatic.com/media/1140c3_fcd5ee6415784217a42487e1d57df028~mv2.jpg/v1/fill/w_640,h_510,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1140c3_fcd5ee6415784217a42487e1d57df028~mv2.jpg";
      case "Ocean Dream":
        return "https://sailingheaven.com/wp-content/uploads/2015/03/Sun-Odyssey-49i-Yacht-Definition-2.jpg";
      case "Paradise Catamaran":
        return "https://www.motoryachts-fountaine-pajot.com/wp-content/uploads/sites/2/2023/08/MY5-Fountaine-Pajot-Motor-Yachts-Ban-scaled.jpg";
      case "Wind Voyager":
        return "https://img.nauticexpo.es/images_ne/photo-mg/20156-20368599.jpg";
      default:
        return defaultImageUrl || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="mt-8 text-gray-600 text-xl font-medium">Cargando yates...</p>
            <p className="mt-2 text-gray-500">Preparando nuestra flota para ti</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-2xl max-w-md mx-auto">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-xl font-bold">Error al cargar yates</p>
              <p className="text-sm mt-3">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (yachts.length === 0) {
    return (
      <div className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-8 py-6 rounded-2xl max-w-md mx-auto">
              <div className="text-4xl mb-4">🚢</div>
              <p className="text-xl font-bold">No hay yates disponibles</p>
              <p className="text-sm mt-3">Pronto tendremos más opciones para ti.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            🚢 Nuestros Yates Disponibles
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Descubre nuestra flota de yates de lujo disponibles para tu próxima aventura marítima
          </p>
          <div className="flex justify-center items-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-gray-600 font-medium">Calificación 4.9/5</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-gray-600 font-medium">Reserva en minutos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-500" />
              <span className="text-gray-600 font-medium">Disponibilidad 24/7</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {yachts.map((yacht) => (
            <div
              key={yacht.id}
              className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 group"
            >
              {/* Imagen del yate */}
              <div className="h-56 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                <img
                  src={getYachtImage(yacht.name, yacht.imageUrl)}
                  alt={yacht.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Badge de tipo */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                  {getYachtTypeIcon(yacht.yachtType)} {getYachtTypeName(yacht.yachtType)}
                </div>
                {/* Badge de disponibilidad */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                  yacht.available 
                    ? 'bg-green-500/90 text-white' 
                    : 'bg-red-500/90 text-white'
                }`}>
                  {yacht.available ? 'Disponible' : 'No disponible'}
                </div>
              </div>

              {/* Información del yate */}
              <div className="p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {yacht.name}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed line-clamp-2">
                    {yacht.description}
                  </p>
                </div>

                {/* Características principales */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="font-medium">{yacht.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-green-500" />
                    <span className="font-medium">Capacidad: {yacht.capacity} personas</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Anchor className="w-5 h-5 mr-3 text-purple-500" />
                    <span className="font-medium">Tipo: {getYachtTypeName(yacht.yachtType)}</span>
                  </div>
                </div>

                {/* Precio */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mb-6">
                  <div className="flex items-center">
                    <DollarSign className="w-6 h-6 text-green-500 mr-2" />
                    <span className="text-2xl font-bold text-green-600">
                      ${yacht.price?.toLocaleString()}
                    </span>
                    <span className="text-gray-500 ml-1">/día</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-4">
                  <Link
                    href={`/booking?yachtId=${yacht.id}`}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {yacht.available ? 'Reservar Ahora' : 'Consultar Disponibilidad'}
                  </Link>
                  
                  <Link
                    href={`/catalog/${yacht.id}`}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center text-base"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón para ver más */}
        <div className="text-center mt-16">
          <Link
            href="/catalog"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-12 py-6 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 text-xl"
          >
            Ver Todos los Yates
          </Link>
        </div>
      </div>
    </div>
  );
}
