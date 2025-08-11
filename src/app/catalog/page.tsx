"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

type Yacht = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

export default function CatalogPage() {
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8081/api/catalog/yachts")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los yates");
        return res.json();
      })
      .then((data) => {
        setYachts(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const handleVerMas = (id: number) => {
    router.push(`/catalog/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-700">
          Catálogo de Yates
        </h1>

        {loading && (
          <p className="text-center text-lg text-gray-600">Cargando yates...</p>
        )}
        {error && (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {yachts.map((yacht) => (
            <article
              key={yacht.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl hover:scale-[1.03] transform transition duration-300 flex flex-col overflow-hidden"
            >
              <img
                src={
                  yacht.name === "Sea Princess"
                    ? "https://static.wixstatic.com/media/1140c3_fcd5ee6415784217a42487e1d57df028~mv2.jpg/v1/fill/w_640,h_510,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1140c3_fcd5ee6415784217a42487e1d57df028~mv2.jpg"
                    : yacht.name === "Ocean Dream"
                    ? "https://sailingheaven.com/wp-content/uploads/2015/03/Sun-Odyssey-49i-Yacht-Definition-2.jpg"
                    : yacht.name === "Paradise Catamaran"
                    ? "https://www.motoryachts-fountaine-pajot.com/wp-content/uploads/sites/2/2023/08/MY5-Fountaine-Pajot-Motor-Yachts-Ban-scaled.jpg"
                    : yacht.name === "Wind Voyager"
                    ? "https://img.nauticexpo.es/images_ne/photo-mg/20156-20368599.jpg"
                    : yacht.imageUrl
                }
                alt={yacht.name}
                className="w-full h-48 object-cover rounded-t-2xl"
                loading="lazy"
              />

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold mb-2 text-blue-700">
                  {yacht.name}
                </h2>
                <p className="text-gray-700 flex-grow">{yacht.description}</p>
                <button
                  onClick={() => handleVerMas(yacht.id)}
                  type="button"
                  className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-shadow shadow-lg hover:shadow-xl"
                >
                  Ver más
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
