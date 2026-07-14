'use client';

import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import EscapadasSection from '@/components/EscapadasSection';
import ServiciosSection from '@/components/ServiciosSection'; 
// import ContactoSection from '@/components/ContactoSection';   // Descomenta cuando lo crees

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col overflow-x-hidden">
      {/* Sesión 1: Navegación */}
      <Navbar />

      {/* Sesión 2: Carrusel Principal (Ahora independiente) */}
      <HeroCarousel />

      {/* Sesión 3: Escapadas (Ahora independiente con su propio filtro) */}
      <EscapadasSection />

      {/* Sesión 4: Servicios (Próximamente) */}
      
      {/* Sesión 5: Contacto (Próximamente) */}
    </main>
  );
}