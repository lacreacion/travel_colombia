"use client";
import React, { useState } from 'react';
import { User, Search, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import LoginModal from './LoginModal';

const MenuDesplegable = ({ title, options }: { title: string, options: string[] }) => (
  <div className="group relative py-2">
    <button className="hover:text-yellow-400 flex items-center gap-1 cursor-pointer transition-colors outline-none">
      {title} <ChevronDown size={13} className="group-hover:rotate-180 transition-transform opacity-60" />
    </button>
    <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block pt-3">
      <ul className="bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 min-w-[200px] max-h-[380px] overflow-y-auto shadow-2xl space-y-1 scrollbar-thin scrollbar-thumb-white/10">
        {options.map((opt) => (
          <li key={opt} className="text-white/70 hover:text-yellow-400 hover:bg-white/5 p-2 rounded-lg text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-all">
            {opt}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-[1440px] bg-black/50 backdrop-blur-lg border border-white/15 shadow-2xl rounded-full px-8 py-3 flex items-center justify-between z-50">
        
        {/* Lado Izquierdo: Marca Intacta */}
        <div className="flex-initial">
          <Link href="/" className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-xl font-black tracking-tighter text-white">
              VIAJA<span className="text-yellow-400">COLOMBIA</span>
            </span>
          </Link>
        </div>

        {/* Centro: Navegación Principal con el disparador en INICIO */}
        <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-[11px] font-bold text-white tracking-[0.2em] flex-grow mx-4">
          
          <Link 
            href="/" 
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('reset-carrusel-global'));
              }
            }}
            className="hover:text-yellow-400 transition-colors"
          >
            INICIO
          </Link>
          
          <MenuDesplegable title="CIUDADES" options={[
            "Amazonas", "Barranquilla", "Bogotá", "Boyacá", "Cali", "Cartagena", 
            "Chocó", "Guajira", "Medellín", "Pasto", "Pereira", "San Andrés", 
            "Santa Marta", "Valledupar"
          ]} />
          
          <MenuDesplegable title="SERVICIOS" options={[
            "Hoteles", "Rbnb", "Hostal", "Museos", "Parques", "Teatros", 
            "Restaurantes", "Comidas Recomendadas", "Sitios Geniales", "Sitios Históricos"
          ]} />
          
          <MenuDesplegable title="QUIENES SOMOS" options={[" Misión", "Visión", "Historia", "Impacto Local"]} />
          
          <Link href="#" className="hover:text-yellow-400 transition-colors whitespace-nowrap">CONTACTO</Link>
        </div>

        <div className="flex-initial flex items-center justify-end gap-5">
          
          <div className="flex items-center gap-2">
            {isSearchOpen && (
              <input 
                type="text" 
                placeholder="BUSCAR..." 
                autoFocus 
                className="bg-white/10 border border-white/10 rounded-full py-1.5 px-4 text-white text-[10px] outline-none w-[150px] focus:border-yellow-400 transition-all placeholder:text-white/40" 
              />
            )}
            <Search size={18} className="text-white cursor-pointer hover:text-yellow-400 transition-colors" onClick={() => setIsSearchOpen(!isSearchOpen)} />
          </div>

          <span className="h-5 w-[1px] bg-white/20" />

          <div className="flex items-center gap-4 text-white/80">
            {/* Facebook SVG */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors cursor-pointer flex items-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            {/* Instagram SVG */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors cursor-pointer flex items-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.71.054 1.139.052 1.9.232 2.508.469a4.865 4.865 0 011.666 1.084c.48.48.822.955 1.084 1.665.238.608.418 1.368.469 2.508.043.926.054 1.281.054 3.71 0 2.43-.01 2.784-.054 3.71-.052 1.139-.232 1.9-.469 2.508a4.865 4.865 0 01-1.084 1.666 4.865 4.865 0 01-1.665 1.084c-.608.238-1.368.418-2.508.469-.926.043-1.281.054-3.71.054-2.43 0-2.784-.01-3.71-.054-1.139-.052-1.9-.232-2.508-.469a4.865 4.865 0 01-1.666-1.084 4.865 4.865 0 01-1.084-1.665c-.238-.608-.418-1.368-.469-2.508-.043-.926-.054-1.281-.054-3.71 0-2.43.01-2.784.054-3.71.052-1.139.232-1.9.469-2.508a4.865 4.865 0 011.084-1.666 4.865 4.865 0 011.665-1.084c.608-.238 1.368-.418 2.508-.469.926-.043 1.281-.054 3.71-.054zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          {/* Botón de Autenticación */}
          <button type="button" onClick={() => setIsLoginOpen(true)} className="p-2.5 bg-yellow-400 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-md shadow-yellow-400/10">
            <User size={18} className="text-black" />
          </button>
        </div>
      </nav>
{isLoginOpen && typeof window !== 'undefined' && (
  <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
)}
    </>
  );
}