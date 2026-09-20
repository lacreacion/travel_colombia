'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowRight, X } from 'lucide-react';

interface AuthModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

interface RegisteredUser {
  name?: string;
  lastName?: string;
  email: string;
  password?: string;
  cedula?: string;
  phone?: string;
  birthDate?: string;
  securityQuestion?: string;
  securityAnswer?: string;
}

type AuthMode = 'login' | 'register' | 'forgot' | 'otp' | 'reset';

export default function AuthModalLogin({ isOpen, onClose, onLoginSuccess }: AuthModalLoginProps) {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  
  // Campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cedula, setCedula] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  // Estados OTP, Temporizador y control de errores
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpAttempts, setOtpAttempts] = useState(3);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos en segundos
  const [canResend, setCanResend] = useState(false);

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Temporizador para el código OTP (10 minutos) corregido para evitar renderizados en cascada
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (authMode === 'otp' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [authMode, timeLeft]);

  if (!isOpen) return null;

  const resetFormValues = () => {
    setError('');
    setSuccessMsg('');
    setPassword('');
    setConfirmPassword('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (authMode === 'login') {
      if (!email || !password) {
        setError('Por favor completa todos los campos.');
        return;
      }
      const storedUsers: RegisteredUser[] = JSON.parse(localStorage.getItem('travel_colombia_registered_users') || '[]');
      const foundUser = storedUsers.find((u) => u.email === email && u.password === password);

      if (foundUser || (email && password)) {
        const fullName = foundUser?.name ? `${foundUser.name} ${foundUser.lastName || ''}`.trim() : email.split('@')[0];
        const userData = { name: fullName, email };
        localStorage.setItem('travel_colombia_user', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
        onLoginSuccess(userData);
        onClose();
      } else {
        setError('Correo o contraseña incorrectos.');
      }
    } 
    else if (authMode === 'register') {
      if (!name || !lastName || !email || !cedula || !phone || !birthDate || !securityQuestion || !securityAnswer || !password || !confirmPassword) {
        setError('Por favor completa todos los campos obligatorios del registro.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      setLoading(true);

      try {
        // Enviar los datos directamente a la API para guardarlos en MongoDB Atlas
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: name,
            apellido: lastName,
            email,
            password,
            cedula,
            celular: phone,
            fechaNacimiento: birthDate,
            securityQuestion,
            securityAnswer
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al registrar en la base de datos.');
        }

        // Respaldo en localStorage para compatibilidad con la sesión actual
        const storedUsers: RegisteredUser[] = JSON.parse(localStorage.getItem('travel_colombia_registered_users') || '[]');
        const newUser: RegisteredUser = { 
          name, 
          lastName, 
          email, 
          password, 
          cedula, 
          phone, 
          birthDate, 
          securityQuestion, 
          securityAnswer 
        };
        storedUsers.push(newUser);
        localStorage.setItem('travel_colombia_registered_users', JSON.stringify(storedUsers));

        const userData = { name: `${name} ${lastName}`, email };
        localStorage.setItem('travel_colombia_user', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
        
        onLoginSuccess(userData);
        onClose();
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido al registrar.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    } 
    else if (authMode === 'forgot') {
      if (!email) {
        setError('Ingresa tu correo electrónico.');
        return;
      }
      const storedUsers: RegisteredUser[] = JSON.parse(localStorage.getItem('travel_colombia_registered_users') || '[]');
      const userExists = storedUsers.some((u) => u.email === email);

      if (!userExists && storedUsers.length > 0) {
        setError('No encontramos una cuenta registrada con este correo.');
        return;
      }

      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
      setOtpAttempts(3);
      setTimeLeft(600); // Reiniciar a 10 min
      setCanResend(false);
      setSuccessMsg(`Código OTP enviado (Simulación): ${code}. Válido por 10 minutos.`);
      setAuthMode('otp');
    } 
    else if (authMode === 'otp') {
      if (otpCode === generatedOtp) {
        if (timeLeft === 0) {
          setError('El código OTP ha expirado. Solicita uno nuevo.');
          return;
        }
        setSuccessMsg('¡Código verificado con éxito! Ahora ingresa tu nueva contraseña.');
        setAuthMode('reset');
        setOtpCode('');
      } else {
        const remaining = otpAttempts - 1;
        setOtpAttempts(remaining);
        if (remaining <= 0) {
          setError('Has agotado los 3 intentos. Solicita un nuevo código OTP.');
          setAuthMode('forgot');
        } else {
          setError(`Código incorrecto. Te quedan ${remaining} ${remaining === 1 ? 'intento' : 'intentos'}.`);
        }
      }
    }
    else if (authMode === 'reset') {
      if (!password || !confirmPassword) {
        setError('Por favor completa ambos campos de contraseña.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      const storedUsers: RegisteredUser[] = JSON.parse(localStorage.getItem('travel_colombia_registered_users') || '[]');
      const userIndex = storedUsers.findIndex((u) => u.email === email);

      if (userIndex !== -1) {
        storedUsers[userIndex].password = password;
        localStorage.setItem('travel_colombia_registered_users', JSON.stringify(storedUsers));
      }

      setSuccessMsg('¡Contraseña restablecida con éxito! Ya puedes iniciar sesión.');
      setAuthMode('login');
      resetFormValues();
    }
  };

  const handleSocialLogin = (provider: string) => {
    const userData = {
      name: `Usuario ${provider}`,
      email: `usuario@${provider.toLowerCase()}.com`
    };
    localStorage.setItem('travel_colombia_user', JSON.stringify(userData));
    window.dispatchEvent(new Event('storage'));
    onLoginSuccess(userData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      {/* TARJETA MODAL PRINCIPAL */}
      <div className="w-full max-w-md bg-[#0e0e11] border border-neutral-800/80 rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col max-h-[92vh] overflow-hidden relative text-neutral-200">
        
        {/* Barra superior decorativa */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-600 via-[#fbbf24] to-amber-500 rounded-t-[28px] z-10"></div>

        {/* BOTÓN DE CIERRE (X) CON HOVER BLANCO BRILLANTE */}
        <div className="absolute top-4 right-4 z-50">
          <button 
            type="button"
            onClick={onClose}
            onMouseDown={(e) => { e.stopPropagation(); }}
            className="bg-neutral-900 text-[#fbbf24] hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.9)] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 group cursor-pointer border-2 border-neutral-700 select-none"
            aria-label="Cerrar ventana"
          >
            <X size={22} className="stroke-[3] group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* PESTAÑAS SUPERIORES (Entrar / Registrarse) */}
        {(authMode === 'login' || authMode === 'register') && (
          <div className="p-3 pb-0 bg-neutral-950/60 rounded-t-[28px] pt-4">
            <div className="flex bg-neutral-900/90 p-1 rounded-2xl border border-neutral-800/60 shadow-inner">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); resetFormValues(); }}
                className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-all rounded-xl font-sans cursor-pointer ${
                  authMode === 'login' 
                    ? 'bg-gradient-to-r from-amber-500 to-[#fbbf24] text-black shadow-lg shadow-amber-500/20 font-extrabold' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('register'); resetFormValues(); }}
                className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-all rounded-xl font-sans cursor-pointer ${
                  authMode === 'register' 
                    ? 'bg-gradient-to-r from-amber-500 to-[#fbbf24] text-black shadow-lg shadow-amber-500/20 font-extrabold' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                }`}
              >
                Registrarse
              </button>
            </div>
          </div>
        )}

        {/* CONTENEDOR CON SCROLL */}
        <div className="p-7 pt-5 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* ENCABEZADOS Y TÍTULOS */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-black tracking-wider uppercase font-sans mb-1 bg-gradient-to-r from-[#FCD116] via-[#003893] to-[#CE1126] bg-clip-text text-transparent drop-shadow-sm">
              Travel Colombia
            </h1>

            <div className="text-xl font-black tracking-wider text-white uppercase flex items-center justify-center gap-1.5 font-sans mt-2">
              {authMode === 'login' && 'Bienvenido'}
              {authMode === 'register' && 'Crear Cuenta'}
              {authMode === 'forgot' && 'Recuperar Contraseña'}
              {authMode === 'otp' && 'Verificación OTP'}
              {authMode === 'reset' && 'Nueva Contraseña'}
            </div>
            <p className="text-xs text-neutral-400 mt-1 font-sans">
              {authMode === 'login' && 'Accede a tus rutas y lugares guardados.'}
              {authMode === 'register' && 'Crea tu cuenta y descubre destinos increíbles.'}
              {authMode === 'forgot' && 'Ingresa tu correo registrado para recibir un código temporal.'}
              {authMode === 'otp' && `Introduce el código de 4 dígitos enviado. Expira en ${formatTime(timeLeft)}.`}
              {authMode === 'reset' && 'Define tu nueva contraseña segura para tu cuenta.'}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-950/60 border border-red-800/80 text-red-200 text-xs rounded-xl text-center shadow-lg font-sans">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 bg-amber-950/60 border border-amber-800/80 text-amber-200 text-xs rounded-xl text-center shadow-lg font-sans">
              {successMsg}
            </div>
          )}

          {/* FORMULARIO */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {authMode === 'register' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">Nombre</label>
                    <div className="relative group">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 group-focus-within:text-[#fbbf24] transition-colors">
                        <User size={16} />
                      </span>
                      <input 
                        type="text"
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-3.5 py-3 pl-10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#fbbf24] transition-all font-sans"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">Apellido</label>
                    <div className="relative group">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 group-focus-within:text-[#fbbf24] transition-colors">
                        <User size={16} />
                      </span>
                      <input 
                        type="text"
                        placeholder="Tu apellido"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-3.5 py-3 pl-10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#fbbf24] transition-all font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">Cédula</label>
                    <input 
                      type="text"
                      placeholder="Nro. de cédula"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                      required
                      className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#fbbf24] transition-all font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">Celular</label>
                    <input 
                      type="tel"
                      placeholder="300 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#fbbf24] transition-all font-sans"
                    />
                  </div>
                </div>
              </div>
            )}

            {authMode !== 'otp' && (
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">
                  Correo Electrónico
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 group-focus-within:text-[#fbbf24] transition-colors">
                    <Mail size={16} />
                  </span>
                  <input 
                    type="email"
                    placeholder="tu.correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#fbbf24] transition-all font-sans"
                  />
                </div>
              </div>
            )}

            {authMode === 'register' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">Fecha de Nacimiento</label>
                  <input 
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white scheme-dark focus:outline-none focus:border-[#fbbf24] transition-all font-sans"
                  />
                </div>

                <div className="p-3.5 bg-neutral-900/40 border border-neutral-800/70 rounded-2xl space-y-3">
                  <label className="block text-[11px] font-bold tracking-wider text-amber-400 uppercase font-sans">Pregunta de Seguridad</label>
                  <select 
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#fbbf24] transition-colors font-sans"
                  >
                    <option value="">Selecciona una pregunta</option>
                    <option value="pet">¿Cómo se llamaba tu primera mascota?</option>
                    <option value="city">¿En qué ciudad naciste?</option>
                    <option value="school">¿Cuál fue el nombre de tu colegio?</option>
                  </select>
                  <input 
                    type="text"
                    placeholder="Tu respuesta secreta"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#fbbf24] transition-colors font-sans"
                  />
                </div>
              </div>
            )}

            {authMode === 'otp' && (
              <div className="flex flex-col gap-2 items-center">
                <label className="text-[11px] font-bold text-[#fbbf24] uppercase tracking-wider">Código OTP (4 dígitos)</label>
                <input 
                  type="text"
                  maxLength={4}
                  placeholder="0000"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-neutral-900 border border-[#fbbf24]/50 rounded-xl px-4 py-3.5 text-center tracking-[1em] text-xl font-black text-[#fbbf24] placeholder-neutral-700 focus:outline-none focus:border-[#fbbf24] transition-all"
                />
                <div className="text-[11px] text-neutral-400 mt-1">
                  Tiempo restante: <span className={`font-bold ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-[#fbbf24]'}`}>{formatTime(timeLeft)}</span>
                </div>
                {canResend && (
                  <button 
                    type="button" 
                    onClick={() => {
                      const code = Math.floor(1000 + Math.random() * 9000).toString();
                      setGeneratedOtp(code);
                      setTimeLeft(600);
                      setCanResend(false);
                      setSuccessMsg(`Nuevo código enviado: ${code}`);
                    }}
                    className="text-xs text-[#fbbf24] underline hover:text-white mt-2 cursor-pointer"
                  >
                    Reenviar código OTP
                  </button>
                )}
              </div>
            )}

            {(authMode === 'login' || authMode === 'register' || authMode === 'reset') && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase font-sans">
                    {authMode === 'reset' ? 'Nueva Contraseña' : 'Contraseña'}
                  </label>
                  {authMode === 'login' && (
                    <button 
                      type="button" 
                      onClick={() => { setAuthMode('forgot'); resetFormValues(); }}
                      className="text-xs font-medium text-[#fbbf24] hover:underline cursor-pointer font-sans"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 group-focus-within:text-[#fbbf24] transition-colors">
                    <Lock size={16} />
                  </span>
                  <input 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#fbbf24] transition-all font-sans"
                  />
                </div>
              </div>
            )}

            {(authMode === 'register' || authMode === 'reset') && (
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">
                  Confirmar Contraseña
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 group-focus-within:text-[#fbbf24] transition-colors">
                    <Lock size={16} />
                  </span>
                  <input 
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#fbbf24] transition-all font-sans"
                  />
                </div>
              </div>
            )}

            {/* BOTÓN PRINCIPAL DE ACCIÓN */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 bg-gradient-to-r from-amber-500 via-[#fbbf24] to-amber-400 text-black font-black py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-[0.98] text-sm tracking-wider uppercase font-sans border-2 border-transparent hover:bg-white hover:bg-none hover:text-black hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] cursor-pointer disabled:opacity-50"
            >
              <span>
                {loading && authMode === 'register' && 'Registrando en la nube...'}
                {!loading && authMode === 'login' && 'Iniciar Sesión'}
                {!loading && authMode === 'register' && 'Completar Registro'}
                {authMode === 'forgot' && 'Enviar Código OTP'}
                {authMode === 'otp' && 'Verificar Código'}
                {authMode === 'reset' && 'Actualizar Contraseña'}
              </span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* LOGIN SOCIAL (Solo en modo Login) */}
          {authMode === 'login' && (
            <>
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-800"></div>
                </div>
                <span className="relative px-3 bg-[#0e0e11] text-[10px] tracking-widest uppercase text-neutral-500 font-semibold font-sans">
                  O continúa con
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="py-2.5 px-3 bg-neutral-900/80 hover:bg-white hover:text-black border border-neutral-800/80 rounded-xl text-xs font-medium text-neutral-300 transition-all flex items-center justify-center gap-1.5 shadow-sm group font-sans cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                >
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  className="py-2.5 px-3 bg-neutral-900/80 hover:bg-white hover:text-black border border-neutral-800/80 rounded-xl text-xs font-medium text-neutral-300 transition-all flex items-center justify-center gap-1.5 shadow-sm group font-sans cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                >
                  Apple
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="py-2.5 px-3 bg-neutral-900/80 hover:bg-white hover:text-black border border-neutral-800/80 rounded-xl text-xs font-medium text-neutral-300 transition-all flex items-center justify-center gap-1.5 shadow-sm group font-sans cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                >
                  Facebook
                </button>
              </div>
            </>
          )}

          {/* PIE DE NAVEGACIÓN ENTRE MODOS */}
          {(authMode === 'forgot' || authMode === 'otp' || authMode === 'reset') && (
            <div className="mt-6 text-center text-xs text-neutral-400 border-t border-neutral-800/80 pt-4">
              <p>
                ¿Recordaste tu contraseña?{' '}
                <button type="button" onClick={() => { setAuthMode('login'); resetFormValues(); }} className="text-[#fbbf24] font-bold hover:underline cursor-pointer">
                  Volver al login
                </button>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}