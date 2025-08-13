"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Yacht {
  id: number;
  nombre: string;
  tipo: string;
}

export default function BookingPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    personas: "",
    yachtId: "",
  });
  const [yates, setYates] = useState<Yacht[]>([]);

  // Traemos yates disponibles desde el backend
  useEffect(() => {
    fetch("http://localhost:8083/api/catalog/yachts?onlyAvailable=true")
      .then((res) => res.json())
      .then((data) => setYates(data))
      .catch((err) => console.error("Error cargando yates:", err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Debes iniciar sesión para reservar un yate.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8083/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al guardar la reserva");

      alert("Reserva realizada con éxito!");
      setFormData({ fecha: "", hora: "", personas: "", yachtId: "" });
    } catch (err) {
      console.error(err);
      alert("No se pudo realizar la reserva.");
    }
  };

  // Si no hay usuario logueado
  if (!user) {
    return (
      <>
        <Navbar />
        <section className="container mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Debes iniciar sesión para reservar un yate
          </h1>
          <Link
            href="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm"
          >
            Iniciar sesión
          </Link>
        </section>
      </>
    );
  }

  // Formulario de reservas
  return (
    <>
      <Navbar />
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Reserva tu Yate
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 space-y-4 max-w-lg mx-auto"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hora
            </label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número de personas
            </label>
            <input
              type="number"
              name="personas"
              value={formData.personas}
              onChange={handleChange}
              min={1}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Selecciona tu Yate
            </label>
            <select
              name="yachtId"
              value={formData.yachtId}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecciona un yate disponible</option>
              {yates.map((yate) => (
                <option key={yate.id} value={yate.id}>
                  {yate.nombre} ({yate.tipo})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm"
          >
            Reservar
          </button>
        </form>
      </section>
    </>
  );
}
