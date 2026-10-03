'use client';

import React, { useState, useEffect } from 'react';
import { X, User, Mail, CreditCard, Phone, Calendar, LogOut, Bookmark, MapPin, Save, Edit3, Trash2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface UserProfileLoginProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity?: string;
  user: {
    nombre?: string;
    apellido?: string;
    cedula?: string;
    celular?: string;
    email: string;
    fechaNacimiento?: string;
  } | null;
  onLogout: () => void;
  onUserUpdate?: (updatedUser: {
    nombre: string;
    apellido: string;
    cedula: string;
    celular: string;
    fechaNacimiento: string;
    email: string;
  }) => void;
}

export default function UserProfileLogin({ isOpen, onClose, currentCity, user, onLogout, onUserUpdate }: UserProfileLoginProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    celular: '',
    fechaNacimiento: '',
    email: user?.email || '',
  });

  const [isEditing, setIsEditing] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [mensaje, setMensaje] = useState({ text: '', isError: false });
  const [activeTab, setActiveTab] = useState<'profile' | 'routes' | 'saved'>('profile');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);

  // Cargar datos automáticamente al abrir el modal
  useEffect(() => {
    if (isOpen && user?.email) {
      const fetchUserData = async () => {
        setFetchingData(true);
        try {
          const response = await fetch('/api/users', { cache: 'no-store' });
          if (response.ok) {
            const data = await response.json();
            if (data) {
              setFormData({
                nombre: data.nombre || user.nombre || '',
                apellido: data.apellido || user.apellido || '',
                cedula: data.cedula || '',
                celular: data.celular || '',
                fechaNacimiento: data.fechaNacimiento || '',
                email: user.email,
              });
            }
          }
        } catch (error) {
          console.error('Error al cargar los datos del usuario:', error);
        } finally {
          setFetchingData(false);
        }
      };

      fetchUserData();
      const resetTimeout = window.setTimeout(() => {
        setIsEditing(false);
        setMensaje({ text: '', isError: false });
      }, 0);
      return () => window.clearTimeout(resetTimeout);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ text: '', isError: false });

    try {
      const response = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('No se pudieron guardar los cambios'));
      }

      setMensaje({ text: '¡Datos actualizados con éxito en la nube!', isError: false });
      setIsEditing(false); // Volver a modo solo lectura tras guardar
      
      if (onUserUpdate) {
        onUserUpdate(formData);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setMensaje({ text: errorMessage, isError: true });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError('');
    setDeleteLoading(true);

    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, password: deletePassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo eliminar la cuenta.');
      }

      setIsDeleteDialogOpen(false);
      setDeletePassword('');
      setAccountDeleted(true);
    } catch (error: unknown) {
      setDeleteError(error instanceof Error ? error.message : 'No se pudo eliminar la cuenta.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg my-8">

        {/* Botón de Cierre */}
        <div className="absolute -top-5 -right-5 z-[999999]">
          <button 
            type="button"
            onClick={onClose}
            className="bg-neutral-900 text-[#fbbf24] hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.9)] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 group cursor-pointer border-2 border-neutral-700 select-none"
            aria-label={t('Cerrar ventana')}
          >
            <X size={26} className="stroke-[3] group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Tarjeta del Panel de Perfil */}
        <div className="w-full bg-[#0e0e11] border border-neutral-800/80 rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden text-neutral-200">
          
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-600 via-[#fbbf24] to-amber-500 rounded-t-[28px] z-10"></div>

          <div className="p-7 pt-8 max-h-[80vh] overflow-y-auto custom-scrollbar space-y-6">
            
            {/* Encabezado del Perfil */}
            <div className="text-center pb-6 border-b border-neutral-800">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-amber-500 to-[#fbbf24] rounded-full flex items-center justify-center text-black text-2xl font-black shadow-lg shadow-amber-500/20">
                {formData.nombre ? formData.nombre.charAt(0).toUpperCase() : <User size={32} />}
              </div>
              <h1 className="text-xl font-black tracking-wider uppercase text-white font-sans">
                {`${formData.nombre} ${formData.apellido}`.trim() || t('Viajero')}
              </h1>
              <p className="text-xs text-neutral-400 mt-1 flex items-center justify-center gap-1">
                <Mail size={13} /> {formData.email || t('Sin correo registrado')}
              </p>

              {/* Pestañas de Navegación */}
              <div className="flex justify-center gap-2 mt-4">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'profile' ? 'bg-[#fbbf24] text-black' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}
                >
                  {t('Mi Perfil')}
                </button>
                <button 
                  onClick={() => setActiveTab('routes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'routes' ? 'bg-[#fbbf24] text-black' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}
                >
                  {t('Mis Rutas')}
                </button>
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'saved' ? 'bg-[#fbbf24] text-black' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}
                >
                  {t('Guardados')}
                </button>
              </div>
            </div>

            {/* CONTENIDO DE LA PESTAÑA PERFIL */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSave} className="space-y-6">
                {fetchingData && (
                  <p className="text-center text-xs text-amber-400 animate-pulse">{t('Cargando tus datos de la nube...')}</p>
                )}

                {mensaje.text && (
                  <div className={`p-3 rounded-xl text-xs text-center font-medium ${mensaje.isError ? 'bg-red-950/60 border border-red-800 text-red-200' : 'bg-emerald-950/60 border border-emerald-800 text-emerald-200'}`}>
                    {t(mensaje.text)}
                  </div>
                )}

                <div className="space-y-3 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xs font-bold text-[#fbbf24] uppercase tracking-wider">{t('Detalles de la Cuenta')}</h2>
                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 transition-all cursor-pointer"
                      >
                        <Edit3 size={13} /> {t('Actualizar Datos')}
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    
                    {/* Nombre */}
                    <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                      <span className="block text-[10px] text-neutral-500 uppercase font-bold mb-1">{t('Nombre')}</span>
                      <div className="flex items-center gap-2">
                        <User size={15} className="text-amber-400 flex-shrink-0" />
                        {isEditing ? (
                          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder={t('Tu nombre')} className="bg-transparent text-white w-full focus:outline-none border-b border-amber-500/50 pb-0.5" />
                        ) : (
                          <span className="text-white font-medium">{formData.nombre || t('No registrado')}</span>
                        )}
                      </div>
                    </div>

                    {/* Apellido */}
                    <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                      <span className="block text-[10px] text-neutral-500 uppercase font-bold mb-1">{t('Apellido')}</span>
                      <div className="flex items-center gap-2">
                        <User size={15} className="text-amber-400 flex-shrink-0" />
                        {isEditing ? (
                          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder={t('Tu apellido')} className="bg-transparent text-white w-full focus:outline-none border-b border-amber-500/50 pb-0.5" />
                        ) : (
                          <span className="text-white font-medium">{formData.apellido || t('No registrado')}</span>
                        )}
                      </div>
                    </div>

                    {/* Cédula */}
                    <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                      <span className="block text-[10px] text-neutral-500 uppercase font-bold mb-1">{t('Cédula')}</span>
                      <div className="flex items-center gap-2">
                        <CreditCard size={15} className="text-amber-400 flex-shrink-0" />
                        {isEditing ? (
                          <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} placeholder={t('Número de cédula')} className="bg-transparent text-white w-full focus:outline-none border-b border-amber-500/50 pb-0.5" />
                        ) : (
                          <span className="text-white font-medium">{formData.cedula || t('No registrada')}</span>
                        )}
                      </div>
                    </div>

                    {/* Celular */}
                    <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                      <span className="block text-[10px] text-neutral-500 uppercase font-bold mb-1">{t('Celular')}</span>
                      <div className="flex items-center gap-2">
                        <Phone size={15} className="text-amber-400 flex-shrink-0" />
                        {isEditing ? (
                          <input type="text" name="celular" value={formData.celular} onChange={handleChange} placeholder={t('Número de celular')} className="bg-transparent text-white w-full focus:outline-none border-b border-amber-500/50 pb-0.5" />
                        ) : (
                          <span className="text-white font-medium">{formData.celular || t('No registrado')}</span>
                        )}
                      </div>
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div className="col-span-full bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                      <span className="block text-[10px] text-neutral-500 uppercase font-bold mb-1">{t('Fecha de Nacimiento')}</span>
                      <div className="flex items-center gap-2">
                        <Calendar size={15} className="text-amber-400 flex-shrink-0" />
                        {isEditing ? (
                          <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="bg-transparent text-white w-full focus:outline-none border-b border-amber-500/50 pb-0.5" />
                        ) : (
                          <span className="text-white font-medium">{formData.fechaNacimiento || t('No registrada')}</span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Botones de Guardar y Cancelar que solo aparecen al activar "Actualizar Datos" */}
                {isEditing && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="w-1/3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold py-3 px-3 rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer"
                    >
                      {t('Cancelar')}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-2/3 bg-[#fbbf24] hover:bg-amber-400 text-black font-extrabold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50 shadow-lg shadow-amber-500/10"
                    >
                      <Save size={16} />
                      {loading ? t('Guardando...') : t('Guardar Cambios')}
                    </button>
                  </div>
                )}
              </form>
            )}

            {/* CONTENIDO DE LA PESTAÑA RUTAS */}
            {activeTab === 'routes' && (
              <div className="bg-neutral-900/60 border border-neutral-800/80 p-5 rounded-2xl text-center space-y-3">
                <MapPin className="mx-auto text-amber-400" size={32} />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t('Mis Rutas en {city}', { city: t(currentCity || 'Colombia') })}</h3>
                <p className="text-xs text-neutral-400">{t('Aquí aparecerán todos los itinerarios y trayectos que guardes durante tus viajes.')}</p>
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 text-xs text-neutral-500">
                  {t('Aún no tienes rutas guardadas. ¡Explora el mapa y crea la primera!')}
                </div>
              </div>
            )}

            {/* CONTENIDO DE LA PESTAÑA GUARDADOS */}
            {activeTab === 'saved' && (
              <div className="bg-neutral-900/60 border border-neutral-800/80 p-5 rounded-2xl text-center space-y-3">
                <Bookmark className="mx-auto text-amber-400" size={32} />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t('Lugares Favoritos')}</h3>
                <p className="text-xs text-neutral-400">{t('Accede rápidamente a los sitios, hoteles y atracciones que hayas marcado con favorito.')}</p>
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 text-xs text-neutral-500">
                  {t('No tienes lugares guardados todavía.')}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setDeleteError('');
                setDeletePassword('');
                setIsDeleteDialogOpen(true);
              }}
              className="w-full border border-red-800/70 bg-red-950/30 hover:bg-red-900/50 text-red-200 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
            >
              <Trash2 size={15} /> {t('Eliminar cuenta')}
            </button>

            {/* Botón de Cerrar Sesión */}
            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-200 font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
            >
              <LogOut size={16} />
              {t('Cerrar Sesión')}
            </button>

          </div>
        </div>

        {isDeleteDialogOpen && (
          <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <form onSubmit={handleDeleteAccount} className="w-full max-w-md rounded-2xl border border-red-900/70 bg-[#0e0e11] p-6 text-neutral-200 shadow-2xl">
              <h2 className="text-lg font-black text-white">{t('¿Eliminar tu cuenta?')}</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {t('Esta acción es permanente. Confirma tu contraseña para eliminar la cuenta.')}
              </p>
              <label className="mt-5 block text-xs font-bold text-neutral-300" htmlFor="delete-account-password">
                {t('Contraseña actual')}
              </label>
              <input
                id="delete-account-password"
                type="password"
                autoComplete="current-password"
                value={deletePassword}
                onChange={(event) => setDeletePassword(event.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3.5 py-3 text-sm text-white outline-none focus:border-amber-400"
              />
              {deleteError && (
                <p role="alert" className="mt-3 rounded-lg border border-red-800 bg-red-950/60 p-2.5 text-xs text-red-200">
                  {t(deleteError)}
                </p>
              )}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsDeleteDialogOpen(false)}
                  disabled={deleteLoading}
                  className="flex-1 rounded-xl bg-neutral-800 px-4 py-3 text-xs font-bold text-neutral-200 hover:bg-neutral-700 disabled:opacity-50"
                >
                  {t('Cancelar')}
                </button>
                <button
                  type="submit"
                  disabled={deleteLoading || !deletePassword}
                  className="flex-1 rounded-xl border border-red-600 bg-red-700 px-4 py-3 text-xs font-black text-white hover:bg-red-600 disabled:opacity-50"
                >
                  {deleteLoading ? t('Eliminando cuenta...') : t('Eliminar permanentemente')}
                </button>
              </div>
            </form>
          </div>
        )}

        {accountDeleted && (
          <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <div role="status" className="w-full max-w-md rounded-2xl border border-emerald-800/70 bg-[#0e0e11] p-7 text-center text-white shadow-2xl">
              <CheckCircle2 className="mx-auto mb-3 text-emerald-400" size={42} />
              <h2 className="text-lg font-black">{t('Cuenta eliminada con éxito.')}</h2>
              <p className="mt-2 text-sm text-neutral-400">{t('Tu cuenta se eliminó correctamente. Cerramos tu sesión.')}</p>
              <button
                type="button"
                onClick={() => {
                  setAccountDeleted(false);
                  onLogout();
                  onClose();
                }}
                className="mt-6 w-full rounded-xl bg-amber-400 px-4 py-3 text-xs font-black uppercase text-black hover:bg-amber-300"
              >
                {t('Entendido')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}