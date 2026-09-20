'use client';
import { useState } from 'react';
import { Compass, Search, ChevronDown, MapPin, X } from 'lucide-react';

const CITIES = ["Amazonas", "Barranquilla", "Bogotá", "Boyacá", "Cali", "Cartagena", "Chocó", "Guajira", "Medellín"];

interface Props {
  radius: string; setRadius: (v: string) => void;
  selectedCity: string; onCityChange: (v: string) => void;
}

export default function FiltersSesion3({ radius, setRadius, selectedCity, onCityChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  return (
    <>
      {/* Se sustituye -mt-10 por mt-12 para que baje y respete el espacio de las tarjetas de la Sesión 2 */}
      <div className="w-full max-w-[1350px] mx-auto mt-09 z-40 relative px-6 flex gap-6 items-center">
        
        {/* Cápsula 1: Búsqueda rápida */}
        <div className="w-1/2 bg-[#ebf2ff] rounded-[3rem] px-7 py-4 shadow-xl flex items-center justify-between border border-white/90">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-full shrink-0 shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[11px] font-black text-blue-900 uppercase tracking-wide">¿Buscas algo rápido?</h3>
              <p className="text-[9px] text-blue-500 font-bold uppercase tracking-tight whitespace-nowrap mt-0.5">Encuentra lugares recomendados cerca</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-white rounded-full p-1 shadow-inner gap-1 shrink-0">
              {['1 KM', '2 KM', '3 KM'].map(km => (
                <button 
                  key={km} 
                  onClick={() => setRadius(km)} 
                  className={`px-3 py-1.5 rounded-full text-[9px] font-black transition-all duration-300 cursor-pointer
                    ${radius === km 
                      ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.7)]' 
                      : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
                >
                  {km}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsMapModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1.5 hover:bg-blue-700 shadow-md shrink-0 transition-transform active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5"/> Abrir Mapa
            </button>
          </div>
        </div>

        {/* Cápsula 2: Destino */}
        <div className="w-1/2 bg-[#ebf2ff] rounded-[3rem] px-8 py-4 shadow-xl flex items-center justify-between border border-white/90 relative">
          <div>
            <h3 className="text-[11px] font-black text-blue-900 uppercase tracking-wide">Un oasis escondido</h3>
            <p className="text-[9px] text-blue-500 font-bold uppercase tracking-tight whitespace-nowrap mt-0.5">Súper cerca de la ciudad.</p>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="bg-white hover:bg-slate-50 border border-blue-100 text-slate-800 px-5 py-2.5 rounded-full font-black text-[10px] flex items-center gap-3 shadow-sm transition-all min-w-[160px] justify-between shrink-0 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-blue-500"/> 
              <span className="uppercase">{selectedCity}</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
          </button>

          {isOpen && (
            <div className="absolute top-full mt-2 right-0 w-52 bg-white rounded-3xl shadow-2xl p-2 z-[9999] border border-blue-50 animate-in fade-in zoom-in duration-200">
              {CITIES.map(c => (
                <button 
                  key={c} 
                  onClick={() => { onCityChange(c); setIsOpen(false); }} 
                  className={`block w-full text-left px-4 py-2 text-[10px] font-black uppercase rounded-2xl transition-all cursor-pointer
                    ${selectedCity === c ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* VENTANA MODAL DEL MAPA */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col h-[80vh]">
            
            <div className="bg-[#ebf2ff] px-8 py-5 flex items-center justify-between border-b border-blue-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-600 text-white rounded-full">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-blue-900 uppercase">Mapa de Servicios Cercanos</h3>
                  <p className="text-xs text-blue-600 font-bold">Mostrando resultados en un radio de: <span className="underline">{radius}</span></p>
                </div>
              </div>
              <button 
                onClick={() => setIsMapModalOpen(false)}
                className="bg-white hover:bg-red-50 text-slate-500 hover:text-red-500 p-2.5 rounded-full transition-colors shadow-sm cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 relative bg-slate-100 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="inline-block p-4 bg-blue-50 rounded-full text-blue-600 mb-3 animate-pulse">
                  <MapPin className="w-10 h-10" />
                </div>
                <h4 className="text-base font-black text-slate-700 uppercase">Cargando Mapa Interactivo...</h4>
                <p className="text-xs text-slate-400 mt-1">Filtrando todos los servicios a una distancia máxima de {radius}.</p>
              </div>
            </div>

            <div className="bg-slate-50 px-8 py-4 flex justify-end border-t border-slate-100">
              <button 
                onClick={() => setIsMapModalOpen(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                Cerrar Mapa
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}