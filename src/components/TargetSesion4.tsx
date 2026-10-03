'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, X, Utensils, Star } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { filterServicesByCategory } from '@/lib/serviceFilters';

interface SubServiceItem {
  id: number;
  name: string;
  images: string[];
  rating?: number;
}

interface ServiceItem {
  id: number;
  name: string;
  category?: string;
  tag: string;
  images: string[];
  link: string;
}

interface TargetSesion4Props {
  hasSearched: boolean;
  setHasSearched: (value: boolean) => void;
  selectedCity: string;
  activeService: string;
  filteredServices: ServiceItem[];
  allServicesList: ServiceItem[];
  imageIndices: Record<number, number>;
  nextImage: (id: number, totalImages: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  transportOpenId: number | null;
  setTransportOpenId: (id: number | null) => void;
  onResetSearch?: () => void;
}

const FIXED_NINE_SERVICES: Array<ServiceItem & { modalTitle: string; subItems: SubServiceItem[] }> = [
  {
    id: 1,
    name: "Hoteles",
    tag: "hotel",
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945', 'https://images.unsplash.com/photo-1582719478250-c89cae48b1b2'],
    link: "#",
    modalTitle: "Mejores Hoteles Disponibles",
    subItems: [
      { id: 101, name: "Grand Hyatt Hotel", images: ['https://images.unsplash.com/photo-1611892440505-427690e20c38'], rating: 4.8 },
      { id: 102, name: "Four Seasons Casa Medina", images: ['https://images.unsplash.com/photo-1582719478250-c89cae48b1b2'], rating: 4.9 },
    ]
  },
  {
    id: 2,
    name: "Airbnb",
    tag: "airbnb",
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
    link: "#",
    modalTitle: "Alojamientos Airbnb Destacados",
    subItems: [
      { id: 201, name: "Loft Moderno en Zona Rosa", images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'], rating: 4.7 },
      { id: 202, name: "Apartamento con Vista Panorámica", images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'], rating: 4.9 },
    ]
  },
  {
    id: 3,
    name: "Hostal",
    tag: "hostal",
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5', 'https://images.unsplash.com/photo-1590490360182-c33d57733427'],
    link: "#",
    modalTitle: "Hostales Juveniles y Acogedores",
    subItems: [
      { id: 301, name: "Botanico Hostel", images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5'], rating: 4.6 },
      { id: 302, name: "Selina Backpackers", images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427'], rating: 4.8 },
    ]
  },
  {
    id: 4,
    name: "Restaurantes",
    tag: "restaurantes",
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', 'https://images.unsplash.com/photo-1552566626-52f8b828add9'],
    link: "#",
    modalTitle: "Experiencias Gastronómicas",
    subItems: [
      { id: 401, name: "Restaurante Leo", images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5'], rating: 4.9 },
      { id: 402, name: "Andrés Carne de Res", images: ['https://images.unsplash.com/photo-1559339352-11d035aa65de'], rating: 4.8 },
    ]
  },
  {
    id: 5,
    name: "Sitios geniales",
    tag: "genial",
    images: ['https://images.unsplash.com/photo-1519671482749-fd09be7ccebf', 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1'],
    link: "#",
    modalTitle: "Lugares Geniales y de Interés",
    subItems: [
      { id: 501, name: "Mirador de la Torre Colpatria", images: ['https://images.unsplash.com/photo-1519671482749-fd09be7ccebf'], rating: 4.7 },
      { id: 502, name: "Zona T de Compras y Social", images: ['https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1'], rating: 4.8 },
    ]
  },
  {
    id: 6,
    name: "Museos",
    tag: "museo",
    images: ['https://images.unsplash.com/photo-1565060169194-1425c1f4e66a', 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3'],
    link: "#",
    modalTitle: "Museos y Cultura",
    subItems: [
      { id: 601, name: "Museo del Oro", images: ['https://images.unsplash.com/photo-1565060169194-1425c1f4e66a'], rating: 4.9 },
      { id: 602, name: "Museo Botero", images: ['https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3'], rating: 4.9 },
    ]
  },
  {
    id: 7,
    name: "Parques",
    tag: "parque",
    images: ['https://images.unsplash.com/photo-1519331379826-f10be5486c6f', 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8'],
    link: "#",
    modalTitle: "Parques y Naturaleza Urbana",
    subItems: [
      { id: 701, name: "Parque Metropolitano Simón Bolívar", images: ['https://images.unsplash.com/photo-1519331379826-f10be5486c6f'], rating: 4.8 },
      { id: 702, name: "Jardín Botánico de la Ciudad", images: ['https://images.unsplash.com/photo-1473448912268-2022ce9509d8'], rating: 4.7 },
    ]
  },
  {
    id: 8,
    name: "Teatros",
    tag: "teatro",
    images: ['https://images.unsplash.com/photo-1507676184212-d03ab07a01bf', 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212'],
    link: "#",
    modalTitle: "Cartelera de Teatros",
    subItems: [
      { id: 801, name: "Teatro Mayor Julio Mario Santo Domingo", images: ['https://images.unsplash.com/photo-1507676184212-d03ab07a01bf'], rating: 4.9 },
      { id: 802, name: "Teatro Nacional La Castellana", images: ['https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212'], rating: 4.8 },
    ]
  },
  {
    id: 9,
    name: "Sitios históricos",
    tag: "historico",
    images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7', 'https://images.unsplash.com/photo-1590089415690-e44075252f9b'],
    link: "#",
    modalTitle: "Patrimonio y Sitios Históricos",
    subItems: [
      { id: 901, name: "Plaza de Bolívar y Centro Histórico", images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7'], rating: 4.9 },
      { id: 902, name: "Quinta de Bolívar", images: ['https://images.unsplash.com/photo-1590089415690-e44075252f9b'], rating: 4.7 },
    ]
  }
];

export default function TargetSesion4({
  hasSearched,
  selectedCity,
  activeService,
  filteredServices,
  allServicesList,
  imageIndices,
  nextImage,
  onResetSearch
}: TargetSesion4Props) {
  const { t } = useLanguage();
  const [selectedCategoryModal, setSelectedCategoryModal] = useState<typeof FIXED_NINE_SERVICES[0] | null>(null);
  const [modalImageIndices, setModalImageIndices] = useState<Record<number, number>>({});
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formattedSearchItems: SubServiceItem[] = filteredServices.length > 0 
    ? filteredServices.map((s, idx) => ({
        id: s.id || idx,
        name: s.name,
        images: s.images,
        rating: 4.8
      }))
    : [
        { id: 999, name: t('No se encontraron resultados en {city}', { city: selectedCity }), images: ['https://images.unsplash.com/photo-1578575437130-527eed3abbec'], rating: 4.0 }
      ];

  const handleNextModalImage = (subServiceId: number, totalImages: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalImageIndices(prev => ({ ...prev, [subServiceId]: ((prev[subServiceId] || 0) + 1) % totalImages }));
  };

  const handlePrevModalImage = (subServiceId: number, totalImages: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalImageIndices(prev => ({ ...prev, [subServiceId]: ((prev[subServiceId] - 1 + totalImages) % totalImages) }));
  };

  const isSearchModalOpen = hasSearched;
  const isCategoryModalOpen = selectedCategoryModal !== null;

  const activeServiceName = FIXED_NINE_SERVICES.find((service) => service.tag === activeService)?.name || activeService;
  const currentModalTitle = isSearchModalOpen 
    ? (activeService ? t('Resultados para: {category}', { category: t(activeServiceName) }) : t('Resultados en {city}', { city: selectedCity }))
    : selectedCategoryModal?.modalTitle || '';

  const currentModalItems = isSearchModalOpen 
    ? formattedSearchItems 
    : selectedCategoryModal
      ? filterServicesByCategory(allServicesList, selectedCategoryModal.tag).map((service) => ({
          id: service.id,
          name: service.name,
          images: service.images,
          rating: 4.8,
        }))
      : [];

  const handleCloseModal = () => {
    setSelectedCategoryModal(null);
    if (hasSearched && onResetSearch) {
      onResetSearch();
    }
  };

  return (
    <main ref={sectionRef} className="w-full bg-white pt-2 pb-12 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* ENCABEZADO */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-red-600 font-extrabold bg-red-50 px-3 py-1 rounded-full">
              {t('Explorador de Destinos')}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-950 mt-2 tracking-tight">{selectedCity}</h1>
            <p className="text-sm text-neutral-500 mt-1">
              {t('Catálogo general de servicios organizados en cuadrícula')}
            </p>
          </div>

          {hasSearched && onResetSearch && (
            <button 
              onClick={onResetSearch}
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer self-start"
            >
              <X className="w-4 h-4" />
              {t('Cerrar resultados de búsqueda')}
            </button>
          )}
        </div>

        {/* CUADRÍCULA CON EFECTO LATERAL Y POR FILAS ORDENADAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FIXED_NINE_SERVICES.map((service, index) => {
            const currentImgIdx = imageIndices[service.id] || 0;
            const totalImages = service.images.length;

            // Cálculo para efecto ordenado por filas y columnas (más lento y elegante)
            const rowIndex = Math.floor(index / 3); // Fila 0, 1, 2...
            const colIndex = index % 3;             // Columna 0, 1, 2
            
            // Retraso calculado por fila y columna (las filas entran escalonadas, y dentro de la fila entran de lado)
            const delay = rowIndex * 200 + colIndex * 150;

            return (
              <div 
                key={service.id}
                onClick={() => setSelectedCategoryModal(service)}
                style={{ transitionDelay: `${delay}ms` }}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-zinc-200/80 transition-all duration-700 ease-out flex flex-col cursor-pointer group ${
                  isVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-12 translate-y-6'
                }`}
              >
                {/* Imagen fija en h-48 */}
                <div className="relative w-full h-48 bg-zinc-100 overflow-hidden">
                  <img 
                    src={service.images[currentImgIdx]} 
                    alt={t(service.name)} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  <button 
                    onClick={(e) => nextImage(service.id, totalImages, e)}
                    className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-neutral-900 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow cursor-pointer hover:bg-white"
                  >
                    <Camera className="w-3 h-3" />
                    <span>{currentImgIdx + 1} / {totalImages}</span>
                  </button>

                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    {t(service.name)}
                  </span>
                </div>

                {/* Zona inferior ultra compacta y delgada */}
                <div className="p-2.5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xs font-black text-neutral-900 group-hover:text-red-600 transition-colors leading-snug">{t(service.modalTitle)}</h3>
                    <p className="text-[10px] text-neutral-500 flex items-center gap-1 mt-0.5 font-medium">
                      <MapPin className="w-3 h-3 text-red-500" />
                      {selectedCity}
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-zinc-100">
                    <div className="w-full bg-zinc-50 group-hover:bg-red-600 group-hover:text-white text-zinc-700 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1">
                      <Utensils className="w-3 h-3" /> {t('Clic para ver opciones')}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* VENTANA MODAL PARA VER OPCIONES */}
      {(isSearchModalOpen || isCategoryModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative">
            
            <div className="px-8 py-6 flex items-center justify-between border-b border-neutral-100">
              <h2 className="text-2xl font-extrabold text-neutral-950 tracking-tight">{currentModalTitle}</h2>
              <button 
                onClick={handleCloseModal} 
                className="bg-neutral-100 hover:bg-red-50 text-neutral-700 hover:text-red-600 p-3 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentModalItems.length === 0 && (
                <p className="col-span-full text-center text-sm text-neutral-500">
                  {t('No se encontraron resultados en {city}', { city: selectedCity })}
                </p>
              )}
              {currentModalItems.map((item) => {
                const currentImgIdx = modalImageIndices[item.id] || 0;
                const totalImages = item.images.length;

                return (
                  <div key={item.id} className="bg-neutral-50 rounded-2xl p-4 flex flex-col shadow-sm border border-neutral-100">
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3">
                      <img 
                        src={item.images[currentImgIdx]} 
                        alt={t(item.name)} 
                        className="w-full h-full object-cover" 
                      />
                      {totalImages > 1 && (
                        <>
                          <button onClick={(e) => handlePrevModalImage(item.id, totalImages, e)} className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-full z-10 cursor-pointer text-xs">
                            &larr;
                          </button>
                          <button onClick={(e) => handleNextModalImage(item.id, totalImages, e)} className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-full z-10 cursor-pointer text-xs">
                            &rarr;
                          </button>
                        </>
                      )}
                    </div>
                    <h4 className="font-bold text-neutral-900 text-base mb-1">{t(item.name)}</h4>
                    {item.rating && (
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{item.rating}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}
    </main>
  );
}