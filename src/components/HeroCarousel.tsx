'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LISTA_CIUDADES, Ciudad } from '../data/ciudades';

interface ServicioCategoria {
  id: string;
  nombre: string;
  imagen: string;
}

const SERVICIOS_CATEGORIAS: ServicioCategoria[] = [
  { id: "s1", nombre: "HOTELES", imagen: "/sesion2_ciudades/servicios/hotel.jpg" },
  { id: "s2", nombre: "RBNB", imagen: "/sesion2_ciudades/servicios/airbnb.jpg" },
  { id: "s3", nombre: "HOSTAL", imagen: "/sesion2_ciudades/servicios/hostal.jpg" },
  { id: "s4", nombre: "MUSEOS", imagen: "/sesion2_ciudades/servicios/museos.jpg" },
  { id: "s5", nombre: "PARQUES", imagen: "/sesion2_ciudades/servicios/parques.jpg" },
  { id: "s6", nombre: "TEATROS", imagen: "/sesion2_ciudades/servicios/teatro.jpg" },
  { id: "s7", nombre: "RESTAURANTES", imagen: "/sesion2_ciudades/servicios/restaurante.jpg" },
  { id: "s8", nombre: "COMIDAS RECOMENDADAS", imagen: "/sesion2_ciudades/servicios/comidas recomendadas.jpg" },
  { id: "s9", nombre: "SITIOS GENIALES", imagen: "/sesion2_ciudades/servicios/sitios geniales.jpg" },
  { id: "s10", nombre: "SITIOS HISTÓRICOS", imagen: "/sesion2_ciudades/servicios/sitios historicos.jpg" },
];

export default function HeroCarousel() {
  const [fase, setFase] = useState<'ciudades' | 'servicios'>('ciudades');
  const [ciudadActiva, setCiudadActiva] = useState<Ciudad>(LISTA_CIUDADES[0]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<string>(LISTA_CIUDADES[0].nombre);
  const [imgIndex, setImgIndex] = useState(0);
  const [estaRotando, setEstaRotando] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.offsetWidth * 0.5;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (estaRotando) {
      timer = setInterval(() => {
        setImgIndex((prev) => (prev + 1) % ciudadActiva.imagenesHero.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [estaRotando, ciudadActiva]);

  useEffect(() => {
    const handleReset = () => {
      setFase('ciudades');
      setCiudadActiva(LISTA_CIUDADES[0]);
      setCiudadSeleccionada(LISTA_CIUDADES[0].nombre);
    };
    window.addEventListener('reset-hero', handleReset);
    return () => window.removeEventListener('reset-hero', handleReset);
  }, []);

  // Función para manejar el envío a la Sesión 4
  const handleIrASesion4 = (servicioNombre?: string) => {
    console.log(`Enviando a Sesión 4 -> Ciudad: ${ciudadSeleccionada}, Servicio: ${servicioNombre || 'General'}`);
    
    // Aquí puedes disparar un evento global, cambiar de vista o hacer scroll hacia la Sesión 4
    window.dispatchEvent(new CustomEvent('ir-a-sesion4', { 
      detail: { ciudad: ciudadSeleccionada, servicio: servicioNombre || null } 
    }));
  };

  return (
    <div 
      className="relative h-[92vh] w-full flex flex-col justify-between px-6 md:px-24 pt-32 pb-14 bg-cover bg-center transition-all duration-700"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(9,9,11,0.4), rgba(9,9,11,0.95)), url(${ciudadActiva.imagenesHero[imgIndex]})` 
      }}
    >
      <div className="space-y-1 max-w-xl z-25">
        <span className="text-yellow-400 text-lg md:text-xl font-black tracking-[0.25em] uppercase block">
          {ciudadSeleccionada}
        </span>
        <h1 className="text-7xl font-black italic uppercase text-white">{ciudadActiva.nombre}</h1>
        <p className="text-white/70 italic border-l-2 border-yellow-400/50 pl-2 max-w-sm pt-2">{ciudadActiva.descripcionHero}</p>
        
        {/* Vínculo "Ver más" / Ciudad ver más -> Envía a la Sesión 4 */}
        <button 
          onClick={() => handleIrASesion4(fase === 'servicios' ? ciudadActiva.nombre : undefined)}
          className="bg-yellow-400 text-black px-6 py-2 font-bold uppercase rounded-lg hover:bg-white transition-colors cursor-pointer mt-2"
        >
          Ver más
        </button>
      </div>

      <div className="w-full md:w-[50%] ml-auto z-50 pr-6 pb-10 relative flex items-center gap-4 mt-10">
        <button 
          onClick={() => scroll('left')}
          className="bg-black/50 p-3 rounded-full text-white hover:bg-yellow-400 hover:text-black transition-all shrink-0 z-50 cursor-pointer"
        >
          ◀
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto py-10 scrollbar-none justify-start items-center"
        >
          {(fase === 'ciudades' ? LISTA_CIUDADES : SERVICIOS_CATEGORIAS).map((item) => {
            const esCiudad = 'imagenesHero' in item;
            const itemCiudad = esCiudad ? (item as Ciudad) : null;
            const itemServicio = !esCiudad ? (item as ServicioCategoria) : null;

            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  setEstaRotando(true);
                  if (itemCiudad) {
                    setCiudadActiva(itemCiudad);
                  } else if (itemServicio) {
                    setCiudadActiva({
                      ...ciudadActiva,
                      nombre: itemServicio.nombre,
                      imagenesHero: [itemServicio.imagen], 
                      descripcionHero: `Explora nuestras recomendaciones de ${itemServicio.nombre.toLowerCase()} en ${ciudadSeleccionada}.`
                    });
                  }
                }}
                onMouseLeave={() => setEstaRotando(false)}
                onClick={() => {
                  if (fase === 'ciudades' && itemCiudad) {
                    setCiudadSeleccionada(itemCiudad.nombre);
                    setCiudadActiva(itemCiudad);
                    setFase('servicios'); // Pasa a la fase de servicios de esa ciudad
                  } else if (itemServicio) {
                    // Al hacer clic en un servicio, lo envía a la Sesión 4 con la ciudad y el servicio escogido
                    handleIrASesion4(itemServicio.nombre);
                  }
                }}
                className="min-w-35 max-w-35 h-60 rounded-2xl cursor-pointer border-2 border-transparent hover:border-yellow-400 transition-all duration-300 relative overflow-hidden shadow-lg hover:scale-110 hover:z-50 shrink-0"
              >
                <img 
                  src={itemCiudad ? itemCiudad.imagenesHero[0] : itemServicio?.imagen} 
                  alt={item.nombre}
                  className="w-full h-full object-cover brightness-[0.5] transition-transform duration-300 hover:scale-110" 
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-xs font-black uppercase text-white truncate">{item.nombre}</h4>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="bg-black/50 p-3 rounded-full text-white hover:bg-yellow-400 hover:text-black transition-all shrink-0 z-50 cursor-pointer"
        >
          ▶
        </button>
      </div>
    </div>
  );
}