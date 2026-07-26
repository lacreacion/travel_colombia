'use client';
import { useState } from 'react';

interface Session5Props {
  selectedCity?: string;
}

export default function Session5({ selectedCity = "Bogotá" }: Session5Props) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && message) setSent(true);
  };

  return (
    <section className="w-full relative overflow-hidden bg-gray-950 text-white py-14 px-6 md:px-16 lg:px-24">
      
      {/* 🇨🇴 Línea superior con los colores de la bandera de Colombia */}
      <div className="absolute top-0 left-0 w-full h-1 flex">
        <div className="w-1/2 bg-yellow-400"></div>
        <div className="w-1/4 bg-blue-600"></div>
        <div className="w-1/4 bg-red-600"></div>
      </div>

      {/* Contenedor principal de lado a lado optimizado en altura */}
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
        
        {/* Lado Izquierdo: Información */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium w-max backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping"></span>
            <span className="text-gray-300"> <strong className="text-white">{selectedCity}</strong></span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              ¿Listo para <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500">explorar Colombia</span>?
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
              Contáctanos al instante o déjanos una nota o recomendacion para mejorar y hacer tu viaje inolvidable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/573001234567" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg group-hover:scale-110 transition">
                💬
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">WhatsApp</p>
                <p className="font-bold text-xs text-white group-hover:text-emerald-300 transition">+57 300 123 4567</p>
              </div>
            </a>

            {/* Correo */}
            <a 
              href="mailto:soporte@travelcolombia.com" 
              className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-yellow-400 via-blue-500 to-red-500"></div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg group-hover:scale-110 transition">
                ✉️
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Correo</p>
                <p className="font-bold text-xs text-white truncate group-hover:text-blue-300 transition">soporte@travelcolombia.com</p>
              </div>
            </a>
          </div>
        </div>

        {/* Lado Derecho: Formulario más compacto */}
        <div className="lg:col-span-6">
          <div className="w-full bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-xl relative shadow-2xl">
            
            {/* Detalle tricolor superior */}
            <div className="absolute top-0 right-10 -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-full"></div>

            {sent ? (
              <div className="text-center py-8 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-blue-500 to-red-500 text-white rounded-xl flex items-center justify-center mx-auto mb-3 text-lg font-bold shadow-lg shadow-blue-500/20">
                  ✓
                </div>
                <h4 className="font-extrabold text-base text-white">¡Mensaje Enviado!</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Un asesor experto se comunicará contigo en menos de 2 horas.
                </p>
                <button 
                  onClick={() => setSent(false)} 
                  className="mt-4 px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition border border-white/10"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-extrabold text-white">Escríbenos una nota</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Te responderemos de inmediato.</p>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-gray-300">Correo electrónico</label>
                  <input 
                    type="email" 
                    placeholder="tucorreo@ejemplo.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-gray-300">Tu Mensaje</label>
                  <textarea 
                    rows={2}
                    placeholder="¿Qué tipo de experiencia buscas?" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full p-3 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition resize-none"
                  ></textarea>
                </div>

                {/* Botón de envío tricolor */}
                <button 
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 text-white font-extrabold rounded-xl text-xs hover:opacity-95 transition-all shadow-lg shadow-blue-900/30 active:scale-[0.99] tracking-wide uppercase mt-1"
                >
                  Enviar Mensaje 
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}