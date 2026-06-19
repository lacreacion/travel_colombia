'use client';

import { useState, useRef, useEffect } from 'react';
import { Compass, MapPin, Search, ChevronDown } from 'lucide-react';

const CITIES = [
  "Amazonas", "Barranquilla", "Bogotá", "Boyacá", 
  "Cali", "Cartagena", "Chocó", "Guajira", "Medellín"
];

interface QuickFiltersProps {
  radius: string;
  setRadius: (value: string) => void;
  onOpenMap: () => void;
  selectedCity: string;         // 🌟 Recibe la ciudad activa
  onCityChange: (v: string) => void; // 🌟 Función para actualizar la ciudad globalmente
}

export default function QuickFilters({ radius, setRadius, onOpenMap, selectedCity, onCityChange }: QuickFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-[65%] mx-auto -mt-7 relative z-30 px-4">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between relative">
        
        {/* ==================== CAJA 1: ¿BUSCAS ALGO RÁPIDO? ==================== */}
        <div className="w-full lg:w-[53%] bg-[#ebf2ff] rounded-full px-6 py-2.5 shadow-xl flex items-center justify-between gap-4 border border-white/70 h-14">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-1.5 bg-blue-100 text-blue-600 rounded-full shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-xs font-black text-blue-900 tracking-wider uppercase whitespace-nowrap">
                ¿Buscas algo rápido?
              </h3>
              <p className="text-[9px] font-bold text-blue-600/70 uppercase tracking-wide truncate max-w-[180px] xl:max-w-[240px]">
                Encuentra lugares recomendados cerca de tu ubicación actual.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex bg-white/90 p-0.5 rounded-full border border-blue-100 shadow-inner">
              {['1 KM', '2 KM', '5 KM'].map((km) => (
                <button
                  key={km}
                  onClick={() => setRadius(km)}
                  className={`px-3 py-1 text-[10px] font-extrabold rounded-full transition-all duration-200 ${
                    radius === km
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {km}
                </button>
              ))}
            </div>

            <button 
              onClick={onOpenMap}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-3.5 rounded-full shadow-md shadow-blue-500/20 transition-all duration-200 text-[10px] uppercase tracking-wider h-9 whitespace-nowrap"
            >
              <MapPin className="w-3 h-3" />
              Abrir Mapa
            </button>
          </div>
        </div>

        {/* 🎥 LÍNEA DIVISORIA VERTICAL ESTÉTICA (En el medio exacto de las dos barras en Desktop) */}
        <div className="hidden lg:block absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-px bg-zinc-300/80 z-40" />

        {/* ==================== CAJA 2: UN OASIS ESCONDIDO ==================== */}
        <div className="w-full lg:w-[43%] bg-[#ebf2ff] rounded-full px-6 py-2.5 shadow-xl flex items-center justify-between gap-3 border border-white/70 h-14">
          <div className="flex flex-col min-w-0">
            <h3 className="text-xs font-black text-blue-900 tracking-wider uppercase whitespace-nowrap">
              Un oasis escondido
            </h3>
            <p className="text-[9px] font-bold text-blue-600/70 uppercase tracking-wide truncate">
              Súper cerca de la ciudad.
            </p>
          </div>

          <div className="relative w-44 shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-white hover:bg-slate-50 border border-blue-100 text-slate-700 pl-3 pr-8 py-1.5 rounded-full font-bold transition-all text-[11px] flex items-center justify-between shadow-sm h-9"
            >
              <div className="flex items-center gap-1.5 truncate text-slate-400">
                <Search className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className={selectedCity ? "text-slate-800 font-extrabold uppercase" : "truncate"}>
                  {selectedCity || "Seleccionar ciudad..."}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-blue-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute left-0 top-[calc(100%+6px)] w-full bg-white rounded-xl shadow-2xl border border-slate-100 p-1 z-50 animate-in fade-in slide-in-from-top-1">
                <ul className="max-h-36 overflow-y-auto text-left scrollbar-none">
                  {CITIES.map((city) => (
                    <li key={city}>
                      <button
                        onClick={() => {
                          onCityChange(city.toUpperCase()); // Guarda en mayúsculas para la BD
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-[11px] font-bold rounded-lg transition-colors uppercase ${
                          selectedCity.toUpperCase() === city.toUpperCase()
                            ? 'bg-blue-50 text-blue-600 font-black'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {city}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}