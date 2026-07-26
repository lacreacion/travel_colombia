"use client";
import React, { useState, useEffect } from 'react';
import { User, Search, ChevronDown, Globe } from 'lucide-react';
import Link from 'next/link';
import LoginModal from './LoginModal';
import UserProfile from './UserProfile';
import InfoModal from './InfoModal';

interface NavbarProps {
  currentCity?: string;
}

const aboutInfoData: Record<string, { title: string; content: string }> = {
  "Misión": {
    title: "Nuestra Misión",
    content: "Promover y facilitar el turismo en Colombia conectando a los viajeros con la riqueza cultural, natural y gastronómica de cada región, ofreciendo herramientas digitales innovadoras y accesibles para planificar experiencias inolvidables."
  },
  "Visión": {
    title: "Nuestra Visión",
    content: "Convertirnos en la plataforma digital líder en el turismo nacional de Colombia, reconocidos por impulsar el desarrollo local sostenible y brindar una experiencia de usuario excepcional e inspiradora."
  },
  "Historia": {
    title: "Nuestra Historia",
    content: "Viaja Colombia nació de la pasión por descubrir y compartir la increíble diversidad de nuestro país. Comenzó como un proyecto enfocado en conectar al viajero con rincones mágicos y tradiciones locales."
  },
  "Impacto Local": {
    title: "Impacto Local",
    content: "Trabajamos de la mano con guías locales, pequeños hoteles, artesanos y restaurantes tradicionales, garantizando que el turismo genere un impacto económico positivo y directo en las comunidades."
  }
};

const CIUDADES_LISTA = [
  "Amazonas", "Barranquilla", "Bogotá", "Boyacá", "Cali", "Cartagena", 
  "Chocó", "Guajira", "Medellín", "Pasto", "Pereira", "San Andrés", 
  "Santa Marta", "Valledupar"
];

const SERVICIOS_LISTA = [
  "Hoteles", "Rbnb", "Hostal", "Museos", "Parques", "Teatros", 
  "Restaurantes", "Comidas Recomendadas", "Sitios Geniales", "Sitios Históricos"
];

