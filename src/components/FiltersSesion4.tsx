'use client';
import React from 'react';
import { Compass, MapPin, Search, SlidersHorizontal, Building2, Home, BedDouble, UtensilsCrossed, Landmark, Trees, Castle, Sparkles, Music, Eye, Heart, Users, Flame, Globe, Check } from 'lucide-react';

interface FilterSesion4Props {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  activeService: string;
  setActiveService: (service: string) => void;
  setHasSearched: (val: boolean) => void;
  
  hGuests: number; setHGuests: (v: number) => void;
  hPriceMin: number; setHPriceMin: (v: number) => void;
  hPriceMax: number; setHPriceMax: (v: number) => void;
  hSpaPool: boolean; setHSpaPool: (v: boolean) => void;
  hTopRated: boolean; setHTopRated: (v: boolean) => void;
  hPets: boolean; setHPets: (v: boolean) => void;
  hAc: boolean; setHAc: (v: boolean) => void;
  hParking: boolean; setHParking: (v: boolean) => void;

  rSubFilters: Set<string>; setRSubFilters: React.Dispatch<React.SetStateAction<Set<string>>>;
  fastFoodTypes: Set<string>; setFastFoodTypes: React.Dispatch<React.SetStateAction<Set<string>>>;
  rCountries: Set<string>; setRCountries: React.Dispatch<React.SetStateAction<Set<string>>>;
  rThemes: Set<string>; setRThemes: React.Dispatch<React.SetStateAction<Set<string>>>;

  cOpen: boolean; setCOpen: (v: boolean) => void;
  cFree: boolean; setCFree: (v: boolean) => void;

  geniusCategory: string; setGeniusCategory: (v: string) => void;
}

const CLEAN_CATEGORIES = [
  { id: 'hotel', label: 'Hotel', icon: Building2 },
  { id: 'airbnb', label: 'Airbnb', icon: Home },
  { id: 'hostal', label: 'Hostal', icon: BedDouble },
  { id: 'restaurante', label: 'Restaur.', icon: UtensilsCrossed },
  { id: 'comida_rapida', label: 'C.Rápida', icon: UtensilsCrossed },
  { id: 'museo', label: 'Museo', icon: Landmark },
  { id: 'parque', label: 'Parque', icon: Trees },
  { id: 'sitios_historicos', label: 'Histór.', icon: Castle },
  { id: 'geniales', label: 'Genial', icon: Sparkles },
];

