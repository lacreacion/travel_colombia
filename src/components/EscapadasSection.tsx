'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, X } from 'lucide-react';
import { LISTA_CIUDADES, Escapada } from '../Data/ciudades';

// Componente pequeño para el carrusel interno de imágenes
function CardCarousel({ imagenes, pueblo }: { imagenes: string[]; pueblo: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-64 overflow-hidden group/carousel bg-zinc-100">
      <div className="flex w-full h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {imagenes.slice(0, 3).map((img, idx) => (
          <img key={idx} src={img} alt={`${pueblo} ${idx + 1}`} className="w-full h-full object-cover shrink-0" />
        ))}
      </div>
      <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"><ChevronLeft className="w-3.5 h-3.5" /></button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"><ChevronRight className="w-3.5 h-3.5" /></button>
    </div>
  );
}

export default function EscapadasSection() {
  // ESTADO LOCAL: Esto asegura que el filtro de aquí no afecte al resto de la página
  const [selectedCity, setSelectedCity] = useState(LISTA_CIUDADES[0].nombre);
  const [activeDetails, setActiveDetails] = useState<Escapada | null>(null);

  const ciudadActual = LISTA_CIUDADES.find((c) => c.nombre === selectedCity);

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto w-full bg-white">
      {/* Selector Propio */}
      <div className="mb-8">
        <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Selecciona Ciudad para Escapadas</label>
        <select 
          value={selectedCity} 
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 border border-zinc-200 rounded-lg text-sm font-bold uppercase"
        >
          {LISTA_CIUDADES.map(c => <option key={c.nombre} value={c.nombre}>{c.nombre}</option>)}
        </select>
      </div>

      <div className="mb-12 border-l-4 border-[#1764ff] pl-5">
        <h2 className="text-3xl font-black italic text-zinc-950 uppercase">Escapadas en {selectedCity}</h2>
      </div>

      {/* Carrusel de Escapadas */}
      <div className="flex gap-6 overflow-x-auto pb-6">
        {ciudadActual?.escapadasCercanas.map((escapada) => (
          <div key={escapada.id} className="min-w-[300px] border border-zinc-200 rounded-2xl overflow-hidden">
            <CardCarousel imagenes={(escapada.imagenes || [escapada.imagen || ""]).filter(i => i !== "")} pueblo={escapada.pueblo} />
            <div className="p-4">
              <h3 className="font-black text-lg">{escapada.pueblo}</h3>
              <button onClick={() => setActiveDetails(escapada)} className="mt-4 w-full bg-zinc-950 text-white py-2 rounded-xl text-xs font-bold uppercase">Ver Detalles</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles */}
      {activeDetails && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-lg w-full relative">
            <button onClick={() => setActiveDetails(null)} className="absolute top-4 right-4"><X /></button>
            <h2 className="text-2xl font-black">{activeDetails.pueblo}</h2>
            <p className="mt-4 text-sm text-zinc-600">{activeDetails.descripcion}</p>
          </div>
        </div>
      )}
    </section>
  );
}