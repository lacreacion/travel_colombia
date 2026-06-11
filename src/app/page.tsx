'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import QuickFilters from '@/components/QuickFilters';
import MapFilter from '@/components/MapFilter';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>('bogota');
  const [radius, setRadius] = useState<string>('1 KM');
  
  // El mapa arranca oculto (false) para que veas tus cajas blancas limpias abajo del carrusel
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* 1. Barra superior */}
      <Navbar />
      
      {/* 2. Carrusel de imágenes de fondo */}
      <HeroCarousel />

      {/* 3. TUS DOS CAJAS BLANCAS RECUPERADAS (Fijas debajo del carrusel) */}
      <QuickFilters 
        radius={radius} 
        setRadius={setRadius} 
        onOpenMap={() => setIsMapOpen(true)} 
      />

      {/* 4. Ventana del mapa flotante (Oculta, solo salta al presionar el botón azul) */}
      <MapFilter 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        radiusKm={parseInt(radius) || 2} 
        isMapLoaded={true} 
      />
    </main>
  );
}