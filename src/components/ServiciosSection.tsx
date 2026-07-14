'use client';

import React, { useState } from 'react';
import { CONFIGURACION_FILTROS } from '../Data/configuracionServicios';

export default function ServiciosSection() {
  const [categoriaActiva, setCategoriaActiva] = useState('HOTELES');
  const [ciudad, setCiudad] = useState('BOGOTÁ');

  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto flex gap-8">
        
        {/* Lado Izquierdo: FILTRO (20%) */}
        <aside className="w-1/5 space-y-8">
          {/* Selector de Ciudad */}
          <div>
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Ciudad</label>
            <select value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="w-full mt-2 p-2 border rounded-lg text-sm font-bold">
              <option>BOGOTÁ</option>
              <option>MEDELLÍN</option>
            </select>
          </div>

          {/* Filtros Dinámicos según Categoría */}
          <div>
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Filtros de {categoriaActiva}</h4>
            <div className="space-y-3">
              {CONFIGURACION_FILTROS[categoriaActiva]?.map((filtro) => (
                <label key={filtro} className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                  <input type="checkbox" className="rounded text-[#1764ff]" />
                  {filtro}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Lado Derecho: CAJAS DE SERVICIOS (80%) */}
        <div className="w-4/5">
          <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
             {Object.keys(CONFIGURACION_FILTROS).map(cat => (
               <button 
                 key={cat} 
                 onClick={() => setCategoriaActiva(cat)}
                 className={`px-6 py-2 rounded-full font-black text-xs uppercase transition-all ${categoriaActiva === cat ? 'bg-[#1764ff] text-white' : 'bg-zinc-100'}`}
               >
                 {cat.replace('_', ' ')}
               </button>
             ))}
          </div>

          {/* Grid de Servicios */}
          <div className="grid grid-cols-2 gap-6">
            {/* Aquí iría el componente CardServicio, el cual mapeará los datos */}
            <div className="h-96 border rounded-3xl p-6 flex flex-col justify-end bg-zinc-50">
               <h3 className="font-black text-xl">Nombre del Lugar</h3>
               {/* Aquí pondrás la lista de botones: Guardar, Ir, Mapa, Experiencias, Transporte */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}