"use client";
import React, { useState } from 'react';
import { Navigation, Map as MapIcon } from 'lucide-react';

export default function MapFilter() {
  const [range, setRange] = useState(1);

  return (
    <div className="bg-blue-50 p-8 rounded-[40px] border border-blue-100 mb-12 shadow-xl -mt-16 relative z-30 backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left">
          <h3 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
            <Navigation className="text-blue-600 rotate-45" size={24} /> ¿Buscas algo rápido?
          </h3>
          <p className="text-blue-700/70 text-sm">Encuentra lugares recomendados cerca de tu ubicación actual.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-white p-2 rounded-2xl shadow-inner">
            {[1, 2, 5].map((km) => (
              <button
                key={km}
                type="button"
                onClick={() => setRange(km)}
                className={`px-6 py-2 rounded-xl font-bold transition-all text-xs cursor-pointer ${
                  range === km ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-blue-600'
                }`}
              >
                {km} KM
              </button>
            ))}
          </div>

          <button type="button" className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all cursor-pointer text-xs uppercase tracking-wider">
            <MapIcon size={20} /> Abrir Mapa Interactivo
          </button>
        </div>
      </div>
    </div>
  );
}