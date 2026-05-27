"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LISTA_CIUDADES, LISTA_SERVICIOS, CiudadData } from '../data/travelData';

export default function HeroCarousel() {
  const [fase, setFase] = useState<'ciudades' | 'servicios'>('ciudades');
  const [ciudadActiva, setCiudadActiva] = useState<CiudadData>(LISTA_CIUDADES[2]); 
  const [imagenFondo, setImagenFondo] = useState<string>(LISTA_CIUDADES[2].imagenPrincipal);
  const [scrollProgress, setScrollProgress] = useState<number>(0); // Estado para controlar el porcentaje de la barra
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- CONTROL DE SCROLL EN TIEMPO REAL (MUSE / TRACKPAD / FLECHAS) ---
  const manejarScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      if (totalScrollable > 0) {
        const porcentaje = (scrollLeft / totalScrollable) * 100;
        setScrollProgress(porcentaje);
      }
    }
  };

  // --- CONTROL DEL SLIDER INTERACTIVO (CUANDO EL USUARIO ARRASTRA LA BARRA) ---
  const manejarSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoPorcentaje = Number(e.target.value);
    setScrollProgress(nuevoPorcentaje);

    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      // Sincroniza la posición del contenedor en píxeles basándose en el porcentaje
      scrollContainerRef.current.scrollLeft = (nuevoPorcentaje * totalScrollable) / 100;
    }
  };

  // --- DECLARACIÓN DE FUNCIONES DE CONTROL ---
  const detenerIntervalo = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const iniciarCicloFotos = (servicio: string) => {
    const opciones = ciudadActiva.servicios[servicio] || [];
    if (opciones.length > 0) {
      setImagenFondo(opciones[0].imagen);
      if (opciones.length > 1) {
        let actual = 1;
        intervalRef.current = setInterval(() => {
          setImagenFondo(opciones[actual].imagen);
          actual = (actual + 1) % opciones.length;
        }, 1400);
      }
    }
  };

  // --- ESCUCHADOR DEL EVENTO DE INICIO PROVENIENTE DEL NAVBAR ---
  useEffect(() => {
    const reiniciarAClasico = () => {
      setFase('ciudades');
      setCiudadActiva(LISTA_CIUDADES[2]);
      setImagenFondo(LISTA_CIUDADES[2].imagenPrincipal);
      setScrollProgress(0);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
      detenerIntervalo();
    };

    window.addEventListener('reset-carrusel-global', reiniciarAClasico);
    return () => window.removeEventListener('reset-carrusel-global', reiniciarAClasico);
  }, []);

  // Al cambiar entre Ciudades y Servicios, reiniciamos el scroll horizontal a 0 de forma limpia
  useEffect(() => {
    setScrollProgress(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [fase]);

  const moverHorizontal = (dir: 'atras' | 'adelante') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const avance = dir === 'atras' ? -clientWidth : clientWidth;
      scrollContainerRef.current.scrollTo({ left: scrollLeft + avance, behavior: 'smooth' });
    }
  };

  const ejecutarEnlaceFinal = (servicio: string) => {
    detenerIntervalo();
    const target = document.getElementById('servicios');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert(`Redirección simulada: Te llevará a la sección de "${servicio}" en ${ciudadActiva.nombre}.`);
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
        <p className="text-white/70 text-sm font-medium max-w-sm leading-relaxed pl-1">
          {ciudadActiva.descripcion}
        </p>
      </div>

      {/* CONTENEDOR DEL CARRUSEL */}
      <div className="w-full relative mt-auto pt-4 group">
        <h3 className="text-[10px] font-black tracking-[0.25em] text-white/40 uppercase mb-4">
          {fase === 'ciudades' ? "• Selecciona tu destino" : `• Servicios en ${ciudadActiva.nombre}`}
        </h3>

        {/* Flecha Izquierda */}
        <button 
          onClick={() => moverHorizontal('atras')}
          className="absolute left-[-22px] top-[45%] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft size={22} strokeWidth={3} />
        </button>

        {/* Contenedor del Scroll con truco de Padding para evitar recortes */}
        <div 
          ref={scrollContainerRef}
          onScroll={manejarScroll}
          className="flex gap-5 overflow-x-auto pt-4 pb-5 -mt-4 scrollbar-none snap-x snap-mandatory"
        >
          {/* FASE 1: CIUDADES */}
          {fase === 'ciudades' && LISTA_CIUDADES.map((ciudad) => (
            <div
              key={ciudad.nombre}
              onClick={() => {
                setCiudadActiva(ciudad);
                setImagenFondo(ciudad.imagenPrincipal);
                setFase('servicios');
              }}
              onMouseEnter={() => {
                setImagenFondo(ciudad.imagenPrincipal);
                setCiudadActiva(ciudad);
              }}
              className="min-w-[170px] h-[240px] rounded-2xl relative overflow-hidden cursor-pointer snap-start transition-all duration-300 border border-white/10 hover:border-yellow-400 hover:scale-105"
            >
              <img src={ciudad.imagenPrincipal} alt={ciudad.nombre} className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/10 to-transparent">
                <span className="text-[9px] text-yellow-400 font-bold tracking-widest uppercase">{ciudad.departamento}</span>
                <h4 className="text-sm font-black uppercase text-white tracking-wide mt-0.5">{ciudad.nombre}</h4>
              </div>
            </div>
          ))}

          {/* FASE 2: SERVICIOS */}
          {fase === 'servicios' && LISTA_SERVICIOS.map((servicio) => (
            <div
              key={servicio}
              onClick={() => ejecutarEnlaceFinal(servicio)}
              onMouseEnter={() => iniciarCicloFotos(servicio)}
              onMouseLeave={() => {
                detenerIntervalo();
                setImagenFondo(ciudadActiva.imagenPrincipal);
              }}
              className="min-w-[170px] h-[240px] rounded-2xl relative overflow-hidden cursor-pointer snap-start transition-all duration-300 border flex flex-col justify-between p-4 bg-zinc-900/80 border-white/10 hover:border-yellow-400 hover:scale-105"
            >
              <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-yellow-400 font-black">
                ★
              </div>
              <div>
                <span className="text-[9px] text-yellow-400/80 font-black tracking-widest block mb-0.5">EXPLORAR</span>
                <h4 className="text-sm font-black uppercase text-white tracking-tight leading-tight">{servicio}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* 🌟 SLIDER DE PROGRESO 100% INTERACTIVO Y ARRASTRABLE 🌟 */}
        <div className="w-full flex justify-center mt-4 mb-6 relative z-40 px-4">
          <div className="w-40 relative flex items-center h-[8px]">
            
            {/* Pista de fondo semi-transparente (Efecto Cristal) */}
            <div className="absolute inset-x-0 h-[4px] bg-white/10 backdrop-blur-md rounded-full pointer-events-none" />
            
            {/* Barra interna de color amarillo neón que se estira dinámicamente */}
            <div 
              className="absolute left-0 h-[4px] bg-yellow-400 rounded-full pointer-events-none shadow-[0_0_10px_rgba(250,204,21,0.8)]"
              style={{ width: `${scrollProgress}%` }}
            />

            {/* Input nativo totalmente invisible pero funcional por encima de todo */}
<input 
              type="range"
              min="0"
              max="100"
              value={scrollProgress}
              onChange={manejarSliderChange} // 🌟 ¡Corregido a español aquí!
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none z-50"
            />

            {/* Tirador visual (Burbuja indicadora) que se mueve con el progreso */}
            <div 
              className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_12px_rgba(250,204,21,1)] pointer-events-none -translate-x-1/2 transition-all duration-75"
              style={{ left: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Flecha Derecha */}
        <button 
          onClick={() => moverHorizontal('adelante')}
          className="absolute right-[-22px] top-[45%] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight size={22} strokeWidth={3} />
        </button>

      </div>
    </div>
  );
}