import RouteMap from './RouteMap';
import React, { useState } from 'react';
import { Trash2, MapPin, Heart, Navigation } from 'lucide-react';

interface SavedPlace {
  id: string;
  title: string;
  category: string;
  city: string;
  image?: string;
  lat?: number;
  lng?: number;
}

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: string;
  user?: { name: string; email: string } | null; 
  onLogout?: () => void;
}

export default function UserProfile({ isOpen, onClose, currentCity, onLogout }: UserProfileProps) {
  // Inicialización perezosa para evitar llamadas a setState síncronas en useEffect
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('travel_colombia_saved');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Error al leer guardados", e);
      }
    }
    return [];
  });

  const [activeTab, setActiveTab] = useState<'guardados' | 'hoyQuiero'>('guardados');
  const [selectedForRoute, setSelectedForRoute] = useState<string[]>([]);
  const [optimizedRoute, setOptimizedRoute] = useState<SavedPlace[]>([]);

  // Función para eliminar un lugar guardado
  const removeSavedPlace = (id: string) => {
    const updated = savedPlaces.filter(p => p.id !== id);
    setSavedPlaces(updated);
    localStorage.setItem('travel_colombia_saved', JSON.stringify(updated));
    setSelectedForRoute(selectedForRoute.filter(itemId => itemId !== id));
  };

  // Manejar selección para el plan "Hoy quiero"
  const toggleRouteSelection = (id: string) => {
    if (selectedForRoute.includes(id)) {
      setSelectedForRoute(selectedForRoute.filter(itemId => itemId !== id));
    } else {
      setSelectedForRoute([...selectedForRoute, id]);
    }
  };

  // Generar ruta ordenada por cercanía (de la más cercana a la más lejana)
  const generateRoute = () => {
    const placesToRoute = savedPlaces.filter(p => selectedForRoute.includes(p.id));
    if (placesToRoute.length === 0) return;

    const sorted = [...placesToRoute].sort((a, b) => {
      if (a.lat && a.lng && b.lat && b.lng) {
        const distA = Math.sqrt(Math.pow(a.lat - 4.6097, 2) + Math.pow(a.lng - -74.0817, 2));
        const distB = Math.sqrt(Math.pow(b.lat - 4.6097, 2) + Math.pow(b.lng - -74.0817, 2));
        return distA - distB;
      }
      return 0;
    });

    setOptimizedRoute(sorted);
  };

  if (!isOpen) return null;

  // Filtrar lugares guardados que correspondan a la ciudad actual seleccionada
  const citySavedPlaces = savedPlaces.filter(p => p.city.toLowerCase() === currentCity.toLowerCase());

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-gradient-to-b from-neutral-900 to-black h-full shadow-[-15px_0_50px_rgba(245,158,11,0.1)] flex flex-col animate-in slide-in-from-right duration-300 border-l border-amber-500/20">
        
        {/* Destello sutil de fondo en la cabecera */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Cabecera del Perfil */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-black flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              👤
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-wider text-white uppercase">Mi Perfil de Viajero</h2>
              <p className="text-[11px] text-neutral-400 mt-0.5">Ciudad actual: <span className="font-bold text-amber-400 uppercase">{currentCity}</span></p>
            </div>
          </div>

          {/* Contenedor de Botones (Cerrar Sesión y Cerrar Panel) */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                localStorage.removeItem('travel_colombia_user');
                window.dispatchEvent(new Event('storage'));
                if (onLogout) onLogout();
                onClose();
              }}
              className="text-[10px] font-bold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-3 py-1.5 rounded-full transition-all cursor-pointer uppercase tracking-wider"
              title="Cerrar sesión"
            >
              Cerrar Sesión
            </button>

            <button 
              onClick={onClose}
              className="text-neutral-500 hover:text-white bg-neutral-800/50 hover:bg-neutral-700/50 border border-neutral-700/50 rounded-full w-8 h-8 flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Pestañas de Navegación */}
        <div className="grid grid-cols-2 border-b border-neutral-800 text-[11px] font-bold text-center bg-neutral-900/30">
          <button
            onClick={() => setActiveTab('guardados')}
            className={`py-4 transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-widest ${
              activeTab === 'guardados' 
                ? 'border-b-2 border-amber-400 text-amber-400 bg-amber-500/5' 
                : 'text-neutral-500 hover:bg-neutral-800/50 hover:text-neutral-300 border-b-2 border-transparent'
            }`}
          >
            <Heart className="w-3.5 h-3.5" /> Mis Guardados ({savedPlaces.length})
          </button>
          <button
            onClick={() => setActiveTab('hoyQuiero')}
            className={`py-4 transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-widest ${
              activeTab === 'hoyQuiero' 
                ? 'border-b-2 border-amber-400 text-amber-400 bg-amber-500/5' 
                : 'text-neutral-500 hover:bg-neutral-800/50 hover:text-neutral-300 border-b-2 border-transparent'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" /> Hoy Quiero...
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 relative z-10 custom-scrollbar">
          
          {/* ================= PESTAÑA: GUARDADOS ================= */}
          {activeTab === 'guardados' && (
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-black tracking-widest text-amber-500/70 uppercase">Lugares favoritos guardados</span>
              
              {savedPlaces.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 text-xs bg-neutral-900/30 rounded-2xl border border-neutral-800 border-dashed">
                  <Heart className="w-8 h-8 mx-auto mb-3 text-neutral-700" />
                  <p className="text-neutral-400">No tienes lugares guardados todavía.</p>
                  <p className="text-[10px] mt-1 text-neutral-500">Explora la ciudad y guarda tus favoritos.</p>
                </div>
              ) : (
                savedPlaces.map((place) => (
                  <div key={place.id} className="flex items-center justify-between bg-neutral-800/40 hover:bg-neutral-800/80 p-3 rounded-2xl border border-neutral-700/50 shadow-md transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-neutral-900 rounded-xl overflow-hidden shrink-0 border border-neutral-700/50">
                        {place.image ? (
                          <img src={place.image} alt={place.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs">📍</div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{place.title}</h4>
                        <p className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-500" /> {place.city} • <span className="uppercase">{place.category}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeSavedPlace(place.id)}
                      className="text-neutral-500 hover:text-red-500 bg-neutral-900/50 p-2 rounded-full transition-colors cursor-pointer"
                      title="Eliminar de guardados"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ================= PESTAÑA: HOY QUIERO ================= */}
          {activeTab === 'hoyQuiero' && (
            <div className="flex flex-col gap-4">
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl"></div>
                <p className="font-bold text-amber-400 text-sm mb-1 relative z-10">Planifica tu ruta del día en {currentCity}</p>
                <p className="text-[11px] text-neutral-300 leading-relaxed relative z-10">Selecciona de tus guardados los sitios que deseas visitar hoy. Los ordenaremos automáticamente del más cercano al más lejano.</p>
              </div>

              <span className="text-[10px] font-black tracking-widest text-amber-500/70 uppercase mt-2">Disponibles en {currentCity} para hoy:</span>
              
              {citySavedPlaces.length === 0 ? (
                <div className="text-center py-8 text-neutral-400 text-xs bg-neutral-900/30 rounded-2xl border border-neutral-800 border-dashed">
                  <p>No tienes lugares guardados en <strong className="text-amber-400">{currentCity}</strong>.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {citySavedPlaces.map((place) => (
                    <label key={place.id} className="flex items-center justify-between bg-neutral-800/40 p-3 rounded-xl border border-neutral-700/50 cursor-pointer hover:bg-neutral-800 hover:border-amber-500/40 transition-all text-xs group">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={selectedForRoute.includes(place.id)}
                          onChange={() => toggleRouteSelection(place.id)}
                          className="w-4 h-4 accent-amber-500 rounded bg-neutral-900 border-neutral-700 cursor-pointer"
                        />
                        <span className={`font-semibold transition-colors ${selectedForRoute.includes(place.id) ? 'text-amber-400' : 'text-white'}`}>
                          {place.title}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold tracking-wider text-neutral-500 uppercase bg-neutral-900 px-2 py-1 rounded-md">{place.category}</span>
                    </label>
                  ))}
                </div>
              )}

              <button
                onClick={generateRoute}
                disabled={selectedForRoute.length === 0}
                className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 disabled:opacity-50 disabled:grayscale text-neutral-950 py-3.5 rounded-xl text-xs font-extrabold tracking-widest uppercase transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.2)] mt-2"
              >
                Generar Ruta ({selectedForRoute.length})
              </button>

              {/* Resultado de la Ruta Optimizada */}
              {optimizedRoute.length > 0 && (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-neutral-800">
                  <span className="text-[10px] font-black tracking-widest text-green-400 uppercase flex items-center gap-1">
                    <Navigation className="w-3 h-3" /> Ruta Optimizada (Cercano ➔ Lejano)
                  </span>
                  <div className="flex flex-col gap-2">
                    {optimizedRoute.map((stop, index) => (
                      <div key={stop.id} className="flex items-center justify-between bg-black/60 border border-amber-500/20 text-white p-3 rounded-xl text-xs hover:border-amber-500/50 transition-all">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-extrabold text-[10px] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-bold text-sm text-neutral-200">{stop.title}</p>
                            <p className="text-[9px] tracking-wider text-neutral-500 uppercase mt-0.5">{stop.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setOptimizedRoute(optimizedRoute.filter(r => r.id !== stop.id))}
                          className="text-neutral-500 hover:text-red-400 text-lg cursor-pointer px-2"
                          title="Quitar de la ruta"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* COMPONENTE DE MAPA DE RUTA */}
              <div className="mt-2 pt-4 border-t border-neutral-800">
                <RouteMap routeStops={optimizedRoute} currentCity={currentCity} />
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}