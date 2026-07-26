'use client';

import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: { name: string; email: string }) => void;
}

type ModalView = 'login' | 'register' | 'forgot_method' | 'forgot_code' | 'forgot_new_pass';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
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

  // Estados para manejo visual de errores y carga
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmailOrPhone, setResetEmailOrPhone] = useState('');
  const [recoveredUserId, setRecoveredUserId] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(''); // Limpiar error al escribir
  };

  const resetModal = () => {
    setCurrentView('login');
    setVerificationCode('');
    setNewPassword('');
    setConfirmNewPassword('');
    setErrorMessage('');
    setIsLoading(false);
    setResetEmailOrPhone('');
    setRecoveredUserId('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_+\-=\[\]\\\/]).{8,}$/;

    // ================= REGISTRO =================
    if (currentView === 'register') {
      if (!passwordRegex.test(formData.password)) {
        setErrorMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un signo especial.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Las contraseñas no coinciden.');
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: formData.nombre,
            apellido: formData.apellido,
            cedula: formData.cedula,
            celular: formData.celular,
            email: formData.correo,
            fechaNacimiento: formData.fechaNacimiento,
            preguntaSeguridad: formData.preguntaSeguridad,
            respuestaSeguridad: formData.respuestaSeguridad,
            password: formData.password,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setErrorMessage(data.error || 'Error al registrar el usuario.');
          setIsLoading(false);
          return;
        }

        const newUser = { name: formData.nombre || 'Viajero', email: formData.correo };
        localStorage.setItem('travel_colombia_user', JSON.stringify(newUser));
        onLoginSuccess(newUser);
        onClose();
        resetModal();
      } catch (error) {
        setErrorMessage('Hubo un error de conexión con el servidor.');
      } finally {
        setIsLoading(false);
      }
    } 
    // ================= LOGIN =================
    else if (currentView === 'login') {
      setIsLoading(true);
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo: formData.correo, password: formData.password }),
        });

        const data = await response.json();
        if (!response.ok) {
          setErrorMessage(data.error || 'Credenciales incorrectas.');
          setIsLoading(false);
          return;
        }

        const loggedUser = { name: data.user.name || 'Viajero', email: data.user.email };
        localStorage.setItem('travel_colombia_user', JSON.stringify(loggedUser));
        onLoginSuccess(loggedUser);
        onClose();    
        resetModal();  
      } catch (error) {
        setErrorMessage('Hubo un error de conexión con el servidor.');
      } finally {
        setIsLoading(false);
      }
    } 
    // ================= PASO 1 RECUPERACIÓN: ENVIAR / BUSCAR =================
    else if (currentView === 'forgot_method') {
      if (!resetEmailOrPhone) {
        setErrorMessage('Por favor ingresa tu correo o celular.');
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('/api/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ step: 'check_user', identifier: resetEmailOrPhone }),
        });

        const data = await response.json();
        if (!response.ok) {
          setErrorMessage(data.error || 'No se encontró una cuenta con ese dato.');
          setIsLoading(false);
          return;
        }

        setRecoveredUserId(data.userId);
        setCurrentView('forgot_code');
      } catch (error) {
        setErrorMessage('Error al conectar con el servidor.');
      } finally {
        setIsLoading(false);
      }
    } 
    // ================= PASO 2 RECUPERACIÓN: VERIFICAR CÓDIGO (SIMULADO O FIJO) =================
    else if (currentView === 'forgot_code') {
      if (!verificationCode) {
        setErrorMessage('Ingresa el código de verificación.');
        return;
      }
      // Simulación de código válido (por ejemplo "1234") o validación general
      if (verificationCode !== '1234') {
        setErrorMessage('Código incorrecto (Usa 1234 para probar).');
        return;
      }
      setErrorMessage('');
      setCurrentView('forgot_new_pass');
    } 
    // ================= PASO 3 RECUPERACIÓN: NUEVA CONTRASEÑA =================
    else if (currentView === 'forgot_new_pass') {
      if (!passwordRegex.test(newPassword)) {
        setErrorMessage('La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un signo.');
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setErrorMessage('Las contraseñas no coinciden.');
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('/api/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ step: 'update_password', userId: recoveredUserId, newPassword }),
        });

        const data = await response.json();
        if (!response.ok) {
          setErrorMessage(data.error || 'Error al actualizar contraseña.');
          setIsLoading(false);
          return;
        }

        alert('¡Contraseña actualizada con éxito! Ya puedes iniciar sesión.');
        resetModal();
      } catch (error) {
        setErrorMessage('Error de conexión con el servidor.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'login': return 'Bienvenido';
      case 'register': return 'Crear Cuenta';
      case 'forgot_method': return 'Recuperar Cuenta';
      case 'forgot_code': return 'Verificación';
      case 'forgot_new_pass': return 'Nueva Contraseña';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-[#121214] border border-zinc-800 rounded-3xl p-6 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Botón Cerrar */}
        <button 
          type="button"
          onClick={() => { onClose(); resetModal(); }}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Pestañas Superiores */}
        <div className={`flex justify-center space-x-6 mb-6 mt-2 border-b border-zinc-800 pb-3 ${(currentView === 'login' || currentView === 'register') ? 'block' : 'hidden'}`}>
          <button
            type="button"
            onClick={() => { setCurrentView('login'); setErrorMessage(''); }}
            className={`font-black text-xs tracking-widest uppercase transition-colors cursor-pointer ${
              currentView === 'login' ? 'text-[#FFCC00]' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => { setCurrentView('register'); setErrorMessage(''); }}
            className={`font-black text-xs tracking-widest uppercase transition-colors cursor-pointer ${
              currentView === 'register' ? 'text-[#FFCC00]' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Título Dinámico */}
        <h2 className="text-2xl font-black italic tracking-wide text-center text-[#FFCC00] uppercase mb-4 mt-2">
          <span>{getTitle()}</span>
        </h2>

        {/* Mensaje de Error Visual en Rojo */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-xs text-center font-medium">
            {errorMessage}
          </div>
        )}

        {/* ================= FORMULARIO: LOGIN ================= */}
        {currentView === 'login' && (
          <form onSubmit={handleSubmit} className="space-y-4">
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
                onClick={() => { setCurrentView('forgot_method'); setErrorMessage(''); }}
                className="text-xs text-zinc-400 hover:text-[#FFCC00] transition-colors underline cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FFCC00] text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-[#e6b800] transition-colors mt-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        )}

        {/* ================= FORMULARIO: REGISTRO ================= */}
        {currentView === 'register' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input type="text" name="nombre" placeholder="NOMBRE" required value={formData.nombre} onChange={handleInputChange} className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00]" />
              <input type="text" name="apellido" placeholder="APELLIDO" required value={formData.apellido} onChange={handleInputChange} className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" name="cedula" placeholder="NÚMERO DE CÉDULA" required value={formData.cedula} onChange={handleInputChange} className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00]" />
              <input type="tel" name="celular" placeholder="NÚMERO DE CELULAR" required value={formData.celular} onChange={handleInputChange} className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00]" />
            </div>
            <input type="email" name="correo" placeholder="CORREO ELECTRÓNICO" required value={formData.correo} onChange={handleInputChange} className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00]" />
            <div>
              <label className="block text-[10px] text-zinc-400 mb-1 ml-1 tracking-wider uppercase">Fecha de Nacimiento</label>
              <input type="date" required name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleInputChange} className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-[#FFCC00]" />
            </div>
            <select name="preguntaSeguridad" required value={formData.preguntaSeguridad} onChange={handleInputChange} className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-400 focus:outline-none focus:border-[#FFCC00] cursor-pointer">
              <option value="" disabled>SELECCIONA UNA PREGUNTA DE SEGURIDAD</option>
              <option value="mascota">Nombre de tu mascota</option>
              <option value="pelicula">Película favorita</option>
              <option value="palabra">Palabra significativa</option>
              <option value="comida">Comida favorita</option>
            </select>
            <input type="text" name="respuestaSeguridad" placeholder="RESPUESTA DE SEGURIDAD" required value={formData.respuestaSeguridad} onChange={handleInputChange} className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00]" />
            <input type="password" name="password" placeholder="CONTRASEÑA (Mayús, minús, núm y signo)" required value={formData.password} onChange={handleInputChange} className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00]" />
            <input type="password" name="confirmPassword" placeholder="REAFIRMAR CONTRASEÑA" required value={formData.confirmPassword} onChange={handleInputChange} className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00]" />
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FFCC00] text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-[#e6b800] transition-colors mt-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
        )}

        {/* ================= FORMULARIO: MÉTODO RECUPERACIÓN ================= */}
        {currentView === 'forgot_method' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-zinc-400 text-xs text-center px-2">
              Ingresa tu correo electrónico o número de celular registrado:
            </p>
            
            <input
              type="text"
              placeholder="CORREO O CELULAR"
              required
              value={resetEmailOrPhone}
              onChange={(e) => { setResetEmailOrPhone(e.target.value); setErrorMessage(''); }}
              className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00]"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FFCC00] text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-[#e6b800] transition-colors cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Buscando...' : 'Continuar'}
            </button>
            
            <button
              type="button"
              onClick={resetModal}
              className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Volver al inicio
            </button>
          </form>
        )}

        {/* ================= FORMULARIO: CÓDIGO ================= */}
        {currentView === 'forgot_code' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-zinc-400 text-xs text-center px-2">
              Usa el código de prueba <span className="text-[#FFCC00] font-bold">1234</span> para continuar:
            </p>
            
            <input
              type="text"
              placeholder="CÓDIGO (1234)"
              required
              value={verificationCode}
              onChange={(e) => { setVerificationCode(e.target.value); setErrorMessage(''); }}
              className="w-full text-center bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-lg tracking-widest placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00]"
            />

            <button
              type="submit"
              className="w-full bg-[#FFCC00] text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-[#e6b800] transition-colors cursor-pointer"
            >
              Verificar Código
            </button>
          </form>
        )}

        {/* ================= FORMULARIO: NUEVA CONTRASEÑA ================= */}
        {currentView === 'forgot_new_pass' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-zinc-400 text-xs text-center px-2">
              Ingresa tu nueva contraseña segura:
            </p>

            <input
              type="password"
              placeholder="NUEVA CONTRASEÑA"
              required
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value); setErrorMessage(''); }}
              className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00]"
            />

            <input
              type="password"
              placeholder="CONFIRMAR NUEVA CONTRASEÑA"
              required
              value={confirmNewPassword}
              onChange={(e) => { setConfirmNewPassword(e.target.value); setErrorMessage(''); }}
              className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00]"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FFCC00] text-black font-black uppercase text-xs tracking-widest py-4 rounded-xl hover:bg-[#e6b800] transition-colors cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}