export default function FilterSesion4({
  selectedCity,
  setSelectedCity,
  activeService,
  setActiveService,
  setHasSearched,
  hGuests, setHGuests,
  hPriceMin, setHPriceMin,
  hPriceMax, setHPriceMax,
  hSpaPool, setHSpaPool,
  hTopRated, setHTopRated,
  hPets, setHPets,
  hAc, setHAc,
  hParking, setHParking,
  rSubFilters, setRSubFilters,
  fastFoodTypes, setFastFoodTypes,
  rCountries, setRCountries,
  rThemes, setRThemes,
  cOpen, setCOpen,
  cFree, setCFree,
  geniusCategory, setGeniusCategory
}: FilterSesion4Props) {
  const cities = ['Bogotá', 'Medellín', 'Cali', 'Cartagena', 'Santa Marta', 'Barranquilla'];

  const toggleMultiSelect = (currentSet: Set<string>, setFn: React.Dispatch<React.SetStateAction<Set<string>>>, id: string, allKey = 'todos') => {
    const newSet = new Set(currentSet);
    if (id === allKey) {
      setFn(new Set([allKey]));
      return;
    }
    newSet.delete(allKey);
    if (newSet.has(id)) {
      newSet.delete(id);
      if (newSet.size === 0) newSet.add(allKey);
    } else {
      newSet.add(id);
    }
    setFn(newSet);
  };

  return (
    <aside className="w-full md:w-[350px] bg-[#fafaf9] p-6 flex flex-col gap-6 h-[calc(100vh-80px)] sticky top-20 overflow-y-auto border-r border-neutral-200/50 shadow-sm">
      
      {/* 1. DESTINO */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-neutral-900 font-bold text-[11px] uppercase tracking-wider">
          <span>1. Destino</span>
          <Compass className="w-4 h-4 text-neutral-400" />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative flex-1">
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-white border border-neutral-200 text-neutral-900 text-xs font-semibold rounded-xl px-4 py-3 appearance-none pr-9 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/30 shadow-xs"
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => setHasSearched(true)}
            className="w-11 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center cursor-pointer transition-all shadow-md shadow-red-600/20 flex-shrink-0 active:scale-95"
            title="Buscar"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 2. CATEGORÍAS (Sin líneas divisorias, ancho optimizado y neón rojo al seleccionar) */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-neutral-900 font-bold text-[11px] uppercase tracking-wider">
          <span>2. Categorías</span>
          <Sparkles className="w-3.5 h-3.5 text-red-600" />
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {CLEAN_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeService === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveService(cat.id)}
                className={`group relative flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl transition-all duration-300 cursor-pointer bg-white ${
                  isSelected 
                    ? 'border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.35)] scale-[1.02] z-10' 
                    : 'border border-neutral-200/80 hover:border-neutral-300 shadow-2xs'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isSelected ? 'text-red-600' : 'text-neutral-500'}`} />
                <span className={`text-[11px] tracking-tight text-center truncate w-full ${isSelected ? 'font-bold text-red-600' : 'font-medium text-neutral-700'}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTROS AVANZADOS Y SUBFILTROS MEJORADOS */}
      <div className="flex flex-col gap-3 pt-3 border-t border-neutral-200/60">
        <button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all tracking-wide">
          <SlidersHorizontal className="w-3.5 h-3.5 text-red-500" />
          Filtros Avanzados
        </button>

        {/* Hoteles / Airbnb / Hostal */}
        {(activeService === 'hotel' || activeService === 'airbnb' || activeService === 'hostal') && (
          <div className="flex flex-col gap-3 text-xs bg-white p-4.5 rounded-2xl border border-neutral-200/60 shadow-xs">
            <label className="flex flex-col gap-1.5 font-medium text-neutral-700">
              <span className="text-[11px]">Huéspedes: <strong className="text-neutral-900 font-bold">{hGuests}</strong></span>
              <input type="range" min="1" max="10" value={hGuests} onChange={(e) => setHGuests(Number(e.target.value))} className="accent-red-600 w-full cursor-pointer" />
            </label>
            <div className="flex gap-2 items-center">
              <input type="number" placeholder="Mín ($)" value={hPriceMin} onChange={(e) => setHPriceMin(Number(e.target.value))} className="w-1/2 bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-red-500" />
              <span className="text-neutral-400">—</span>
              <input type="number" placeholder="Máx ($)" value={hPriceMax} onChange={(e) => setHPriceMax(Number(e.target.value))} className="w-1/2 bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-red-500" />
            </div>
            <div className="flex flex-col gap-2 font-normal text-neutral-600 text-xs pt-1 border-t border-neutral-100">
              <label className="flex items-center gap-2.5 cursor-pointer hover:text-neutral-900"><input type="checkbox" checked={hSpaPool} onChange={(e) => setHSpaPool(e.target.checked)} className="accent-red-600 rounded" /> Spa o piscina</label>
              <label className="flex items-center gap-2.5 cursor-pointer hover:text-neutral-900"><input type="checkbox" checked={hTopRated} onChange={(e) => setHTopRated(e.target.checked)} className="accent-red-600 rounded" /> Mejores calificaciones</label>
              <label className="flex items-center gap-2.5 cursor-pointer hover:text-neutral-900"><input type="checkbox" checked={hPets} onChange={(e) => setHPets(e.target.checked)} className="accent-red-600 rounded" /> Mascotas permitidas</label>
              <label className="flex items-center gap-2.5 cursor-pointer hover:text-neutral-900"><input type="checkbox" checked={hAc} onChange={(e) => setHAc(e.target.checked)} className="accent-red-600 rounded" /> Aire acondicionado</label>
              <label className="flex items-center gap-2.5 cursor-pointer hover:text-neutral-900"><input type="checkbox" checked={hParking} onChange={(e) => setHParking(e.target.checked)} className="accent-red-600 rounded" /> Parqueadero privado</label>
            </div>
          </div>
        )}

        {/* Restaurantes (Diseño mejorado con tarjetas/chips visuales modernos) */}
        {activeService === 'restaurante' && (
          <div className="flex flex-col gap-2 bg-white p-4.5 rounded-2xl border border-neutral-200/60 shadow-xs">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Filtrar por ambiente:</span>
            <div className="flex flex-col gap-1.5 max-h-[240px] overflow-y-auto pr-1">
              {[
                { id: 'todos', label: 'Top Calificados', icon: Flame },
                { id: 'musica', label: 'Música en vivo', icon: Music },
                { id: 'vista', label: 'Vista panorámica', icon: Eye },
                { id: 'romantico', label: 'Ambiente Romántico', icon: Heart },
                { id: 'familiar', label: 'Espacio Familiar', icon: Users },
                { id: 'tematica', label: 'Temática Exclusiva', icon: Sparkles },
                { id: 'pais', label: 'Cocina Internacional', icon: Globe },
                { id: 'vegetariano', label: 'Opciones Veggie', icon: Trees },
              ].map((item) => {
                const SubIcon = item.icon;
                const isSelected = rSubFilters.has(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleMultiSelect(rSubFilters, setRSubFilters, item.id)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer border ${
                      isSelected 
                        ? 'bg-red-50 border-red-500 text-red-700 font-bold shadow-xs' 
                        : 'bg-neutral-50/70 border-neutral-200/60 text-neutral-700 hover:bg-neutral-100 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <SubIcon className={`w-4 h-4 ${isSelected ? 'text-red-600' : 'text-neutral-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-red-600 stroke-[3]" />}
                  </button>
                );
              })}
            </div>

            {rSubFilters.has('pais') && (
              <div className="flex flex-col gap-1 pl-2 mt-2 pt-2 border-t border-neutral-100">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Regiones:</span>
                {['Italia', 'Japón', 'México', 'Francia', 'Perú', 'España', 'Argentina', 'Colombia'].map((country) => (
                  <button
                    key={country}
                    onClick={() => toggleMultiSelect(rCountries, setRCountries, country, 'todos')}
                    className={`text-left px-2 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                      rCountries.has(country) ? 'bg-red-600 text-white font-bold' : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    • {country}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Comida Rápida (Diseño mejorado) */}
        {activeService === 'comida_rapida' && (
          <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto bg-white p-4.5 rounded-2xl border border-neutral-200/60 shadow-xs">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Especialidades:</span>
            {['Perro caliente', 'Hamburguesa', 'Salchipapa', 'Pollo frito', 'Empanadas', 'Pizza', 'Burritos'].map((item) => {
              const isSelected = fastFoodTypes.has(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleMultiSelect(fastFoodTypes, setFastFoodTypes, item, 'todos')}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer border ${
                    isSelected 
                      ? 'bg-red-50 border-red-500 text-red-700 font-bold shadow-xs' 
                      : 'bg-neutral-50/70 border-neutral-200/60 text-neutral-700 hover:bg-neutral-100 font-medium'
                  }`}
                >
                  <span>{item}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-red-600 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        )}

      </div>

    </aside>
  );
}