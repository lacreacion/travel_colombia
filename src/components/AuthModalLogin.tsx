'use client';


import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowRight, X, Check } from 'lucide-react';
import { useLanguage } from './LanguageProvider';


interface AuthModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

const CURRENT_DATE = new Date().toISOString().slice(0, 10);

type AuthMode = 'login' | 'register' | 'forgot';


export default function AuthModalLogin({ isOpen, onClose, onLoginSuccess }: AuthModalLoginProps) {
  const { t } = useLanguage();
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


  const [error, setError] = useState('');
  const [errorValues, setErrorValues] = useState<Record<string, string | number>>({});
  const [successMsg, setSuccessMsg] = useState('');
  const [successMsgValues, setSuccessMsgValues] = useState<Record<string, string | number>>({});
  const [loading, setLoading] = useState(false);
  const [showRegistrationErrors, setShowRegistrationErrors] = useState(false);

  const passwordRequirements = [
    { label: 'Mínimo 8 caracteres', met: password.length >= 8 },
    { label: 'Una letra mayúscula', met: /\p{Lu}/u.test(password) },
    { label: 'Una letra minúscula', met: /\p{Ll}/u.test(password) },
    { label: 'Un número', met: /\d/.test(password) },
    { label: 'Un símbolo (por ejemplo: !@#$%)', met: /[\p{P}\p{S}]/u.test(password) },
  ];
  const passwordStrengthScore = passwordRequirements.filter((requirement) => requirement.met).length;
  const passwordStrengthLabel = passwordStrengthScore >= 5 ? 'Alta' : passwordStrengthScore >= 3 ? 'Media' : 'Baja';

  const getRegistrationErrors = () => {
    const errors: Record<string, string> = {};
    const requiredFields: Array<[string, string]> = [
      ['Nombre', name],
      ['Apellido', lastName],
      ['Cédula', cedula],
      ['Celular', phone],
      ['Correo Electrónico', email],
      ['Fecha de Nacimiento', birthDate],
      ['Pregunta de Seguridad', securityQuestion],
      ['Tu respuesta secreta', securityAnswer],
      ['Contraseña', password],
      ['Confirmar Contraseña', confirmPassword],
    ];

    for (const [field, value] of requiredFields) {
      if (!value.trim()) errors[field] = 'Campo obligatorio.';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors['Correo Electrónico'] = 'Introduce un correo electrónico válido.';
    }

    const idDigits = cedula.replace(/\D/g, '').length;
    if (cedula.trim() && (idDigits < 5 || idDigits > 15)) {
      errors['Cédula'] = 'La cédula debe tener entre 5 y 15 dígitos.';
    }

    const phoneDigits = phone.replace(/\D/g, '').length;
    if (phone.trim() && (phoneDigits < 7 || phoneDigits > 15)) {
      errors['Celular'] = 'Introduce un número de celular válido.';
    }

    if (birthDate && birthDate > CURRENT_DATE) {
      errors['Fecha de Nacimiento'] = 'La fecha de nacimiento no puede ser futura.';
    }

    if (password && passwordStrengthScore < passwordRequirements.length) {
      errors['Contraseña'] = 'La contraseña debe cumplir todos los requisitos.';
    }

    if (confirmPassword && password !== confirmPassword) {
      errors['Confirmar Contraseña'] = 'Las contraseñas no coinciden.';
    }

    return errors;
  };


  useEffect(() => {
    window.localStorage.removeItem('travel_colombia_registered_users');
    window.localStorage.removeItem('travel_colombia_user');
  }, []);


  if (!isOpen) return null;


  const resetFormValues = () => {
    setError('');
    setErrorValues({});
    setSuccessMsg('');
    setSuccessMsgValues({});
    setPassword('');
    setConfirmPassword('');
    setShowRegistrationErrors(false);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrorValues({});
    setSuccessMsg('');
    setSuccessMsgValues({});


    if (authMode === 'login') {
      if (!email || !password) {
        setError('Por favor completa todos los campos.');
        return;
      }
      setLoading(true);
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Correo o contraseña incorrectos.');
        onLoginSuccess(data.user);
        onClose();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión.');
      } finally {
        setLoading(false);
      }
    }
    else if (authMode === 'register') {
      setShowRegistrationErrors(true);
      if (Object.keys(getRegistrationErrors()).length > 0) {
        return;
      }


      setLoading(true);


      try {
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


        setName('');
        setLastName('');
        setCedula('');
        setPhone('');
        setBirthDate('');
        setSecurityQuestion('');
        setSecurityAnswer('');
        setPassword('');
        setConfirmPassword('');
        setShowRegistrationErrors(false);
        setSuccessMsg('Registro completado con éxito. Ya puedes iniciar sesión.');
        setAuthMode('login');
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
      setLoading(true);
      try {
        const response = await fetch('/api/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        setError(data.error || 'La recuperación de contraseña no está disponible temporalmente.');
      } catch {
        setError('No se pudo contactar el servicio de recuperación.');
      } finally {
        setLoading(false);
      }
    }
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
            aria-label={t('Cerrar ventana')}
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
                {t('Entrar')}
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
                {t('Registrarse')}
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
              {authMode === 'login' && t('Bienvenido')}
              {authMode === 'register' && t('Crear Cuenta')}
              {authMode === 'forgot' && t('Recuperar Contraseña')}
            </div>
            <p className="text-xs text-neutral-400 mt-1 font-sans">
              {authMode === 'login' && t('Accede a tus rutas y lugares guardados.')}
              {authMode === 'register' && t('Crea tu cuenta y descubre destinos increíbles.')}
              {authMode === 'forgot' && t('La recuperación de contraseña no está disponible temporalmente. Contacta con soporte.')}
            </p>
          </div>


          {error && (
            <div className="mb-5 p-3.5 bg-red-950/60 border border-red-800/80 text-red-200 text-xs rounded-xl text-center shadow-lg font-sans">
              {t(error, {
                ...errorValues,
                attemptLabel: t(String(errorValues.attemptLabel ?? '')),
              })}
            </div>
          )}


          {successMsg && (
            <div className="mb-5 p-3.5 bg-amber-950/60 border border-amber-800/80 text-amber-200 text-xs rounded-xl text-center shadow-lg font-sans">
              {t(successMsg, successMsgValues)}
            </div>
          )}


          {/* FORMULARIO */}
          <form onSubmit={handleSubmit} noValidate={authMode === 'register'} className="space-y-4">
            {authMode === 'register' && showRegistrationErrors && Object.keys(getRegistrationErrors()).length > 0 && (
              <div role="alert" className="rounded-xl border border-red-800/80 bg-red-950/60 p-3.5 text-xs text-red-200 shadow-lg font-sans">
                <p className="mb-2 font-bold">{t('Revisa los campos indicados:')}</p>
                <ul className="space-y-1">
                  {Object.entries(getRegistrationErrors()).map(([field, message]) => (
                    <li key={field}><span className="font-semibold">{t(field)}:</span> {t(message)}</li>
                  ))}
                </ul>
              </div>
            )}
           
            {authMode === 'register' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">{t('Nombre')}</label>
                    <div className="relative group">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 group-focus-within:text-[#fbbf24] transition-colors">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        placeholder={t('Tu nombre')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-3.5 py-3 pl-10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#fbbf24] transition-all font-sans"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">{t('Apellido')}</label>
                    <div className="relative group">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 group-focus-within:text-[#fbbf24] transition-colors">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        placeholder={t('Tu apellido')}
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
                    <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">{t('Cédula')}</label>
                    <input
                      type="text"
                      placeholder={t('Nro. de cédula')}
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                      required
                      className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#fbbf24] transition-all font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">{t('Celular')}</label>
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


            {authMode !== 'forgot' && (
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">
                  {t('Correo Electrónico')}
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 group-focus-within:text-[#fbbf24] transition-colors">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    placeholder={t('tu.correo@ejemplo.com')}
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
                  <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">{t('Fecha de Nacimiento')}</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white scheme-dark focus:outline-none focus:border-[#fbbf24] transition-all font-sans"
                  />
                </div>


                <div className="p-3.5 bg-neutral-900/40 border border-neutral-800/70 rounded-2xl space-y-3">
                  <label className="block text-[11px] font-bold tracking-wider text-amber-400 uppercase font-sans">{t('Pregunta de Seguridad')}</label>
                  <select
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#fbbf24] transition-colors font-sans"
                  >
                    <option value="">{t('Selecciona una pregunta')}</option>
                    <option value="pet">{t('¿Cómo se llamaba tu primera mascota?')}</option>
                    <option value="city">{t('¿En qué ciudad naciste?')}</option>
                    <option value="school">{t('¿Cuál fue el nombre de tu colegio?')}</option>
                  </select>
                  <input
                    type="text"
                    placeholder={t('Tu respuesta secreta')}
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#fbbf24] transition-colors font-sans"
                  />
                </div>
              </div>
            )}


            {(authMode === 'login' || authMode === 'register') && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase font-sans">
                    {t('Contraseña')}
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => { setAuthMode('forgot'); resetFormValues(); }}
                      className="text-xs font-medium text-[#fbbf24] hover:underline cursor-pointer font-sans"
                    >
                      {t('¿Olvidaste tu contraseña?')}
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
                {authMode === 'register' && (
                  <div className="mt-3 rounded-xl border border-neutral-800 bg-neutral-950/70 p-3.5" aria-live="polite">
                    <div className="mb-2 flex items-center justify-between gap-3 text-[11px]">
                      <span className="font-bold text-neutral-300">{t('Fortaleza de la contraseña')}</span>
                      <span className={`font-black uppercase ${passwordStrengthScore >= 5 ? 'text-emerald-400' : passwordStrengthScore >= 3 ? 'text-amber-400' : 'text-red-400'}`}>
                        {t(passwordStrengthLabel)}
                      </span>
                    </div>
                    <div
                      className="mb-3 h-2 overflow-hidden rounded-full bg-neutral-800"
                      role="meter"
                      aria-valuemin={0}
                      aria-valuemax={passwordRequirements.length}
                      aria-valuenow={passwordStrengthScore}
                      aria-label={t('Fortaleza de la contraseña')}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${passwordStrengthScore >= 5 ? 'bg-emerald-400' : passwordStrengthScore >= 3 ? 'bg-amber-400' : 'bg-red-500'}`}
                        style={{ width: `${(passwordStrengthScore / passwordRequirements.length) * 100}%` }}
                      />
                    </div>
                    <p className="mb-2 text-[10px] font-semibold text-neutral-400">{t('La contraseña debe incluir:')}</p>
                    <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {passwordRequirements.map((requirement) => (
                        <li key={requirement.label} className={`flex items-center gap-1.5 text-[10px] ${requirement.met ? 'text-emerald-300' : 'text-neutral-500'}`}>
                          <Check size={12} className={requirement.met ? 'text-emerald-400' : 'text-neutral-700'} />
                          {t(requirement.label)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}


            {authMode === 'register' && (
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-1.5 font-sans">
                  {t('Confirmar Contraseña')}
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
                {loading && authMode === 'register' && t('Registrando en la nube...')}
                {!loading && authMode === 'login' && t('Iniciar Sesión')}
                {!loading && authMode === 'register' && t('Completar Registro')}
                {authMode === 'forgot' && t('Consultar recuperación')}
              </span>
              <ArrowRight size={18} />
            </button>
          </form>


          {/* PIE DE NAVEGACIÓN ENTRE MODOS */}
          {authMode === 'forgot' && (
            <div className="mt-6 text-center text-xs text-neutral-400 border-t border-neutral-800/80 pt-4">
              <p>
                {t('¿Recordaste tu contraseña?')}{' '}
                <button type="button" onClick={() => { setAuthMode('login'); resetFormValues(); }} className="text-[#fbbf24] font-bold hover:underline cursor-pointer">
                  {t('Volver al login')}
                </button>
              </p>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}



