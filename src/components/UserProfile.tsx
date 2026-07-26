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

export default function UserProfile({ isOpen, onClose, currentCity }: UserProfileProps) {
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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Cabecera del Perfil */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
              👤
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-900">Mi Perfil de Viajero</h2>
              <p className="text-[11px] text-neutral-500">Ciudad actual: <span className="font-semibold text-red-600">{currentCity}</span></p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 text-sm font-bold px-2 py-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Pestañas de Navegación */}
        <div className="grid grid-cols-2 border-b border-neutral-200 text-xs font-bold text-center">
          <button
            onClick={() => setActiveTab('guardados')}
            className={`py-3 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'guardados' ? 'border-b-2 border-red-600 text-red-600 bg-red-50/50' : 'text-neutral-500 hover:bg-neutral-50'
            }`}
          >
            <Heart className="w-3.5 h-3.5" /> Mis Guardados ({savedPlaces.length})
          </button>
          <button
            onClick={() => setActiveTab('hoyQuiero')}
            className={`py-3 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'hoyQuiero' ? 'border-b-2 border-red-600 text-red-600 bg-red-50/50' : 'text-neutral-500 hover:bg-neutral-50'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" /> Hoy Quiero...
          </button>
        </div>

        {/* Contenido de las pestañas */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          
          {activeTab === 'guardados' && (
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">Lugares favoritos guardados</span>
              {savedPlaces.length === 0 ? (
                <div className="text-center py-10 text-neutral-400 text-xs">
                  <p>No tienes lugares guardados todavía.</p>
                  <p className="text-[10px] mt-1">Explora la ciudad y guarda tus favoritos.</p>
                </div>
              ) : (
                savedPlaces.map((place) => (
                  <div key={place.id} className="flex items-center justify-between bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 bg-neutral-200 rounded-lg overflow-hidden shrink-0">
                        {place.image ? (
                          <img src={place.image} alt={place.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs">📍</div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">{place.title}</h4>
                        <p className="text-[10px] text-neutral-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-600" /> {place.city} • <span className="uppercase">{place.category}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeSavedPlace(place.id)}
                      className="text-neutral-400 hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                      title="Eliminar de guardados"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'hoyQuiero' && (
            <div className="flex flex-col gap-3">
              <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-xs text-red-900">
                <p className="font-bold">Planifica tu ruta del día en {currentCity}</p>
                <p className="text-[11px] text-red-700 mt-0.5">Selecciona de tus guardados los sitios que deseas visitar hoy. Los ordenaremos automáticamente del más cercano al más lejano.</p>
              </div>

              <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase mt-1">Disponibles en {currentCity} para hoy:</span>
              
              {citySavedPlaces.length === 0 ? (
                <div className="text-center py-6 text-neutral-400 text-xs">
                  <p>No tienes lugares guardados en <strong>{currentCity}</strong>.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 max-h-45 overflow-y-auto pr-1">
                  {citySavedPlaces.map((place) => (
                    <label key={place.id} className="flex items-center justify-between bg-neutral-50 p-2 rounded-lg border border-neutral-100 cursor-pointer hover:bg-neutral-100 text-xs">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={selectedForRoute.includes(place.id)}
                          onChange={() => toggleRouteSelection(place.id)}
                          className="accent-red-600 rounded"
                        />
                        <span className="font-semibold text-neutral-800">{place.title}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 uppercase">{place.category}</span>
                    </label>
                  ))}
                </div>
              )}

              <button
                onClick={generateRoute}
                disabled={selectedForRoute.length === 0}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-300 text-white py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs mt-2"
              >
                Generar Ruta del Día ({selectedForRoute.length} seleccionados)
              </button>

              {/* Resultado de la Ruta Optimizada */}
              {optimizedRoute.length > 0 && (
                <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-neutral-200">
                  <span className="text-[10px] font-black tracking-widest text-red-600 uppercase">Ruta Optimizada (Cercano ➔ Lejano)</span>
                  <div className="flex flex-col gap-2">
                    {optimizedRoute.map((stop, index) => (
                      <div key={stop.id} className="flex items-center justify-between bg-neutral-900 text-white p-2.5 rounded-xl text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-bold">{stop.title}</p>
                            <p className="text-[10px] text-neutral-400 uppercase">{stop.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setOptimizedRoute(optimizedRoute.filter(r => r.id !== stop.id))}
                          className="text-neutral-400 hover:text-red-400 text-xs cursor-pointer"
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
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <RouteMap routeStops={optimizedRoute} currentCity={currentCity} />
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}