'use client';

import { useState } from 'react';
import { X, Hotel, MapPin, Building2, Landmark, Trees, Ticket, Utensils, Star, Compass } from 'lucide-react';

const CATEGORIES = [
  { id: 'lodging', name: 'Hoteles', icon: Hotel },
  { id: 'airbnb', name: 'RBNB', icon: Building2 },
  { id: 'hostel', name: 'Hostal', icon: MapPin },
  { id: 'museum', name: 'Museos', icon: Landmark },
  { id: 'park', name: 'Parques', icon: Trees },
  { id: 'movie_theater', name: 'Teatros', icon: Ticket },
  { id: 'restaurant', name: 'Restaurantes', icon: Utensils },
  { id: 'cafe', name: 'Comidas', icon: Utensils },
  { id: 'tourist_attraction', name: 'Sitios', icon: Star },
  { id: 'church', name: 'Iglesias', icon: Landmark },
];

const MOCK_PLACES: Record<string, { name: string; type: string; top: string; left: string }[]> = {
  restaurant: [
    { name: "Andrés Carne de Res", type: "Restaurante", top: "40%", left: "50%" },
    { name: "La Puerta Falsa", type: "Comida Local", top: "60%", left: "45%" }
  ],
  lodging: [
    { name: "Hotel Click Clack", type: "Hotel", top: "30%", left: "55%" },
    { name: "Hotel Tequendama", type: "Hotel", top: "65%", left: "38%" }
  ],
  park: [
    { name: "Parque de la 93", type: "Parque", top: "25%", left: "60%" },
    { name: "Simón Bolívar", type: "Parque", top: "50%", left: "30%" }
  ]
};

interface MapFilterProps {
  isOpen: boolean;
  onClose: () => void;
  radiusKm: number;
  isMapLoaded: boolean;
}

// Corrección: Agregamos isMapLoaded a la desestructuración para evitar avisos de TypeScript
export default function MapFilter({ isOpen, onClose, radiusKm, isMapLoaded }: MapFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>('restaurant');
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  // Si isOpen es falso, este componente no renderiza NADA y deja ver el fondo limpio
  if (!isOpen) return null;

  const currentPlaces = MOCK_PLACES[activeCategory] || [
    { name: `Sitio Recomendado de ${activeCategory}`, type: "Turismo", top: "45%", left: "48%" }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0c0e12] border border-zinc-800 w-full max-w-2xl h-[58vh] rounded-[1.5rem] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-2.5 bg-[#11141b] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Compass className="w-4 h-4 text-blue-500" />
            <div>
              <h2 className="text-white font-black text-[11px] uppercase tracking-widest">Sitios Cercanos (Modo Demo)</h2>
              <p className="text-[10px] text-gray-400">Radio de búsqueda: <span className="text-blue-500 font-extrabold">{radiusKm} KM</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 bg-zinc-800 text-gray-400 hover:text-white rounded-full transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden h-full">
          {/* Filtros */}
          <div className="w-full sm:w-56 bg-[#0e1117] border-r border-zinc-800/60 p-2.5 overflow-y-auto flex flex-col gap-2 select-none">
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest px-1">Filtros</span>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSelectedPlace(null);
                    }}
                    className={`flex flex-col items-center justify-center gap-1 p-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg text-center transition-all border ${
                      activeCategory === cat.id
                        ? 'bg-blue-600/10 border-blue-500 text-white'
                        : 'text-zinc-400 border-transparent hover:text-white hover:bg-zinc-800/40'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${activeCategory === cat.id ? 'text-blue-400' : 'text-blue-500'}`} />
                    <span className="truncate w-full block text-[8px] tracking-tight">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grilla Demo de Mapa */}
          <div className="flex-1 bg-[#15181f] relative h-full overflow-hidden" style={{ backgroundImage: 'radial-gradient(#242936 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
              <div className="absolute w-24 h-24 bg-blue-500/10 rounded-full animate-pulse border border-blue-500/20" />
              <div className="w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full shadow-md" />
            </div>

            {currentPlaces.map((place, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPlace(place.name)}
                className="absolute z-20 group -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                style={{ top: place.top, left: place.left }}
              >
                <div className="w-6 h-6 bg-red-500 border border-zinc-900 rounded-full flex items-center justify-center shadow-lg transition-colors group-hover:bg-red-400">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </div>
                
                {/* Tooltip flotante rápido */}
                <span className="absolute left-1/2 -translate-x-1/2 top-7 bg-zinc-950/90 text-white border border-zinc-800 text-[8px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {place.name}
                </span>
              </button>
            ))}

            {/* Ventana informativa emergente al hacer clic sobre un marcador */}
            {selectedPlace && (
              <div className="absolute bottom-3 left-3 right-3 bg-zinc-950/90 border border-zinc-800 p-2 rounded-xl backdrop-blur-md animate-in slide-in-from-bottom-2 duration-200 z-30">
                <p className="text-white text-[10px] font-black uppercase tracking-wider">{selectedPlace}</p>
                <p className="text-blue-400 text-[8px] uppercase font-bold tracking-tight">Destino seleccionado exitosamente</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}