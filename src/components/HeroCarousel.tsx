"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LISTA_CIUDADES, Ciudad } from '../Data/Data';

interface ServicioGeneral {
  id: string;
  nombre: string;
  tag: string;
  imagen: string;
}

// Los 10 servicios originales de tu menú
const SERVICIOS_TURISTICOS: ServicioGeneral[] = [
  { id: "serv-1", nombre: "HOTELES", tag: "HOSPEDAJE PREMIUM", imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop" },
  { id: "serv-2", nombre: "RBNB", tag: "ESTADÍAS LOCALES", imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=500&auto=format&fit=crop" },
  { id: "serv-3", nombre: "HOSTAL", tag: "AMBIENTE MOCHILERO", imagen: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=500&auto=format&fit=crop" },
  { id: "serv-4", nombre: "MUSEOS", tag: "ARTE Y CULTURA", imagen: "https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=500&auto=format&fit=crop" },
  { id: "serv-5", nombre: "PARQUES", tag: "NATURALEZA AIRE LIBRE", imagen: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=500&auto=format&fit=crop" },
  { id: "serv-6", nombre: "TEATROS", tag: "ENTRETENIMIENTO", imagen: "https://images.unsplash.com/photo-1503095391757-1117da745675?q=80&w=500&auto=format&fit=crop" },
  { id: "serv-7", nombre: "RESTAURANTES", tag: "ALTA COCINA", imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format&fit=crop" },
  { id: "serv-8", nombre: "COMIDAS RECOMENDADAS", tag: "SABORES LOCALES", imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop" },
  { id: "serv-9", nombre: "SITIOS GENIALES", tag: "RECOMENDADOS", imagen: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=500&auto=format&fit=crop" },
  { id: "serv-10", nombre: "SITIOS HISTÓRICOS", tag: "PATRIMONIO", imagen: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=500&auto=format&fit=crop" }
];

interface HeroCarouselProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export default function HeroCarousel({ selectedCity, onCityChange }: HeroCarouselProps) {
  const [fase, setFase] = useState<'ciudades' | 'servicios'>('ciudades');
  const [ciudadActiva, setCiudadActiva] = useState<Ciudad>(LISTA_CIUDADES[0]); 
  const [imagenFondo, setImagenFondo] = useState<string>(LISTA_CIUDADES[0]?.imagenPrincipal || '');
  const [scrollProgress, setScrollProgress] = useState<number>(0); 
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (LISTA_CIUDADES.length > 0) {
      setCiudadActiva(LISTA_CIUDADES[0]);
      setImagenFondo(LISTA_CIUDADES[0].imagenPrincipal);
    }
  }, []);

  useEffect(() => {
    const ciudadEncontrada = LISTA_CIUDADES.find(
      (c) => c.nombre.toUpperCase() === selectedCity.toUpperCase()
    );
    if (ciudadEncontrada) {
      setCiudadActiva(ciudadEncontrada);
      setImagenFondo(ciudadEncontrada.imagenPrincipal);
    }
  }, [selectedCity]);

  const manejarScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      if (totalScrollable > 0) {
        setScrollProgress((scrollLeft / totalScrollable) * 100);
      }
    }
  };

  const manejarSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoPorcentaje = Number(e.target.value);
    setScrollProgress(nuevoPorcentaje);

    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollLeft = (nuevoPorcentaje * (scrollWidth - clientWidth)) / 100;
    }
  };

  useEffect(() => {
    const reiniciarAClasico = () => {
      setFase('ciudades');
      const defecto = LISTA_CIUDADES[0];
      setCiudadActiva(defecto);
      setImagenFondo(defecto.imagenPrincipal);
      onCityChange(defecto.nombre);
      setScrollProgress(0);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    };

    window.addEventListener('reset-carrusel-global', reiniciarAClasico);
    return () => window.removeEventListener('reset-carrusel-global', reiniciarAClasico);
  }, [onCityChange]);

  const moverHorizontal = (dir: 'atras' | 'adelante') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const avance = dir === 'atras' ? -clientWidth : clientWidth;
      scrollContainerRef.current.scrollTo({ left: scrollLeft + avance, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative h-[92vh] w-full flex flex-col justify-between px-12 md:px-24 pt-32 pb-14 transition-all duration-700 bg-cover bg-center select-none"
      style={{ backgroundImage: `linear-gradient(to bottom, rgba(9,9,11,0.3), rgba(9,9,11,0.95)), url(${imagenFondo})` }}
    >
      {/* Textos Informativos */}
      <div className="space-y-4 max-w-xl mt-6">
        <span className="text-yellow-400 text-xs font-black tracking-[0.3em] uppercase block pl-1">
          {ciudadActiva.departamento}
        </span>
        <h1 className="text-6xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-white drop-shadow-md">
          {ciudadActiva.nombre}
        </h1>
        <p className="text-white/70 text-sm md:text-base font-medium max-w-sm leading-relaxed pl-1 italic">
    "Sumérgete en la selva viva, donde cada susurro del Amazonas te cuenta una historia ancestral."
  </p>

  {/* BOTÓN VER */}
  <button 
  onClick={() => {
    const seccionServicios = document.getElementById('servicios-disponibles');
    if (seccionServicios) {
      seccionServicios.scrollIntoView({ behavior: 'smooth' });
    }
  }}
 
  
  className="ml-1 mt-4 px-6 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase text-xs tracking-widest rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
>
  VER MÁS
</button>
      </div>

      {/* CONTENEDOR DEL CARRUSEL */}
      <div className="w-full relative mt-auto pt-4 group">
        <h3 className="text-[10px] font-black tracking-[0.25em] text-white/40 uppercase mb-4">
          {fase === 'ciudades' ? "• Selecciona tu destino" : `• Servicios en ${ciudadActiva.nombre}`}
        </h3>

        {/* Flecha Izquierda */}
        <button 
          onClick={() => moverHorizontal('atras')}
          className="absolute left-[-50px] top-[40%] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft size={22} strokeWidth={3} />
        </button>

        {/* Contenedor del Scroll */}
        <div 
          ref={scrollContainerRef}
          onScroll={manejarScroll}
          className="flex gap-4 overflow-x-auto pt-4 pb-5 -mt-4 scrollbar-none snap-x snap-mandatory"
        >
          {/* FASE 1: CIUDADES */}
          {fase === 'ciudades' && LISTA_CIUDADES.map((ciudad) => (
            <div
              key={ciudad.nombre}
              onClick={() => {
                setCiudadActiva(ciudad);
                setImagenFondo(ciudad.imagenPrincipal);
                onCityChange(ciudad.nombre); 
                setFase('servicios');
              }}
              onMouseEnter={() => {
                setImagenFondo(ciudad.imagenPrincipal);
                setCiudadActiva(ciudad);
              }}
              /* 🌟 md:min-w-[calc((100%-6*1rem)/7)] obliga a renderizar exactamente 7 cajas perfectas en pantalla completa */
              className="min-w-[160px] md:min-w-[calc((100%-6*1rem)/7)] h-[240px] rounded-2xl relative overflow-hidden cursor-pointer snap-start transition-all duration-300 border border-white/10 hover:border-yellow-400 hover:scale-105"
            >
              <img src={ciudad.imagenPrincipal} alt={ciudad.nombre} className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/10 to-transparent">
                <span className="text-[9px] text-yellow-400 font-bold tracking-widest uppercase">{ciudad.departamento}</span>
                <h4 className="text-sm font-black uppercase text-white tracking-wide mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{ciudad.nombre}</h4>
              </div>
            </div>
          ))}

          {/* FASE 2: TODOS LOS SERVICIOS (7 Visibles simultáneamente) */}
          {fase === 'servicios' && SERVICIOS_TURISTICOS.map((servicio) => (
            <div
              key={servicio.id}
              onClick={() => {
                const target = document.getElementById('servicios');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => {
                setImagenFondo(servicio.imagen);
              }}
              /* 🌟 Misma estructura matemática para los servicios */
              className="min-w-[160px] md:min-w-[calc((100%-6*1rem)/7)] h-[240px] rounded-2xl relative overflow-hidden cursor-pointer snap-start transition-all duration-300 border border-white/10 hover:border-yellow-400 hover:scale-105"
            >
              <img 
                src={servicio.imagen} 
                alt={servicio.nombre} 
                className="absolute inset-0 w-full h-full object-cover brightness-[0.35] transition-all duration-300" 
              />
              <div className="absolute inset-0 p-4 flex flex-col justify-between bg-gradient-to-t from-black/95 via-black/10 to-transparent z-10">
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-yellow-400 font-black">
                  ★
                </div>
                <div>
                  <span className="text-[9px] text-yellow-400/80 font-black tracking-widest block mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    {servicio.tag}
                  </span>
                  <h4 className="text-xs font-black uppercase text-white tracking-tight leading-tight line-clamp-2">
                    {servicio.nombre}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SLIDER DE PROGRESO */}
        <div className="w-full flex justify-center mt-4 mb-6 relative z-40 px-4">
          <div className="w-40 relative flex items-center h-[8px]">
            <div className="absolute inset-x-0 h-[4px] bg-white/10 backdrop-blur-md rounded-full pointer-events-none" />
            <div 
              className="absolute left-0 h-[4px] bg-yellow-400 rounded-full pointer-events-none shadow-[0_0_10px_rgba(250,204,21,0.8)]"
              style={{ width: `${scrollProgress}%` }}
            />
            <input 
              type="range"
              min="0"
              max="100"
              value={scrollProgress}
              onChange={manejarSliderChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none z-50"
            />
            <div 
              className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_12px_rgba(250,204,21,1)] pointer-events-none -translate-x-1/2 transition-all duration-75"
              style={{ left: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Flecha Derecha */}
        <button 
          onClick={() => moverHorizontal('adelante')}
          className="absolute right-[-50px] top-[40%] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight size={22} strokeWidth={3} />
        </button>

      </div>
    </div>
  );
}