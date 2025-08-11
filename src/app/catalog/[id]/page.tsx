"use client";

import React, { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

type Yacht = {
  id: number;
  name: string;
  description: string;
  pricePerDay: number;
  capacity: number;
  location: string;
  yachtType: string;
  length: number;
  cabins: number;
  bathrooms: number;
  crew: number;
  amenities: string[];
  imageUrls: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function YachtDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [yacht, setYacht] = useState<Yacht | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadYacht() {
      try {
        const res = await fetch(`http://localhost:8081/api/catalog/yachts/${id}`);
        if (!res.ok) {
          notFound();
          return;
        }
        const data = await res.json();
        setYacht(data);
      } catch {
        notFound();
      } finally {
        setLoading(false);
      }
    }
    loadYacht();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <p className="text-lg text-gray-600">Cargando yate...</p>
        </div>
      </div>
    );
  if (!yacht)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <p className="text-lg text-red-600 font-semibold">Yate no encontrado.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      <Navbar />
      <main className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-200 p-10 my-12 mx-6">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6">{yacht.name}</h1>
        <p className="text-gray-700 text-lg mb-8">{yacht.description}</p>

        {/* Imágenes */}
        <div className="flex gap-6 overflow-x-auto mb-10">
          {yacht.imageUrls.length > 0 ? (
            yacht.imageUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`${yacht.name} imagen ${i + 1}`}
                className="w-72 h-48 object-cover rounded-xl shadow-lg flex-shrink-0"
                loading="lazy"
              />
            ))
          ) : (
            <div className="w-72 h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
              Sin imágenes disponibles
            </div>
          )}
        </div>

        {/* Info básica */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-800 mb-10">
          <div>
            <p><strong>Precio por día:</strong> <span className="text-blue-700">${yacht.pricePerDay.toFixed(2)}</span></p>
            <p><strong>Capacidad:</strong> {yacht.capacity} personas</p>
            <p><strong>Ubicación:</strong> {yacht.location}</p>
            <p><strong>Tipo de yate:</strong> {yacht.yachtType}</p>
          </div>
          <div>
            <p><strong>Longitud:</strong> {yacht.length} metros</p>
            <p><strong>Cabinas:</strong> {yacht.cabins}</p>
            <p><strong>Baños:</strong> {yacht.bathrooms}</p>
            <p><strong>Tripulación:</strong> {yacht.crew}</p>
            <p>
              <strong>Disponibilidad:</strong>{" "}
              {yacht.available ? (
                <span className="text-green-600 font-semibold">Disponible</span>
              ) : (
                <span className="text-red-600 font-semibold">No disponible</span>
              )}
            </p>
          </div>
        </section>

        {/* Amenities */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Amenidades</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 list-disc list-inside text-gray-700">
            {yacht.amenities.length > 0 ? (
              yacht.amenities.map((amenity, i) => (
                <li key={i} className="bg-blue-50 rounded-lg p-3 shadow-sm hover:shadow-md transition">
                  {amenity}
                </li>
              ))
            ) : (
              <li className="text-gray-400">No hay amenidades listadas.</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}