export default function Navbar({ currentCity = "Bogotá" }: NavbarProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState<{ title: string; content: string } | null>(null);

  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('travel_colombia_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'travel_colombia_user') {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const changeLanguage = (langCode: string) => {
    document.cookie = `googtrans=/auto/${langCode}`;
    window.location.reload();
  };

  const handleUserClick = () => {
    if (user) {
      setIsProfileOpen(true); 
    } else {
      setIsLoginOpen(true);   
    }
  };

  // Funciones de navegación hacia Sesiones específicas
  const seleccionarCiudadNavbar = (ciudad: string) => {
    window.dispatchEvent(new CustomEvent('ir-a-sesion4', { 
      detail: { ciudad: ciudad.toUpperCase(), servicio: null } 
    }));
  };

  const seleccionarServicioNavbar = (servicio: string) => {
    window.dispatchEvent(new CustomEvent('ir-a-sesion4', { 
      detail: { ciudad: currentCity.toUpperCase(), servicio: servicio.toUpperCase() } 
    }));
  };

  const irAContacto = (e: React.MouseEvent) => {
    e.preventDefault();
    const seccionContacto = document.getElementById('sesion-5-contacto');
    if (seccionContacto) {
      seccionContacto.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.dispatchEvent(new CustomEvent('ir-a-sesion5'));
    }
  };

  // Manejador mejorado para el botón INICIO
  const irAInicio = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('reset-hero'));
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-[1440px] bg-black/55 backdrop-blur-lg border border-white/15 shadow-2xl rounded-full px-8 py-3 flex items-center justify-between z-50">
        
        {/* Lado Izquierdo: Marca */}
        <div className="flex-initial">
          <Link href="/" onClick={irAInicio} className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-xl font-black tracking-tighter text-white">
              VIAJA<span className="text-yellow-400">COLOMBIA</span>
            </span>
          </Link>
        </div>

        {/* Centro: Navegación Principal */}
        <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-[11px] font-bold text-white tracking-[0.2em] flex-grow mx-4">
          
          {/* 1. INICIO */}
          <a 
            href="#" 
            onClick={irAInicio}
            className="hover:text-yellow-400 transition-colors cursor-pointer"
          >
            INICIO
          </a>
          
          {/* 2. CIUDADES (Lleva a Sesión 4) */}
          <div className="group relative py-2">
            <button className="hover:text-yellow-400 flex items-center gap-1 cursor-pointer transition-colors outline-none">
              CIUDADES <ChevronDown size={13} className="group-hover:rotate-180 transition-transform opacity-60" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block pt-3">
              <ul className="bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 min-w-[200px] max-h-[380px] overflow-y-auto shadow-2xl space-y-1">
                {CIUDADES_LISTA.map((ciudad) => (
                  <li 
                    key={ciudad} 
                    onClick={() => seleccionarCiudadNavbar(ciudad)}
                    className="text-white/70 hover:text-yellow-400 hover:bg-white/5 p-2 rounded-lg text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-all"
                  >
                    {ciudad}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 3. SERVICIOS (Lleva a Sesión 4 con categoría) */}
          <div className="group relative py-2">
            <button className="hover:text-yellow-400 flex items-center gap-1 cursor-pointer transition-colors outline-none">
              SERVICIOS <ChevronDown size={13} className="group-hover:rotate-180 transition-transform opacity-60" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block pt-3">
              <ul className="bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 min-w-[200px] max-h-[380px] overflow-y-auto shadow-2xl space-y-1">
                {SERVICIOS_LISTA.map((serv) => (
                  <li 
                    key={serv} 
                    onClick={() => seleccionarServicioNavbar(serv)}
                    className="text-white/70 hover:text-yellow-400 hover:bg-white/5 p-2 rounded-lg text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-all"
                  >
                    {serv}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 4. QUIÉNES SOMOS (Abre modales) */}
          <div className="group relative py-2">
            <button className="hover:text-yellow-400 flex items-center gap-1 cursor-pointer transition-colors outline-none">
              QUIENES SOMOS <ChevronDown size={13} className="group-hover:rotate-180 transition-transform opacity-60" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block pt-3">
              <ul className="bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 min-w-[200px] shadow-2xl space-y-1">
                {["Misión", "Visión", "Historia", "Impacto Local"].map((opt) => (
                  <li 
                    key={opt} 
                    onClick={() => setActiveInfoModal(aboutInfoData[opt])}
                    className="text-white/70 hover:text-yellow-400 hover:bg-white/5 p-2 rounded-lg text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-all"
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 5. CONTACTO (Lleva a Sesión 5) */}
          <a href="#contacto" onClick={irAContacto} className="hover:text-yellow-400 transition-colors whitespace-nowrap cursor-pointer">
            CONTACTO
          </a>
        </div>

        {/* Lado Derecho: Redes e Iconos */}
        <div className="flex-initial flex items-center justify-end gap-5">
          <div className="hidden sm:flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-yellow-400 transition-colors p-1" title="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-yellow-400 transition-colors p-1" title="Instagram">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>

          <span className="hidden sm:inline-block h-4 w-[1px] bg-white/20" />

          {/* Selector de Idiomas */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 text-white/80 hover:text-yellow-400 transition-colors cursor-pointer flex items-center gap-1 outline-none"
            >
              <Globe size={18} />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 space-y-1">
                <div className="text-[10px] font-bold text-yellow-400 px-3 py-1 uppercase tracking-wider">Idioma</div>
                <button onClick={() => { changeLanguage('es'); setIsLangOpen(false); }} className="w-full text-left text-white/70 hover:text-yellow-400 hover:bg-white/5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer">🇪🇸 Español</button>
                <button onClick={() => { changeLanguage('en'); setIsLangOpen(false); }} className="w-full text-left text-white/70 hover:text-yellow-400 hover:bg-white/5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer">🇺🇸 English</button>
                <button onClick={() => { changeLanguage('fr'); setIsLangOpen(false); }} className="w-full text-left text-white/70 hover:text-yellow-400 hover:bg-white/5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer">🇫🇷 Français</button>
                <button onClick={() => { changeLanguage('de'); setIsLangOpen(false); }} className="w-full text-left text-white/70 hover:text-yellow-400 hover:bg-white/5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer">🇩🇪 Deutsch</button>
                <button onClick={() => { changeLanguage('pt'); setIsLangOpen(false); }} className="w-full text-left text-white/70 hover:text-yellow-400 hover:bg-white/5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer">🇧🇷 Português</button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isSearchOpen && (
              <input type="text" placeholder="BUSCAR..." autoFocus className="bg-white/10 border border-white/10 rounded-full py-1.5 px-4 text-white text-[10px] outline-none w-[150px] focus:border-yellow-400 transition-all placeholder:text-white/40" />
            )}
            <Search size={18} className="text-white cursor-pointer hover:text-yellow-400 transition-colors" onClick={() => setIsSearchOpen(!isSearchOpen)} />
          </div>

          <span className="h-5 w-[1px] bg-white/20" />

          <button 
            type="button" 
            onClick={handleUserClick}
            className="p-2.5 bg-yellow-400 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-md shadow-yellow-400/10"
          >
            <User size={18} className="text-black" />
          </button>
        </div>
      </nav>

      <InfoModal
        isOpen={!!activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
        title={activeInfoModal?.title || ''}
        content={activeInfoModal?.content || ''}
      />

      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);
          setIsLoginOpen(false);
          setIsProfileOpen(true);
        }}
      />

      <UserProfile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        currentCity={currentCity} 
        user={user}
        onLogout={() => {
          localStorage.removeItem('travel_colombia_user');
          setUser(null);
          setIsProfileOpen(false);
        }}
      />
    </>
  );
}