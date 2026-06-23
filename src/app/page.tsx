'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import QuickFilters from '@/components/QuickFilters';
import MapFilter from '@/components/MapFilter';
import { LISTA_CIUDADES } from '@/Data/travelData';

// Mini Componente del Carrusel Interno de 3 imágenes por Tarjeta
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
      <div 
        className="flex w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imagenes.slice(0, 3).map((img, idx) => (
          <img 
            key={idx} 
            src={img} 
            alt={`${pueblo} ${idx + 1}`} 
            className="w-full h-full object-cover shrink-0"
          />
        ))}
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-zinc-900 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-white shadow-md z-10"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-zinc-900 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-white shadow-md z-10"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {imagenes.slice(0, 3).map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-4 bg-[#1764ff]' : 'w-1.5 bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>('BOGOTÁ');
  const [radius, setRadius] = useState<string>('1 KM');
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [activeDetails, setActiveDetails] = useState<any | null>(null);

  const ciudadActual = LISTA_CIUDADES.find(
    (c) => c.nombre.toUpperCase() === selectedCity.toUpperCase()
  );

  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col overflow-x-hidden">
      <Navbar />
      <HeroCarousel selectedCity={selectedCity} onCityChange={setSelectedCity} />

      <div className="relative w-full bg-white text-zinc-900 flex-1 flex flex-col">
        <QuickFilters 
          radius={radius} 
          setRadius={setRadius} 
          onOpenMap={() => setIsMapOpen(true)}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />

        {ciudadActual && ciudadActual.escapadasCercanas && ciudadActual.escapadasCercanas.length > 0 ? (
          <section className="py-16 px-6 max-w-7xl mx-auto w-full z-10 bg-white">
            <div className="mb-12 text-center md:text-left border-l-4 border-[#1764ff] pl-5">
              <span className="text-[#1764ff] font-black tracking-[0.25em] text-[11px] uppercase block mb-1">Un Oasis Escondido</span>
              <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter text-zinc-950 uppercase leading-none">
                ESCAPADAS CERCANAS A <span className="text-[#1764ff] not-italic font-black">{ciudadActual.nombre}</span>
              </h2>
            </div>

            <div className="relative group w-full">
              <button 
                onClick={() => document.getElementById('carrusel-escapadas')?.scrollBy({ left: -320, behavior: 'smooth' })}
                className="absolute -left-4 top-1/4 z-30 bg-white p-2.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all border border-zinc-200 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 text-zinc-900" />
              </button>

              <div 
                id="carrusel-escapadas"
                className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x scroll-smooth"
              >
                {ciudadActual.escapadasCercanas.map((escapada) => (
                  <div 
                    key={escapada.id} 
                    className="min-w-[calc(25%-18px)] max-w-[calc(25%-18px)] bg-white border border-zinc-200/80 rounded-2xl overflow-hidden flex flex-col flex-shrink-0 snap-start transition-all duration-300 hover:border-[#1764ff]/40 hover:shadow-xl"
                  >
                    <CardCarousel imagenes={escapada.imagenes || [escapada.imagen]} pueblo={escapada.pueblo} />
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1">
                          <MapPin className="w-3 h-3 text-[#1764ff]" /> {escapada.ubicacionTexto}
                        </div>
                        <h3 className="text-base font-black text-zinc-950 uppercase tracking-tight">{escapada.pueblo}</h3>
                        <span className="inline-block mt-2 bg-blue-50 text-[#1764ff] text-[8px] font-black tracking-wider px-2 py-0.5 rounded-full uppercase">
                          {escapada.atraccionPrincipal}
                        </span>
                      </div>
                      <button 
                        onClick={() => setActiveDetails(escapada)}
                        className="mt-4 w-full bg-zinc-950 text-white hover:bg-[#1764ff] text-[10px] font-extrabold py-2.5 rounded-xl transition-all uppercase"
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => document.getElementById('carrusel-escapadas')?.scrollBy({ left: 320, behavior: 'smooth' })}
                className="absolute -right-4 top-1/4 z-30 bg-white p-2.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all border border-zinc-200 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 text-zinc-900" />
              </button>
            </div>
          </section>
        ) : (
          <div className="py-32 text-center text-zinc-400 font-black text-xs uppercase tracking-widest bg-white w-full">
            No se encontraron escapadas registradas para <span className="text-[#1764ff]">{selectedCity}</span>.
          </div>
        )}
      </div>

      {activeDetails && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-zinc-900 shadow-[0_0_50px_rgba(23,100,255,0.3)] border border-blue-100 flex flex-col relative">
            <button onClick={() => setActiveDetails(null)} className="absolute right-4 top-4 z-20 bg-zinc-900/80 text-white hover:bg-[#1764ff] p-2 rounded-full transition-colors backdrop-blur-sm">
              <X className="w-4 h-4" />
            </button>
            <div className="w-full h-72 relative">
              <img src={activeDetails.imagenes?.[0] || activeDetails.imagen} alt={activeDetails.pueblo} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="bg-[#1764ff] text-white text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-md">{activeDetails.atraccionPrincipal}</span>
                <h2 className="text-3xl font-black tracking-tight uppercase text-zinc-950 mt-2">{activeDetails.pueblo}</h2>
              </div>
            </div>
            <div className="p-6 pt-2 flex-1">
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-zinc-500 border-b border-zinc-100 pb-4 mb-4 uppercase tracking-wider">
                <div className="flex items-center gap-1.5 text-[#1764ff]"><MapPin className="w-4 h-4" /> {activeDetails.ubicacionTexto}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-zinc-400" /> Ruta Recomendada</div>
              </div>
              <h4 className="text-xs font-black text-[#1764ff] tracking-widest uppercase mb-1">Descripción del Destino</h4>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium mb-6">{activeDetails.descripcion}</p>
              <button onClick={() => setActiveDetails(null)} className="w-full bg-zinc-950 hover:bg-[#1764ff] text-white text-xs font-black py-3.5 rounded-xl transition-all uppercase tracking-wider">Entendido, Cerrar Ruta</button>
            </div>
          </div>
        </div>
      )}

      <MapFilter 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        radiusKm={parseInt(radius) || 2} 
        isMapLoaded={true} 
      />
    </main>
  );
}