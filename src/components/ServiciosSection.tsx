'use client';
import React, { useState } from 'react';
import FilterSesion4 from './FiltersSesion4';
import TargetSesion4 from './TargetSesion4';

interface ServiceItem {
  id: number;
  name: string;
  tag: string;
  images: string[];
  link: string;
}

export default function ServicioSection() {
  // Estados de control principales compartidos con el filtro y la grilla
  const [selectedCity, setSelectedCity] = useState<string>("Bogotá");
  const [activeService, setActiveService] = useState<string>("hotel");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [filteredServices, setFilteredServices] = useState<ServiceItem[]>([]);
  const [imageIndices, setImageIndices] = useState<Record<number, number>>({});
  const [transportOpenId, setTransportOpenId] = useState<number | null>(null);

  // Estados de los Filtros Avanzados (Tipos intactos requeridos por FilterSesion4)
  const [hGuests, setHGuests] = useState<number>(2);
  const [hPriceMin, setHPriceMin] = useState<number>(0);
  const [hPriceMax, setHPriceMax] = useState<number>(1000);
  const [hSpaPool, setHSpaPool] = useState<boolean>(false);
  const [hTopRated, setHTopRated] = useState<boolean>(false);
  const [hPets, setHPets] = useState<boolean>(false);
  const [hAc, setHAc] = useState<boolean>(false);
  const [hParking, setHParking] = useState<boolean>(false);

  const [rSubFilters, setRSubFilters] = useState<Set<string>>(new Set(['todos']));
  const [fastFoodTypes, setFastFoodTypes] = useState<Set<string>>(new Set(['todos']));
  const [rCountries, setRCountries] = useState<Set<string>>(new Set(['todos']));
  const [rThemes, setRThemes] = useState<Set<string>>(new Set(['todos']));

  const [cOpen, setCOpen] = useState<boolean>(false);
  const [cFree, setCFree] = useState<boolean>(false);
  const [geniusCategory, setGeniusCategory] = useState<string>('recomendaciones');

  // Catálogo de ejemplo base
  const allServicesList: ServiceItem[] = [
    { id: 1, name: "Hotel Grand Hyatt", tag: "hotel", images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945', 'https://images.unsplash.com/photo-1582719478250-c89cae48b1b2'], link: "#" },
    { id: 2, name: "Loft en Zona Rosa", tag: "airbnb", images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'], link: "#" },
    { id: 3, name: "Botanico Hostal", tag: "hostal", images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5'], link: "#" },
    { id: 4, name: "Restaurante Leo", tag: "restaurante", images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'], link: "#" },
  ];

  // Función para rotar imágenes de las tarjetas de la sesión 4
  const nextImage = (id: number, totalImages: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImageIndices(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % totalImages
    }));
  };

  const handleResetSearch = () => {
    setHasSearched(false);
    setActiveService("hotel");
    setFilteredServices([]);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      
      {/* Contenedor Principal en Disposición de Dos Columnas (Sidebar Filtro + Grilla de Contenido) */}
      <div className="w-full flex flex-col md:flex-row items-start">
        
        {/* PANEL LATERAL DE FILTROS (FilterSesion4 integrado) */}
        <FilterSesion4 
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          activeService={activeService}
          setActiveService={setActiveService}
          setHasSearched={setHasSearched}
          hGuests={hGuests}
          setHGuests={setHGuests}
          hPriceMin={hPriceMin}
          setHPriceMin={setHPriceMin}
          hPriceMax={hPriceMax}
          setHPriceMax={setHPriceMax}
          hSpaPool={hSpaPool}
          setHSpaPool={setHSpaPool}
          hTopRated={hTopRated}
          setHTopRated={setHTopRated}
          hPets={hPets}
          setHPets={setHPets}
          hAc={hAc}
          setHAc={setHAc}
          hParking={hParking}
          setHParking={setHParking}
          rSubFilters={rSubFilters}
          setRSubFilters={setRSubFilters}
          fastFoodTypes={fastFoodTypes}
          setFastFoodTypes={setFastFoodTypes}
          rCountries={rCountries}
          setRCountries={setRCountries}
          rThemes={rThemes}
          setRThemes={setRThemes}
          cOpen={cOpen}
          setCOpen={setCOpen}
          cFree={cFree}
          setCFree={setCFree}
          geniusCategory={geniusCategory}
          setGeniusCategory={setGeniusCategory}
        />

        {/* SECCIÓN DERECHA: GRILLA CON ANIMACIÓN LATERAL Y POR FILAS (TargetSesion4) */}
        <div className="flex-1 w-full overflow-hidden">
          <TargetSesion4
            hasSearched={hasSearched}
            setHasSearched={setHasSearched}
            selectedCity={selectedCity}
            activeService={activeService}
            filteredServices={filteredServices}
            allServicesList={allServicesList}
            imageIndices={imageIndices}
            nextImage={nextImage}
            transportOpenId={transportOpenId}
            setTransportOpenId={setTransportOpenId}
            onResetSearch={handleResetSearch}
          />
        </div>

      </div>

    </div>
  );
}