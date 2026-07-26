import React, { useState } from 'react';
import { ESCAPADAS_DATA, Escapada } from '../data/DatosEscapadas';

export default function Escapadas() {
  const [selectedCity, setSelectedCity] = useState<string>('Todos');

  // Filtrar escapadas según la ciudad seleccionada
  const filteredEscapadas = selectedCity === 'Todos' 
    ? ESCAPADAS_DATA 
    : ESCAPADAS_DATA.filter((item: Escapada) => item.ciudadParent.toLowerCase().includes(selectedCity.toLowerCase()));

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Escapadas en Colombia</h2>
      
      {/* Botones de filtro de ejemplo */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {['Todos', 'Amazonas', 'Barranquilla', 'Bogota', 'Boyaca'].map((city: string) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCity === city 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Grid de escapadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEscapadas.map((escapada: Escapada) => (
          <div key={escapada.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
            {/* Imagen principal (primer elemento del array de imagenes) */}
            <div className="h-48 w-full overflow-hidden bg-gray-100">
              <img 
                src={escapada.imagenes[0]} 
                alt={escapada.nombre} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {escapada.ciudadParent}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">
                  {escapada.nombre}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {escapada.descripcionCorta}
                </p>
              </div>

              <div>
                <div className="mb-4">
                  <span className="text-xs font-medium text-gray-500 block mb-1">Opciones de transporte:</span>
                  <div className="flex flex-wrap gap-1">
                    {escapada.opcionesTransporte.map((transporte: string, idx: number) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {transporte}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-500 line-clamp-2">
                  {escapada.informacionDetallada}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}