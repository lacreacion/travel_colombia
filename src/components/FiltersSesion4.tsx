import React from 'react';
import { MapPin, Search } from 'lucide-react';

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
    <aside className="w-full md:w-[15%] bg-white p-3 flex flex-col gap-3.5 h-[calc(100vh-80px)] sticky top-20 overflow-y-auto text-xs border-none shadow-none">
      
      {/* 1. Destino y Búsqueda */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[9px] font-black tracking-widest text-neutral-400 uppercase">1. Destino</span>
        <div className="flex gap-1.5">
          <div className="relative flex-1">
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-neutral-100 text-neutral-900 text-xs font-semibold rounded-lg px-2.5 py-1.5 appearance-none pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-600"
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <MapPin className="w-3.5 h-3.5 text-red-600 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button
            onClick={() => setHasSearched(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer transition-all shadow-xs"
            title="Buscar"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Categorías (Ya no fuerzan setHasSearched(true) para permitir armar los filtros con calma) */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[9px] font-black tracking-widest text-neutral-400 uppercase">2. Categorías</span>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'hotel', label: 'Hotel', icon: '🏨' },
            { id: 'airbnb', label: 'Airbnb', icon: '🏡' },
            { id: 'hostal', label: 'Hostal', icon: '🛏️' },
            { id: 'restaurante', label: 'Restaur.', icon: '🍽️' },
            { id: 'comida_rapida', label: 'C.Rápida', icon: '🍔' },
            { id: 'museo', label: 'Museo', icon: '🏛️' },
            { id: 'parque', label: 'Parque', icon: '🌳' },
            { id: 'sitios_historicos', label: 'Histór.', icon: '🏰' },
            { id: 'geniales', label: 'Genial', icon: '✨' },
          ].map((srv) => (
            <button
              key={srv.id}
              onClick={() => setActiveService(srv.id)}
              className={`py-2 px-1 rounded-lg text-xs transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                activeService === srv.id 
                  ? 'bg-red-600 text-white font-bold shadow-xs' 
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="text-sm">{srv.icon}</span>
              <span className="truncate w-full text-center text-[10px]">{srv.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filtros Avanzados */}
      <div className="flex flex-col gap-2 pt-1">
        <span className="text-[9px] font-black tracking-widest text-red-600 uppercase">Filtros Avanzados</span>

        {/* Hoteles / Airbnb / Hostal */}
        {(activeService === 'hotel' || activeService === 'airbnb' || activeService === 'hostal') && (
          <div className="flex flex-col gap-2 text-xs">
            <label className="flex flex-col gap-1 font-medium text-neutral-700">
              <span className="text-[11px]">Personas: <strong className="text-neutral-900">{hGuests}</strong></span>
              <input type="range" min="1" max="10" value={hGuests} onChange={(e) => setHGuests(Number(e.target.value))} className="accent-red-600 w-full cursor-pointer" />
            </label>
            <div className="flex gap-1.5 items-center">
              <input type="number" placeholder="Mín" value={hPriceMin} onChange={(e) => setHPriceMin(Number(e.target.value))} className="w-1/2 bg-neutral-100 rounded-lg p-1.5 text-xs text-neutral-800 focus:outline-none" />
              <span className="text-neutral-400">-</span>
              <input type="number" placeholder="Máx" value={hPriceMax} onChange={(e) => setHPriceMax(Number(e.target.value))} className="w-1/2 bg-neutral-100 rounded-lg p-1.5 text-xs text-neutral-800 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5 font-normal text-neutral-700 text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer hover:text-neutral-900"><input type="checkbox" checked={hSpaPool} onChange={(e) => setHSpaPool(e.target.checked)} className="accent-red-600 rounded" /> Spa o piscina</label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-neutral-900"><input type="checkbox" checked={hTopRated} onChange={(e) => setHTopRated(e.target.checked)} className="accent-red-600 rounded" /> Mejores calificaciones</label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-neutral-900"><input type="checkbox" checked={hPets} onChange={(e) => setHPets(e.target.checked)} className="accent-red-600 rounded" /> Mascotas</label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-neutral-900"><input type="checkbox" checked={hAc} onChange={(e) => setHAc(e.target.checked)} className="accent-red-600 rounded" /> Aire acondicionado</label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-neutral-900"><input type="checkbox" checked={hParking} onChange={(e) => setHParking(e.target.checked)} className="accent-red-600 rounded" /> Parqueadero</label>
            </div>
          </div>
        )}

        {/* Restaurantes (Con selección múltiple y submenús intactos) */}
        {activeService === 'restaurante' && (
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1 max-h-[220px] overflow-y-auto pr-1">
              {[
                { id: 'todos', label: '⭐ Top Calificados' },
                { id: 'musica', label: '🎵 Música en vivo' },
                { id: 'vista', label: '🌅 Buena vista' },
                { id: 'romantico', label: '💖 Románticos' },
                { id: 'familiar', label: '👨‍👩‍👧‍👦 Familiares' },
                { id: 'tematica', label: '🎭 Temática' },
                { id: 'pais', label: '🌍 Por País' },
                { id: 'vegetariano', label: '🥗 Vegetarianos' },
                { id: 'tipica', label: '🍲 Típica' },
                { id: 'comida_rapida_ref', label: '🍔 Rápida' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleMultiSelect(rSubFilters, setRSubFilters, item.id)}
                  className={`text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                    rSubFilters.has(item.id) ? 'bg-red-600 text-white font-bold shadow-xs' : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Submenú de Países */}
            {rSubFilters.has('pais') && (
              <div className="flex flex-col gap-1 pl-2 mt-1.5">
                <span className="text-[9px] font-bold text-neutral-400 uppercase">Países:</span>
                {['Italia', 'Japón', 'México', 'Francia', 'Perú', 'China', 'Tailandia', 'España', 'Argentina', 'Colombia', 'India'].map((country) => (
                  <button
                    key={country}
                    onClick={() => toggleMultiSelect(rCountries, setRCountries, country, 'todos')}
                    className={`text-left px-2 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                      rCountries.has(country) ? 'bg-red-600 text-white font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    • {country}
                  </button>
                ))}
              </div>
            )}

            {/* Submenú de Temáticas */}
            {rSubFilters.has('tematica') && (
              <div className="flex flex-col gap-1 pl-2 mt-1.5">
                <span className="text-[9px] font-bold text-neutral-400 uppercase">Temáticas:</span>
                {['Televisiva', 'Musical', 'Terror', 'Fantasía', 'Oriental', 'Circo', 'Animada'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => toggleMultiSelect(rThemes, setRThemes, theme, 'todos')}
                    className={`text-left px-2 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                      rThemes.has(theme) ? 'bg-red-600 text-white font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    • {theme}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Comida Rápida (Con selección múltiple habilitada) */}
        {activeService === 'comida_rapida' && (
          <div className="flex flex-col gap-1 max-h-[220px] overflow-y-auto">
            {['Perro caliente', 'Hamburguesa', 'Salchipapa', 'Pollo frito o broaster', 'Empanadas', 'Arepas rellenas', 'Pizza', 'Mazorcada', 'Burritos'].map((item) => (
              <button
                key={item}
                onClick={() => toggleMultiSelect(fastFoodTypes, setFastFoodTypes, item, 'todos')}
                className={`text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  fastFoodTypes.has(item) ? 'bg-red-600 text-white font-bold shadow-xs' : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Museos, Parques e Históricos */}
        {(activeService === 'museo' || activeService === 'parque' || activeService === 'sitios_historicos') && (
          <div className="flex flex-col gap-2 font-normal text-neutral-700 text-xs">
            <label className="flex items-center gap-2 cursor-pointer hover:text-neutral-900"><input type="checkbox" checked={cOpen} onChange={(e) => setCOpen(e.target.checked)} className="accent-red-600 rounded" /> Abierto</label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-neutral-900"><input type="checkbox" checked={cFree} onChange={(e) => setCFree(e.target.checked)} className="accent-red-600 rounded" /> Sin cobro</label>
          </div>
        )}

        {/* Sitios Geniales */}
        {activeService === 'geniales' && (
          <div className="flex flex-col gap-1 max-h-[220px] overflow-y-auto">
            {['bar', 'restaurante', 'comida', 'parque', 'museo', 'zoológico', 'recomendaciones'].map((cat) => (
              <button
                key={cat}
                onClick={() => setGeniusCategory(cat)}
                className={`text-left px-2.5 py-1.5 rounded-lg text-xs uppercase font-medium transition-all cursor-pointer ${
                  geniusCategory === cat ? 'bg-red-600 text-white font-bold shadow-xs' : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}