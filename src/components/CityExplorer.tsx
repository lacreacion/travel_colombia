"use client";
import React, { useState } from 'react';
import { Utensils, Library, Landmark, Hotel, MapPin } from 'lucide-react';

const CATEGORIES = [
  { id: 'restaurantes', name: 'Restaurantes', icon: <Utensils size={16} /> },
  { id: 'bibliotecas', name: 'Bibliotecas', icon: <Library size={16} /> },
  { id: 'museos', name: 'Museos', icon: <Landmark size={16} /> },
  { id: 'hoteles', name: 'Hoteles', icon: <Hotel size={16} /> },
];

export default function CityExplorer() {
  const [activeTab, setActiveTab] = useState('museos');

  return (
    <div className="w-full py-2 text-gray-800">
      {/* Pestañas de Categorías */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-10">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat.id} 
            type="button"
            onClick={() => setActiveTab(cat.id)} 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === cat.id ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Grid Inmobiliario/Turístico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((id) => (
          <div key={id} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all text-left group">
            <div className="h-44 bg-zinc-100 flex items-center justify-center text-xs font-bold text-gray-400 uppercase tracking-widest">
              [ Galería de Fotos ]
            </div>
            <div className="p-6 space-y-4">
              <h4 className="font-black text-gray-900 uppercase text-base tracking-tight">{activeTab} de Interés {id}</h4>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <MapPin size={14} className="text-gray-300"/> Bogotá, Colombia
              </div>
              <button type="button" className="w-full py-3 bg-zinc-950 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-600 transition-colors cursor-pointer">
                Ver Ficha Técnica
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}