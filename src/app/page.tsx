import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import MapFilter from '@/components/MapFilter';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-zinc-950 flex flex-col">
      {/* Barra de navegación flotante */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Aquí corre la magia: Plano grande, Ciudades, Servicios y Catálogos con Flechas */}
      <HeroCarousel />
      
      {/* Sección blanca inferior (Filtro de mapa interactivo rápido) */}
      <section className="relative z-10 bg-white rounded-t-[50px] px-6 md:px-12 pb-16">
        <div className="max-w-6xl mx-auto">
          <MapFilter />

        </div>
      </section>

      <footer className="bg-zinc-950 py-6 text-center text-gray-500 text-[11px] border-t border-white/5 font-medium">
        © 2026 Viaja por Colombia
      </footer>
    </main>
  );
}