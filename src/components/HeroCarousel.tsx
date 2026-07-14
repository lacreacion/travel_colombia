'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LISTA_CIUDADES, Ciudad } from '../Data/ciudades';

interface ServicioGeneral {
  id: string;
  nombre: string;
  tag: string;
  imagen: string;
}

const SERVICIOS_TURISTICOS: ServicioGeneral[] = [
  { id: "serv-1", nombre: "HOTELES", tag: "HOSPEDAJE PREMIUM", imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop" },
];

export default function HeroCarousel() {
  const [fase, setFase] = useState<'ciudades' | 'servicios'>('ciudades');
  const [ciudadActiva, setCiudadActiva] = useState<Ciudad>(LISTA_CIUDADES[0]);
  const [imgIndex, setImgIndex] = useState(0); // Para la rotación de 3 segundos
  
  // Lógica de rotación automática de imágenes (3 segundos)
  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % ciudadActiva.imagenesHero.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [ciudadActiva]);

  return (
    <div 
      className="relative h-[92vh] w-full flex flex-col justify-between px-6 md:px-24 pt-32 pb-14 bg-cover bg-center transition-all duration-700"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(9,9,11,0.4), rgba(9,9,11,0.95)), url(${ciudadActiva.imagenesHero[imgIndex]})` 
      }}
    >
      <div className="space-y-4 max-w-xl mt-6 z-20">
        <span className="text-yellow-400 text-xs font-black tracking-[0.3em] uppercase block pl-1">COLOMBIA</span>
        <h1 className="text-6xl md:text-7xl font-black italic tracking-tighter uppercase leading-none text-white drop-shadow-md">
          {ciudadActiva.nombre}
        </h1>
        <p className="text-white/70 text-sm md:text-base font-medium max-w-sm italic border-l-2 border-yellow-400/50 pl-2">
          {ciudadActiva.descripcionHero}
        </p>
      </div>

      <div className="w-full relative mt-auto z-20">
        <div className="flex gap-4 overflow-x-auto pb-5 scrollbar-none">
          {(fase === 'ciudades' ? LISTA_CIUDADES : SERVICIOS_TURISTICOS).map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if ('imagenesHero' in item) {
                  setCiudadActiva(item as Ciudad);
                  setImgIndex(0); // Reinicia el índice al cambiar de ciudad
                } else {
                  setFase('servicios');
                }
              }}
              // El hover:border-yellow-400 crea el efecto de brillo amarillo solicitado
              className="min-w-[140px] md:min-w-[14%] h-60 rounded-2xl relative overflow-hidden cursor-pointer border-2 border-transparent hover:border-yellow-400 shadow-lg transition-all duration-300"
            >
              <img 
                src={'imagenesHero' in item ? (item as Ciudad).imagenesHero[0] : (item as ServicioGeneral).imagen} 
                alt={item.nombre} 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                <h4 className="text-sm font-black uppercase text-white">{item.nombre}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}