'use client';

import React, { useState, useEffect } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalView = 'login' | 'register' | 'forgot_method' | 'forgot_code' | 'forgot_new_pass';

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  // Estado para controlar la hidratación del cliente y evitar errores de SSR
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState<ModalView>('login');
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '', 
    celular: '',
    correo: '',
    fechaNacimiento: '',
    preguntaSeguridad: '',
    respuestaSeguridad: '',
    password: '',
    confirmPassword: '',
  });

  const [recoveryMethod, setRecoveryMethod] = useState<'correo' | 'celular'>('correo');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // 1. AQUÍ SE COLOCA EL USUARIO FALSO DE PRUEBA
  const FAKE_USER = {
    email: "test@viajacolombia.com",
    password: "Password123!"
  };

  // Efecto controlado por temporizador para mitigar renders en cascada y habilitar el modal
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Si el modal no está abierto o no se ha montado en el cliente, no renderiza nada
  if (!isOpen || !mounted) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetModal = () => {
    setCurrentView('login');
    setVerificationCode('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_+\-=\[\]\\\/]).{8,}$/;

    if (currentView === 'register') {
      if (!passwordRegex.test(formData.password)) {
        alert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un signo especial.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      console.log('Registro exitoso con cédula:', formData);
    } 
    // 2. AQUÍ SE REALIZA LA VALIDACIÓN DEL LOGIN DE PRUEBA
    else if (currentView === 'login') {
      if (formData.correo === FAKE_USER.email && formData.password === FAKE_USER.password) {
        alert('¡Inicio de sesión exitoso!');
        onClose();     // Cierra el modal de forma automática
        resetModal();  // Limpia los campos de texto del formulario
      } else {
        alert('Correo electrónico o contraseña incorrectos.');
      }
    } 
    else if (currentView === 'forgot_method') {
      setCurrentView('forgot_code');
    } 
    else if (currentView === 'forgot_code') {
      setCurrentView('forgot_new_pass');
    } 
    else if (currentView === 'forgot_new_pass') {
      if (!passwordRegex.test(newPassword)) {
        alert('La nueva contraseña debe cumplir con los requisitos (Mayús, minús, núm y signo).');
        return;
      }
      if (newPassword !== confirmNewPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      alert('¡Contraseña actualizada con éxito!');
      resetModal();
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-[#121214] border border-zinc-800 rounded-3xl p-6 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Botón Cerrar */}
        <button 
          type="button"
          onClick={() => { onClose(); resetModal(); }}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Pestañas Superiores */}
        {(currentView === 'login' || currentView === 'register') && (
          <div className="flex justify-center space-x-6 mb-6 mt-2 border-b border-zinc-800 pb-3">
            <button
              type="button"
              onClick={() => setCurrentView('login')}
              className={`font-black text-xs tracking-widest uppercase transition-colors ${
                currentView === 'login' ? 'text-[#FFCC00]' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('register')}
              className={`font-black text-xs tracking-widest uppercase transition-colors ${
                currentView === 'register' ? 'text-[#FFCC00]' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Registrarse
            </button>
          </div>
        )}

        {/* Título Dinámico */}
        <h2 className="text-2xl font-black italic tracking-wide text-center text-[#FFCC00] uppercase mb-6 mt-2">
          {currentView === 'login' && 'Bienvenido'}
          {currentView === 'register' && 'Crear Cuenta'}
          {currentView === 'forgot_method' && 'Recuperar Cuenta'}
          {currentView === 'forgot_code' && 'Verificación'}
          {currentView === 'forgot_new_pass' && 'Nueva Contraseña'}
        </h2>

        {/* Formulario contenedor único */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* ================= VISTA: LOGIN ================= */}
          {currentView === 'login' && (
            <div key="login-view" className="space-y-4">
              <input
                type="email"
                name="correo"
                placeholder="CORREO ELECTRÓNICO"
                required
                value={formData.correo}
                onChange={handleInputChange}
                className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />
              <input
                type="password"
                name="password"
                placeholder="CONTRASEÑA"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setCurrentView('forgot_method')}
                  className="text-xs text-zinc-400 hover:text-[#FFCC00] transition-colors underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-[#FFCC00] text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-[#e6b800] transition-colors mt-2"
              >
                Iniciar Sesión
              </button>
            </div>
          )}

          {/* ================= VISTA: REGISTRO ================= */}
          {currentView === 'register' && (
            <div key="register-view" className="space-y-4">
              {/* Fila 1: Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="nombre"
                  placeholder="NOMBRE"
                  required
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
                />
                <input
                  type="text"
                  name="apellido"
                  placeholder="APELLIDO"
                  required
                  value={formData.apellido}
                  onChange={handleInputChange}
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="cedula"
                  placeholder="NÚMERO DE CÉDULA"
                  required
                  value={formData.cedula}
                  onChange={handleInputChange}
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
                />
                <input
                  type="tel"
                  name="celular"
                  placeholder="NÚMERO DE CELULAR"
                  required
                  value={formData.celular}
                  onChange={handleInputChange}
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
                />
              </div>

              <input
                type="email"
                name="correo"
                placeholder="CORREO ELECTRÓNICO"
                required
                value={formData.correo}
                onChange={handleInputChange}
                className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />

              <div>
                <label className="block text-[10px] text-zinc-400 mb-1 ml-1 tracking-wider uppercase">Fecha de Nacimiento</label>
                <input
                  type="date"
                  required
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-[#FFCC00] transition-colors"
                />
              </div>

              <div>
                <select
                  name="preguntaSeguridad"
                  required
                  value={formData.preguntaSeguridad}
                  onChange={handleInputChange}
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-400 focus:outline-none focus:border-[#FFCC00] transition-colors"
                >
                  <option value="" disabled>SELECCIONA UNA PREGUNTA DE SEGURIDAD</option>
                  <option value="mascota">Nombre de tu mascota</option>
                  <option value="pelicula">Película favorita</option>
                  <option value="palabra">Palabra significativa</option>
                  <option value="comida">Comida favorita</option>
                </select>
              </div>

              <input
                type="text"
                name="respuestaSeguridad"
                placeholder="RESPUESTA DE SEGURIDAD"
                required
                value={formData.respuestaSeguridad}
                onChange={handleInputChange}
                className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />

              <input
                type="password"
                name="password"
                placeholder="CONTRASEÑA (Mayús, minús, núm y signo)"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="REAFIRMAR CONTRASEÑA"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />

              <button
                type="submit"
                className="w-full bg-[#FFCC00] text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-[#e6b800] transition-colors mt-2"
              >
                Registrarse
              </button>
            </div>
          )}

          {/* ================= VISTA: SELECCIÓN DE MÉTODO ================= */}
          {currentView === 'forgot_method' && (
            <div key="method-view" className="space-y-4">
              <p className="text-zinc-400 text-xs text-center px-4">
                Selecciona dónde deseas recibir el código de verificación para restablecer tu cuenta:
              </p>
              
              <div className="flex flex-col space-y-2">
                <label className={`flex items-center justify-between p-4 bg-[#1A1A1E] border rounded-xl cursor-pointer transition-colors ${recoveryMethod === 'correo' ? 'border-[#FFCC00]' : 'border-zinc-800'}`}>
                  <span className="text-sm font-semibold">Correo Electrónico</span>
                  <input 
                    type="radio" 
                    name="recovery" 
                    checked={recoveryMethod === 'correo'} 
                    onChange={() => setRecoveryMethod('correo')}
                    className="accent-[#FFCC00]" 
                  />
                </label>

                <label className={`flex items-center justify-between p-4 bg-[#1A1A1E] border rounded-xl cursor-pointer transition-colors ${recoveryMethod === 'celular' ? 'border-[#FFCC00]' : 'border-zinc-800'}`}>
                  <span className="text-sm font-semibold">Número de Celular</span>
                  <input 
                    type="radio" 
                    name="recovery" 
                    checked={recoveryMethod === 'celular'} 
                    onChange={() => setRecoveryMethod('celular')}
                    className="accent-[#FFCC00]" 
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FFCC00] text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-[#e6b800] transition-colors"
              >
                Enviar Código
              </button>
              
              <button
                type="button"
                onClick={resetModal}
                className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Volver al inicio
              </button>
            </div>
          )}

          {/* ================= VISTA: INGRESAR CÓDIGO ================= */}
          {currentView === 'forgot_code' && (
            <div key="code-view" className="space-y-4">
              <p className="text-zinc-400 text-xs text-center px-4">
                Hemos enviado un código de verificación. Por favor, ingrésalo a continuación:
              </p>
              
              <input
                type="text"
                placeholder="CÓDIGO DE VERIFICACIÓN"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full text-center bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-lg tracking-widest placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />

              <button
                type="submit"
                className="w-full bg-[#FFCC00] text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-[#e6b800] transition-colors"
              >
                Verificar Código
              </button>
            </div>
          )}

          {/* ================= VISTA: NUEVA CONTRASEÑA ================= */}
          {currentView === 'forgot_new_pass' && (
            <div key="new-pass-view" className="space-y-4">
              <p className="text-zinc-400 text-xs text-center px-4">
                Código verificado con éxito. Ingresa tu nueva contraseña:
              </p>

              <input
                type="password"
                placeholder="NUEVA CONTRASEÑA"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />

              <input
                type="password"
                placeholder="REAFIRMAR NUEVA CONTRASEÑA"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] transition-colors"
              />

              <button
                type="submit"
                className="w-full bg-[#FFCC00] text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-[#e6b800] transition-colors"
              >
                Actualizar Contraseña
              </button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}