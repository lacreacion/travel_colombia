import React from 'react';
import { Navigation } from 'lucide-react';

interface Place {
  id: string;
  title: string;
  category: string;
  city: string;
  lat?: number;
  lng?: number;
}

interface RouteMapProps {
  routeStops: Place[];
  currentCity: string;
}

export default function RouteMap({ routeStops, currentCity }: RouteMapProps) {
  if (routeStops.length === 0) {
    return (
      <div className="w-full h-75 bg-neutral-900/5 border border-dashed border-neutral-300 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
        <Navigation className="w-8 h-8 text-neutral-400 mb-2 animate-pulse" />
        <h4 className="text-xs font-bold text-neutral-700">Sin ruta seleccionada</h4>
        <p className="text-[11px] text-neutral-500 mt-1 max-w-xs">
          Ve a tu Perfil, abre la pestaña &quot;Hoy quiero&quot;, selecciona tus lugares guardados en {currentCity} y genera tu ruta para visualizarla aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black tracking-widest text-neutral-800 uppercase flex items-center gap-1.5">
          <Navigation className="w-4 h-4 text-red-600" /> Mapa de Ruta: {currentCity}
        </h3>
        <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
          {routeStops.length} Paradas en el recorrido
        </span>
      </div>

      {/* Contenedor visual del mapa / Simulación interactiva de pines */}
      <div className="relative w-full h-87.5 bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border border-neutral-800 flex flex-col items-center justify-center p-4">
        
        {/* Fondo decorativo tipo mapa estilizado oscuro */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]"></div>
        
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[10px] text-white/80 z-10">
          📍 Recorrido optimizado por cercanía
        </div>

        {/* Línea conectora de la ruta */}
        <div className="absolute w-[80%] h-0.5 bg-red-600/50 top-1/2 -translate-y-1/2 z-0 hidden sm:block"></div>

        {/* Pines de los lugares ordenados */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 w-full max-w-2xl px-2">
          {routeStops.map((stop, index) => (
            <div 
              key={stop.id} 
              className="flex flex-col items-center group transition-all hover:scale-110"
            >
              {/* Número de secuencia del pin */}
              <div className="w-9 h-9 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white mb-1.5 group-hover:bg-red-500">
                {index + 1}
              </div>
              
              {/* Etiqueta flotante con el nombre del sitio */}
              <div className="bg-white/95 backdrop-blur-sm text-neutral-950 px-2.5 py-1 rounded-lg shadow-md text-center max-w-30">
                <p className="text-[10px] font-bold truncate">{stop.title}</p>
                <p className="text-[9px] text-neutral-500 uppercase">{stop.category}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-3 text-center text-[10px] text-neutral-400 z-10">
          Mostrando secuencia de visita recomendada para optimizar tus tiempos en {currentCity}.
        </div>
      </div>
    </div>
  );
}