'use client';
import { useState, useRef, useEffect } from 'react';
import { Bookmark, Eye, Bus, ExternalLink, X, MapPin } from 'lucide-react';

interface Place {
  id: string;
  title: string;
  desc: string;
  images: string[];
  info: string;
}

interface SavedPlaceItem {
  id: string;
  title: string;
  category: string;
  city: string;
  image?: string;
  lat?: number;
  lng?: number;
}

const DESTINATIONS_DATA: Record<string, Place[]> = {
  "Bogotá": [
    { 
      id: '1', 
      title: 'Zipaquirá', 
      desc: 'Famosa por su majestuosa Catedral de Sal subterránea.', 
      images: [
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60'
      ], 
      info: 'Zipaquirá ofrece arquitectura colonial e historia minera a pocos kilómetros de la capital.' 
    },
    { 
      id: '2', 
      title: 'Choachí', 
      desc: 'Pueblo de montaña con aguas termales y gran biodiversidad.', 
      images: [
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=60'
      ], 
      info: 'Ideal para desconectarse, disfrutar de los termales y caminatas ecológicas.' 
    },
    { 
      id: '3', 
      title: 'Guatavita', 
      desc: 'Cuna de la legendaria leyenda de Eldorado y su hermosa laguna.', 
      images: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=60'
      ], 
      info: 'Un embalse imponente con senderos sagrados y artesanías locales.' 
    },
    { 
      id: '4', 
      title: 'Chía', 
      desc: 'Gastronomía típica, sabana abierta y centros históricos vibrantes.', 
      images: [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60'
      ], 
      info: 'Reconocido por sus restaurantes campestres y cercanía con la metrópoli.' 
    },
    { 
      id: '5', 
      title: 'Suesca', 
      desc: 'Paraíso de la escalada en roca y deportes de aventura.', 
      images: [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60'
      ], 
      info: 'Rocas imponentes, vías férreas antiguas y turismo de aventura.' 
    }
  ],
  "Medellín": [
    { id: '1', title: 'Guatapé', desc: 'Piedra del Peñol y coloridos zócalos.', images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60'], info: 'Vistas panorámicas inolvidables.' },
    { id: '2', title: 'Santa Fe', desc: 'Arquitectura colonial e historia.', images: ['https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=60'], info: 'Pueblo patrimonio.' },
    { id: '3', title: 'Jericó', desc: 'Tierra de carriel y tradición.', images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60'], info: 'Cafetales y miradores.' },
    { id: '4', title: 'Jardín', desc: 'Calles coloridas y cascadas.', images: ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=60'], info: 'Rincón tradicional.' },
    { id: '5', title: 'Envigado', desc: 'Tranquilidad y parques ecológicos.', images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=60'], info: 'Zona moderna al sur.' }
  ],
  "Cali": [
    { id: '1', title: 'San Antonio', desc: 'Barrio bohemio y mirador.', images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=60'], info: 'Cafés artísticos.' },
    { id: '2', title: 'Pance', desc: 'Naturaleza y río cristalino.', images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60'], info: 'Zona de ecoturismo.' },
    { id: '3', title: 'Buga', desc: 'Basílica e historia religiosa.', images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=60'], info: 'Ciudad turística.' },
    { id: '4', title: 'Mulaló', desc: 'Historia y paisajes de falda.', images: ['https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=60'], info: 'Herencia colonial.' },
    { id: '5', title: 'Calima', desc: 'Lago ideal para deportes náuticos.', images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60'], info: 'Vientos para Kitesurf.' }
  ]
};

const DEFAULT_PLACES: Place[] = [
  { id: '1', title: 'Mirador Principal', desc: 'Punto turístico recomendado.', images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60'], info: 'Excelente opción.' }
];

interface Props {
  selectedCity: string;
  onNavigateToSession4: (placeId: string) => void;
}

export default function CarouselSession3({ selectedCity, onNavigateToSession4 }: Props) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  const [savedPlacesIds, setSavedPlacesIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('travel_colombia_saved');
    if (stored) {
      try {
        const parsed: SavedPlaceItem[] = JSON.parse(stored);
        return parsed.map(p => p.id);
      } catch (e) {
        console.error("Error al leer guardados", e);
      }
    }
    return [];
  });

  const [isRouteMapOpen, setIsRouteMapOpen] = useState(false);
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({});
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const currentCityKey = selectedCity || "Bogotá";
  const places = DESTINATIONS_DATA[currentCityKey] || DEFAULT_PLACES;

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationKey(prev => prev + 1);
        }
      },
      { threshold: 0.2 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleElementScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      
      if (scrollWidth > 0) {
        const progress = (scrollLeft / scrollWidth) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    container.addEventListener('scroll', handleElementScroll);
    handleElementScroll();

    return () => {
      container.removeEventListener('scroll', handleElementScroll);
    };
  }, [places, animationKey]);

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const barWidth = rect.width;
    const percentage = clickX / barWidth;

    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({
      left: maxScroll * percentage,
      behavior: 'smooth'
    });
  };

  const handleNextCardImage = (placeId: string, maxImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardImageIndices(prev => {
      const currentIndex = prev[placeId] || 0;
      const nextIndex = (currentIndex + 1) % maxImages;
      return { ...prev, [placeId]: nextIndex };
    });
  };

  const handlePrevCardImage = (placeId: string, maxImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardImageIndices(prev => {
      const currentIndex = prev[placeId] || 0;
      const prevIndex = (currentIndex - 1 + maxImages) % maxImages;
      return { ...prev, [placeId]: prevIndex };
    });
  };

  const toggleSave = (place: Place, e: React.MouseEvent) => {
    e.stopPropagation();
    const stored = localStorage.getItem('travel_colombia_saved');
    const savedList: SavedPlaceItem[] = stored ? JSON.parse(stored) : [];

    const placeData: SavedPlaceItem = {
      id: String(place.id),
      title: place.title,
      category: 'Destino',
      city: currentCityKey,
      image: place.images[0] || '',
      lat: 4.6097,
      lng: -74.0817
    };

    const index = savedList.findIndex(p => p.id === placeData.id);

    if (index > -1) {
      savedList.splice(index, 1);
    } else {
      savedList.push(placeData);
    }

    localStorage.setItem('travel_colombia_saved', JSON.stringify(savedList));
    setSavedPlacesIds(savedList.map(p => p.id));
  };

  const handleTransportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) return;
    const transportLinks: Record<string, string> = {
      "uber": "https://m.uber.com",
      "didi": "https://www.didi-global.com",
      "transmilenio": "https://www.transmilenio.gov.co",
      "bus": "https://www.rome2rio.com",
      "terminal": "https://www.terminaldetransporte.com"
    };
    if (transportLinks[val]) window.open(transportLinks[val], '_blank');
  };

  return (
    <div ref={sectionRef} className="w-full max-w-[1200px] mx-auto px-4 py-12 relative">
      <style jsx>{`
        @keyframes colombiaGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(35px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .colombia-title {
          background: linear-gradient(270deg, #FCD116, #003893, #CE1126, #FCD116);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: colombiaGradient 6s ease infinite;
        }
        .animate-cascade {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* CABECERA */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-black italic tracking-wider colombia-title inline-block">
          ESCAPADAS EN {currentCityKey.toUpperCase()}
        </h2>
        <p className="text-slate-400 text-xs mt-1">Desliza o haz clic en la barra inferior para ver más destinos</p>
      </div>

      {/* CONTENEDOR DEL CARRUSEL */}
      <div className="relative">
        
        <div 
          key={animationKey}
          ref={scrollContainerRef}
          className="flex justify-start gap-5 overflow-x-auto no-scrollbar scroll-smooth py-4 px-2 snap-x snap-mandatory"
        >
          {places.map((place, index) => {
            const isSaved = savedPlacesIds.includes(String(place.id));
            const currentImgIdx = cardImageIndices[place.id] || 0;
            const animationDelay = `${index * 0.10}s`;

            return (
              <div 
                key={place.id} 
                style={{ animationDelay, opacity: 0 }}
                className="w-[275px] min-w-[275px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-blue-500/60 transition-all duration-300 p-3.5 shrink-0 snap-start animate-cascade shadow-lg"
              >
                
                {/* TÍTULO DE LA CAJA */}
                <div className="mb-2 px-0.5">
                  <h3 className="text-white font-black text-xs uppercase tracking-tight truncate">{place.title}</h3>
                </div>

                {/* IMAGEN CON CARRUSEL INTERNO */}
                <div className="relative h-32 rounded-xl overflow-hidden mb-2.5 bg-slate-950 group/img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={place.images[currentImgIdx]} 
                    alt={place.title} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" 
                  />

                  <button 
                    onClick={(e) => toggleSave(place, e)}
                    className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all shadow-md z-10 cursor-pointer ${isSaved ? 'bg-blue-600 text-white' : 'bg-black/50 text-white hover:bg-blue-600'}`}
                  >
                    <Bookmark className="w-3 h-3 fill-current" />
                  </button>

                  <button 
                    onClick={(e) => handlePrevCardImage(place.id, place.images.length, e)}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-blue-600 text-white p-1 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity z-10 cursor-pointer text-xs"
                  >
                    &larr;
                  </button>

                  <button 
                    onClick={(e) => handleNextCardImage(place.id, place.images.length, e)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-blue-600 text-white p-1 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity z-10 cursor-pointer text-xs"
                  >
                    &rarr;
                  </button>

                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                    {place.images.map((_, idx) => (
                      <span 
                        key={idx} 
                        className={`h-0.5 rounded-full transition-all ${idx === currentImgIdx ? 'w-2.5 bg-cyan-400' : 'w-1 bg-white/50'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* DESCRIPCIÓN Y BOTÓN */}
                <div className="flex flex-col justify-between flex-1 space-y-2.5 px-0.5">
                  <p className="text-slate-400 text-[10px] line-clamp-2 leading-relaxed">{place.desc}</p>
                  
                  <div className="pt-1.5 border-t border-slate-800">
                    <button 
                      onClick={() => { setSelectedPlace(place); setModalImageIndex(0); }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all shadow-md cursor-pointer active:scale-95"
                    >
                      <Eye className="w-3 h-3"/> Ver más
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* BARRA DE PROGRESO INFERIOR INTERACTIVA */}
        <div className="flex justify-center mt-3">
          <div 
            onClick={handleBarClick}
            className="w-36 h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden relative shadow-inner cursor-pointer hover:border-cyan-500/50 transition-colors"
            title="Haz clic para desplazarte"
          >
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_12px_rgba(56,189,248,0.7)] transition-all duration-150 rounded-full pointer-events-none"
              style={{ width: `${Math.max(scrollProgress, 15)}%` }}
            />
          </div>
        </div>

      </div>

      {/* VENTANA MODAL "VER MÁS" */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <h3 className="text-white font-black text-base uppercase flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" /> {selectedPlace.title}
              </h3>
              <button onClick={() => setSelectedPlace(null)} className="bg-slate-800 hover:bg-red-500 text-slate-400 hover:text-white p-2 rounded-full transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedPlace.images[modalImageIndex]} alt={selectedPlace.title} className="w-full h-full object-cover" />

                <button onClick={() => setModalImageIndex(prev => (prev - 1 + selectedPlace.images.length) % selectedPlace.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer text-xs">&larr;</button>
                <button onClick={() => setModalImageIndex(prev => (prev + 1) % selectedPlace.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer text-xs">&rarr;</button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <h4 className="text-[10px] font-black text-cyan-400 uppercase">Acerca del Destino</h4>
                <p className="text-slate-300 text-xs leading-relaxed">{selectedPlace.info}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl"><MapPin className="w-4 h-4" /></div>
                  <div>
                    <h5 className="text-white text-xs font-black uppercase">Ubicación y Ruta</h5>
                    <p className="text-slate-400 text-[10px]">Trazar ruta hacia el destino.</p>
                  </div>
                </div>
                <button onClick={() => setIsRouteMapOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase cursor-pointer">Abrir Mapa</button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl"><Bus className="w-4 h-4" /></div>
                  <div>
                    <h5 className="text-white text-xs font-black uppercase">Transporte</h5>
                    <p className="text-slate-400 text-[10px]">Selecciona tu medio:</p>
                  </div>
                </div>
                <select onChange={handleTransportChange} className="bg-slate-900 border border-slate-700 text-white text-xs font-bold px-3 py-2 rounded-xl outline-none cursor-pointer uppercase">
                  <option value="">Seleccionar...</option>
                  <option value="uber">Uber</option>
                  <option value="didi">Didi</option>
                  <option value="transmilenio">Transmilenio</option>
                </select>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
              <button onClick={(e) => toggleSave(selectedPlace, e)} className="px-4 py-2 rounded-full text-xs font-black uppercase bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer">
                {savedPlacesIds.includes(String(selectedPlace.id)) ? 'Quitar Guardado' : 'Guardar'}
              </button>
              <button onClick={() => { setSelectedPlace(null); onNavigateToSession4(selectedPlace.id); }} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                Ver servicios <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL DE MAPA DE RUTA */}
      {isRouteMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[60vh]">
            <div className="bg-[#ebf2ff] px-6 py-3 flex items-center justify-between border-b border-blue-100">
              <h3 className="text-xs font-black text-blue-900 uppercase">Mapa de Ruta</h3>
              <button onClick={() => setIsRouteMapOpen(false)} className="text-slate-500 hover:text-red-500 cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 bg-slate-100 flex items-center justify-center text-center p-4">
              <div>
                <MapPin className="w-10 h-10 text-blue-600 mx-auto mb-2 animate-bounce" />
                <h4 className="text-xs font-black text-slate-700 uppercase">Navegación Activa</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}