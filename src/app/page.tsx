'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import FiltersSesion3 from '@/components/FiltersSesion3';
import CarouselSession3 from '@/components/CarouselSession3';
import FiltersSesion4 from '@/components/FiltersSesion4'; 
import TargetSesion4 from '@/components/TargetSesion4';
import Session5 from '@/components/Session5';

import bogotaData from '@/data/servicios.json/Bogota.json';
import medellinData from '@/data/servicios.json/Medellin.json';
import caliData from '@/data/servicios.json/Cali.json';

interface ServiceItem {
  id: number;
  name: string;
  tag: string;
  images: string[];
  link: string;
}

export default function Page() {
  const [radius, setRadius] = useState<string>("3 KM");
  const [selectedCity, setSelectedCity] = useState<string>("Bogotá");

  const [activeService, setActiveService] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [imageIndices, setImageIndices] = useState<Record<number, number>>({});
  const [transportOpenId, setTransportOpenId] = useState<number | null>(null);

  // Estados de subfiltros para la sesión 4
  const [hGuests, setHGuests] = useState<number>(2);
  const [hPriceMin, setHPriceMin] = useState<number>(50000);
  const [hPriceMax, setHPriceMax] = useState<number>(500000);
  const [hSpaPool, setHSpaPool] = useState<boolean>(false);
  const [hTopRated, setHTopRated] = useState<boolean>(false);
  const [hPets, setHPets] = useState<boolean>(false);
  const [hAc, setHAc] = useState<boolean>(false);
  const [hParking, setHParking] = useState<boolean>(false);

  const [cOpen, setCOpen] = useState<boolean>(false);
  const [cFree, setCFree] = useState<boolean>(false);

  const [rSubFilters, setRSubFilters] = useState<Set<string>>(new Set(['todos']));
  const [rCountries, setRCountries] = useState<Set<string>>(new Set(['todos']));
  const [rThemes, setRThemes] = useState<Set<string>>(new Set(['todos']));
  const [fastFoodTypes, setFastFoodTypes] = useState<Set<string>>(new Set(['todos']));

  // ==========================================
  // ESCUCHADOR DE EVENTOS GLOBALES (Tipado seguro)
  // ==========================================
  useEffect(() => {
    const handleIrASesion4 = (event: Event) => {
      const customEvent = event as CustomEvent<{ ciudad?: string; servicio?: string | null }>;
      if (customEvent.detail?.ciudad) {
        setSelectedCity(customEvent.detail.ciudad);
      }
      if (customEvent.detail?.servicio !== undefined) {
        setActiveService(customEvent.detail.servicio || "");
        setHasSearched(true);
      }
      
      const targetElement = document.getElementById('sesion-4-tarjetas') || document.getElementById('sesion-4-filtros');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' });
      }
    };

    const handleIrASesion5 = () => {
      const sesion5Element = document.getElementById('sesion-5-contacto');
      if (sesion5Element) {
        sesion5Element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('ir-a-sesion4', handleIrASesion4 as EventListener);
    window.addEventListener('ir-a-sesion5', handleIrASesion5 as EventListener);

    return () => {
      window.removeEventListener('ir-a-sesion4', handleIrASesion4 as EventListener);
      window.removeEventListener('ir-a-sesion5', handleIrASesion5 as EventListener);
    };
  }, []);

  const getCityServices = (): ServiceItem[] => {
    let rawData: unknown = bogotaData;
    const cityLower = selectedCity.toLowerCase();
    if (cityLower.includes('medellin') || cityLower.includes('medellín')) {
      rawData = medellinData;
    } else if (cityLower.includes('cali')) {
      rawData = caliData;
    }

    const dataObj = rawData as { services?: unknown[] } | unknown[];
    const items = Array.isArray(dataObj) 
      ? dataObj 
      : (dataObj && typeof dataObj === 'object' && 'services' in dataObj && Array.isArray((dataObj as { services: unknown[] }).services) 
          ? (dataObj as { services: unknown[] }).services 
          : []);

    return (items as Array<Record<string, unknown>>).map((item, index) => ({
      id: Number(item.id) || index + 1,
      name: String(item.name || 'Lugar sin nombre'),
      tag: String(item.tag || item.category || 'hotel'),
      images: Array.isArray(item.images) ? (item.images as string[]) : ['/images/default.jpg'],
      link: String(item.link || '#')
    }));
  };

  const allServicesData = getCityServices();
  
  const filteredServices = activeService 
    ? allServicesData.filter((service) => service.tag.toLowerCase().includes(activeService.toLowerCase()))
    : allServicesData;

  const nextImage = (id: number, totalImages: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImageIndices(prev => ({ ...prev, [id]: ((prev[id] || 0) + 1) % totalImages }));
  };

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center overflow-y-auto">
      <Navbar currentCity={selectedCity} />
      <HeroCarousel />

      <div className="w-full bg-[#FFFFFF] flex flex-col items-center gap-6 py-12 px-4">
        <FiltersSesion3 
          radius={radius}
          setRadius={setRadius}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />
        <CarouselSession3 
          selectedCity={selectedCity} 
          onNavigateToSession4={() => {
            setHasSearched(true);
            const targetEl = document.getElementById('sesion-4-tarjetas');
            targetEl?.scrollIntoView({ behavior: 'smooth' });
          }} 
        />
      </div>

      <div id="sesion-4-filtros" className="w-full flex flex-col md:flex-row border-none shadow-none">
        <FiltersSesion4 
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
          cOpen={cOpen}
          setCOpen={setCOpen}
          cFree={cFree}
          setCFree={setCFree}
          rSubFilters={rSubFilters} 
          setRSubFilters={setRSubFilters}
          rCountries={rCountries} 
          setRCountries={setRCountries}
          rThemes={rThemes} 
          setRThemes={setRThemes}
          fastFoodTypes={fastFoodTypes} 
          setFastFoodTypes={setFastFoodTypes}
        />
        <div id="sesion-4-tarjetas" className="w-full">
          <TargetSesion4 
            hasSearched={hasSearched}
            setHasSearched={setHasSearched}
            selectedCity={selectedCity}
            activeService={activeService}
            filteredServices={filteredServices}
            allServicesList={allServicesData}
            imageIndices={imageIndices}
            nextImage={nextImage}
            transportOpenId={transportOpenId}
            setTransportOpenId={setTransportOpenId}
            onResetSearch={() => { setActiveService(""); setHasSearched(false); }}
          />
        </div>
      </div>

      <div id="sesion-5-contacto" className="w-full">
        <Session5 selectedCity={selectedCity} />
      </div>
    </main>
  );
}