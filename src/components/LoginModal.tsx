"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  // Campos de Entrar
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  // Campos de Registrarse (según la imagen)
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [celular, setCelular] = useState('');
  const [correoReg, setCorreoReg] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [preguntaSeguridad, setPreguntaSeguridad] = useState('');
  const [respuestaSeguridad, setRespuestaSeguridad] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [reafirmarPassword, setReafirmarPassword] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailLogin || !passwordLogin) {
      alert('Por favor completa todos los campos.');
      return;
    }
    const userData = { name: emailLogin.split('@')[0], email: emailLogin };
    localStorage.setItem('travel_colombia_user', JSON.stringify(userData));
    window.dispatchEvent(new StorageEvent('storage', { key: 'travel_colombia_user', newValue: JSON.stringify(userData) }));
    onLoginSuccess(userData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !apellido || !cedula || !celular || !correoReg || !passwordReg) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }
    if (passwordReg !== reafirmarPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    const userData = { name: `${nombre} ${apellido}`, email: correoReg };
    localStorage.setItem('travel_colombia_user', JSON.stringify(userData));
    window.dispatchEvent(new StorageEvent('storage', { key: 'travel_colombia_user', newValue: JSON.stringify(userData) }));
    onLoginSuccess(userData);
  };

  return createPortal(
    <div className="fixed inset-0 z-[999999] w-screen h-screen bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      
      <div className="relative w-full max-w-lg max-h-[90vh] bg-zinc-950 border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto scrollbar-none">
        
        {/* Botón de cerrar (X) */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors cursor-pointer z-10"
          type="button"
        >
          <X size={20} />
        </button>

        {/* Pestañas de Entrar / Registrarse */}
        <div className="flex justify-center gap-8 mb-6 border-b border-white/10 pb-4">
          <button 
            type="button"
            onClick={() => setIsRegister(false)}
            className={`text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${!isRegister ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1' : 'text-white/40 hover:text-white'}`}
          >
            Entrar
          </button>
          <button 
            type="button"
            onClick={() => setIsRegister(true)}
            className={`text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${isRegister ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1' : 'text-white/40 hover:text-white'}`}
          >
            Registrarse
          </button>
        </div>

        {/* Encabezado */}
        <div className="text-center mb-6">
          <span className="text-[10px] tracking-widest text-yellow-400 font-bold uppercase block mb-1">Travel Colombia</span>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-wider">
            {isRegister ? 'Crear Cuenta' : 'Bienvenido'}
          </h2>
        </div>

        {/* VISTA DE REGISTRO */}
        {isRegister ? (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text" 
                placeholder="NOMBRE"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-xs uppercase outline-none focus:border-yellow-400 transition-all placeholder:text-white/30"
              />
              <input 
                type="text" 
                placeholder="APELLIDO"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-xs uppercase outline-none focus:border-yellow-400 transition-all placeholder:text-white/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text" 
                placeholder="NÚMERO DE CÉDULA"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-xs uppercase outline-none focus:border-yellow-400 transition-all placeholder:text-white/30"
              />
              <input 
                type="tel" 
                placeholder="NÚMERO DE CELULAR"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-xs uppercase outline-none focus:border-yellow-400 transition-all placeholder:text-white/30"
              />
            </div>

            <input 
              type="email" 
              placeholder="CORREO ELECTRÓNICO"
              value={correoReg}
              onChange={(e) => setCorreoReg(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-xs uppercase outline-none focus:border-yellow-400 transition-all placeholder:text-white/30"
            />

            <div>
              <label className="block text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Fecha de nacimiento</label>
              <input 
                type="date" 
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-xs uppercase outline-none focus:border-yellow-400 transition-all"
              />
            </div>

            <select 
              value={preguntaSeguridad}
              onChange={(e) => setPreguntaSeguridad(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 px-4 text-white text-xs uppercase outline-none focus:border-yellow-400 transition-all cursor-pointer"
            >
              <option value="" disabled>Selecciona una pregunta de seguridad</option>
              <option value="1">¿Cuál es el nombre de tu primera mascota?</option>
              <option value="2">¿En qué ciudad naciste?</option>
              <option value="3">¿Cuál es tu comida favorita?</option>
            </select>

            <input 
              type="text" 
              placeholder="RESPUESTA DE SEGURIDAD"
              value={respuestaSeguridad}
              onChange={(e) => setRespuestaSeguridad(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-xs uppercase outline-none focus:border-yellow-400 transition-all placeholder:text-white/30"
            />

            <input 
              type="password" 
              placeholder="CONTRASEÑA (Mayús, minús, núm y signo)"
              value={passwordReg}
              onChange={(e) => setPasswordReg(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-xs outline-none focus:border-yellow-400 transition-all placeholder:text-white/30"
            />

            <input 
              type="password" 
              placeholder="REAFIRMAR CONTRASEÑA"
              value={reafirmarPassword}
              onChange={(e) => setReafirmarPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-xs uppercase outline-none focus:border-yellow-400 transition-all placeholder:text-white/30"
            />

            <button 
              type="submit" 
              className="w-full mt-3 bg-yellow-400 hover:bg-white text-black font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-yellow-400/10 active:scale-95"
            >
              Registrarse
            </button>
          </form>
        ) : (
          /* VISTA DE INICIAR SESIÓN */
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">Correo Electrónico</label>
              <input 
                type="email" 
                placeholder="tu.correo@ejemplo.com"
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-xs outline-none focus:border-yellow-400 transition-all placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">Contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-xs outline-none focus:border-yellow-400 transition-all placeholder:text-white/30"
              />
            </div>

            <button 
              type="submit" 
              className="w-full mt-2 bg-yellow-400 hover:bg-white text-black font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-yellow-400/10 active:scale-95"
            >
              Iniciar Sesión
            </button>
          </form>
        )}

      </div>
    </div>,
    document.body
  );
}