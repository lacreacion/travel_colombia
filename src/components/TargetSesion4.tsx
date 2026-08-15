'use client';
import React, { useState } from 'react';
import { Camera, MapPin, X, Utensils, Star } from 'lucide-react';

interface SubServiceItem {
  id: number;
  name: string;
  images: string[];
  rating?: number;
}

interface ServiceItem {
  id: number;
  name: string;
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
  imageIndices,
  nextImage,
  onResetSearch
}: TargetSesion4Props) {
  const [selectedCategoryModal, setSelectedCategoryModal] = useState<typeof FIXED_NINE_SERVICES[0] | null>(null);
  const [modalImageIndices, setModalImageIndices] = useState<Record<number, number>>({});

  // Determinamos qué mostrar en el modal de búsqueda general
  const formattedSearchItems: SubServiceItem[] = filteredServices.length > 0 
    ? filteredServices.map((s, idx) => ({
        id: s.id || idx,
        name: s.name,
        images: s.images,
        rating: 4.8
      }))
    : [
        { id: 999, name: `No se encontraron resultados en ${selectedCity}`, images: ['https://images.unsplash.com/photo-1578575437130-527eed3abbec'], rating: 4.0 }
      ];

  const handleNextModalImage = (subServiceId: number, totalImages: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalImageIndices(prev => ({ ...prev, [subServiceId]: ((prev[subServiceId] || 0) + 1) % totalImages }));
  };

  const handlePrevModalImage = (subServiceId: number, totalImages: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalImageIndices(prev => ({ ...prev, [subServiceId]: ((prev[subServiceId] - 1 + totalImages) % totalImages) }));
  };

  const floatingKeyframes = `
    @keyframes floatA {
      0% { transform: translate(0px, 0px) rotate(0deg); }
      33% { transform: translate(70px, -45px) rotate(2deg); }
      66% { transform: translate(-45px, 60px) rotate(-2deg); }
      100% { transform: translate(0px, 0px) rotate(0deg); }
    }
    @keyframes floatB {
      0% { transform: translate(0px, 0px) rotate(0deg); }
      33% { transform: translate(-60px, 50px) rotate(-3deg); }
      66% { transform: translate(50px, -60px) rotate(2deg); }
      100% { transform: translate(0px, 0px) rotate(0deg); }
    }
    @keyframes floatC {
      0% { transform: translate(0px, 0px) rotate(0deg); }
      33% { transform: translate(45px, 70px) rotate(2deg); }
      66% { transform: translate(-60px, -45px) rotate(-1deg); }
      100% { transform: translate(0px, 0px) rotate(0deg); }
    }
    @keyframes floatD {
      0% { transform: translate(0px, 0px) rotate(0deg); }
      33% { transform: translate(-80px, -35px) rotate(-2deg); }
      66% { transform: translate(35px, 80px) rotate(3deg); }
      100% { transform: translate(0px, 0px) rotate(0deg); }
    }
  `;

  const positions = [
    { top: '4%', left: '3%', anim: 'floatA 14s ease-in-out infinite', z: 10 },
    { top: '22%', left: '35%', anim: 'floatB 18s ease-in-out infinite', z: 30 },
    { top: '6%', left: '68%', anim: 'floatC 16s ease-in-out infinite', z: 20 },
    { top: '45%', left: '2%', anim: 'floatD 20s ease-in-out infinite', z: 25 },
    { top: '40%', left: '36%', anim: 'floatA 15s ease-in-out infinite', z: 40 },
    { top: '35%', left: '71%', anim: 'floatB 17s ease-in-out infinite', z: 15 },
    { top: '70%', left: '18%', anim: 'floatC 21s ease-in-out infinite', z: 35 },
    { top: '65%', left: '52%', anim: 'floatD 13s ease-in-out infinite', z: 12 },
    { top: '52%', left: '76%', anim: 'floatA 19s ease-in-out infinite', z: 28 },
  ];

  // Si hasSearched es true, mostramos directamente el modal con los resultados del filtro
  const isSearchModalOpen = hasSearched;
  const isCategoryModalOpen = selectedCategoryModal !== null;

  const currentModalTitle = isSearchModalOpen 
    ? (activeService ? `Resultados para: ${activeService.toUpperCase()}` : `Resultados en ${selectedCity}`)
    : selectedCategoryModal?.modalTitle || '';

  const currentModalItems = isSearchModalOpen 
    ? formattedSearchItems 
    : selectedCategoryModal?.subItems || [];

  const handleCloseModal = () => {
    setSelectedCategoryModal(null);
    if (hasSearched && onResetSearch) {
      onResetSearch();
    }
  };

  return (
    <main className="w-full md:w-[75%] bg-white p-6 md:p-10 flex flex-col justify-between relative min-h-[850px] border-none shadow-none overflow-hidden">
      <style>{floatingKeyframes}</style>

      <div className="absolute top-6 left-6 z-50 pointer-events-none">
        <span className="text-[11px] uppercase tracking-wider text-red-600 font-extrabold bg-red-50 px-3 py-1 rounded-full">
          Explorador de Destinos
        </span>
        <h1 className="text-4xl font-extrabold text-neutral-950 mt-2 tracking-tight">{selectedCity}</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Las 9 categorías de servicios flotando y cruzándose
        </p>
      </div>

      {hasSearched && onResetSearch && (
        <button 
          onClick={onResetSearch}
          className="absolute top-6 right-6 z-50 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <X className="w-4 h-4" />
          Cerrar resultados
        </button>
      )}

      <div className="relative w-full h-[750px] mt-24">
        {FIXED_NINE_SERVICES.map((service, index) => {
          const currentImgIdx = imageIndices[service.id] || 0;
          const totalImages = service.images.length;
          const pos = positions[index % positions.length];

          return (
            <div 
              key={service.id}
              onClick={() => setSelectedCategoryModal(service)}
              style={{
                top: pos.top,
                left: pos.left,
                animation: pos.anim,
                zIndex: pos.z
              }}
              className="absolute w-64 bg-white/95 backdrop-blur-md rounded-3xl p-3.5 flex flex-col justify-between shadow-xl border border-neutral-100 transition-all hover:scale-105 hover:shadow-2xl hover:z-50 cursor-pointer group hover:[animation-play-state:paused]"
            >
              <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-2.5">
<img 
                  src={service.images[currentImgIdx]} 
                  alt={service.name} 
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />                <button 
                  onClick={(e) => nextImage(service.id, totalImages, e)}
                  className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-neutral-900 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 cursor-pointer"
                >
                  <Camera className="w-2.5 h-2.5" />
                  <span>{currentImgIdx + 1} / {totalImages}</span>
                </button>
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {service.name}
                </span>
              </div>

              <div className="mb-2">
                <h3 className="text-sm font-bold text-neutral-900 truncate">{service.modalTitle}</h3>
                <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-red-500" />
                  {selectedCity}
                </p>
              </div>

              <div className="bg-neutral-100/85 rounded-xl p-1.5 text-center">
                <span className="text-[10px] text-neutral-600 font-medium flex items-center justify-center gap-1">
                  <Utensils className="w-2.5 h-2.5 text-red-500" /> Clic para ver opciones
                </span>
              </div>
            </div>
          );
        })}
      </div>

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
              {currentModalItems.map((item) => {
                const currentImgIdx = modalImageIndices[item.id] || 0;
                const totalImages = item.images.length;

                return (
                  <div key={item.id} className="bg-neutral-50 rounded-2xl p-4 flex flex-col shadow-sm border border-neutral-100">
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3">
                      <img 
                        src={item.images[currentImgIdx]} 
                        alt={item.name} 
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
                    <h4 className="font-bold text-neutral-900 text-base mb-1">{item.name}</h4>
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