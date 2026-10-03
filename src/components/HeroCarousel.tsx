'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageProvider';

interface HeroSlide {
  id: string;
  nombre: string;
  descripcionHero: string;
  imagenesHero: string[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "amazonas",
    nombre: "AMAZONAS",
    descripcionHero: "Sumérgete en la magia del Amazonas.",
    imagenesHero: [
      "https://images.pexels.com/photos/13557924/pexels-photo-13557924.jpeg",
      "https://images.pexels.com/photos/27010824/pexels-photo-27010824.jpeg",
      "https://images.pexels.com/photos/16672587/pexels-photo-16672587.jpeg",
      "https://images.pexels.com/photos/30302618/pexels-photo-30302618.jpeg"
    ]
  },
  {
    id: "barranquilla",
    nombre: "BARRANQUILLA",
    descripcionHero: "La ventana al caribe colombiano.",
    imagenesHero: [
"https://images.pexels.com/photos/14587109/pexels-photo-14587109.jpeg",
"https://images.pexels.com/photos/36173191/pexels-photo-36173191.jpeg"
  ]
  },
  {
    id: "bogota",
    nombre: "BOGOTÁ",
    descripcionHero: "Una ciudad que lo tiene todo en las alturas.",
    imagenesHero: [
      "https://images.pexels.com/photos/16808749/pexels-photo-16808749.jpeg",
"https://images.pexels.com/photos/13795638/pexels-photo-13795638.jpeg"
   ]
  },
  {
    id: "boyaca",
    nombre: "BOYACÁ",
    descripcionHero: "Historia, paisajes y pueblos coloniales.",
    imagenesHero: [
      "https://images.pexels.com/photos/19676034/pexels-photo-19676034.jpeg",
      "https://images.pexels.com/photos/33788801/pexels-photo-33788801.jpeg"
    ]
  },
  {
    id: "cali",
    nombre: "CALI",
    descripcionHero: "¡Vive la pasión de Cali!",
    imagenesHero: [
      "https://images.pexels.com/photos/11815576/pexels-photo-11815576.jpeg",
      "https://images.pexels.com/photos/13830743/pexels-photo-13830743.jpeg"

    ]
  },
  {
    id: "cartagena",
    nombre: "CARTAGENA",
    descripcionHero: "Encanto amurallado frente al mar Caribe.",
    imagenesHero: [
      "https://images.pexels.com/photos/11815905/pexels-photo-11815905.jpeg",
      "https://images.pexels.com/photos/13823517/pexels-photo-13823517.jpeg",
      "https://images.pexels.com/photos/11379609/pexels-photo-11379609.jpeg"

    ]
  },
  {
    id: "choco",
    nombre: "CHOCÓ",
    descripcionHero: "Selva virgen, ballenas y playas mágicas.",
    imagenesHero: [
      "https://images.pexels.com/photos/12577785/pexels-photo-12577785.jpeg",
      "https://images.pexels.com/photos/8878000/pexels-photo-8878000.jpeg",
      "https://images.pexels.com/photos/13806064/pexels-photo-13806064.jpeg"
    ]
  },
  {
    id: "guajira",
    nombre: "GUAJIRA",
    descripcionHero: "Desierto y mar uniendo fuerzas en el norte.",
    imagenesHero: [
      "https://images.pexels.com/photos/13209625/pexels-photo-13209625.jpeg",
      "https://images.pexels.com/photos/32643806/pexels-photo-32643806.jpeg",
      "https://images.pexels.com/photos/13835241/pexels-photo-13835241.jpeg"
    ]
  },
  {
    id: "medellin",
    nombre: "MEDELLÍN",
    descripcionHero: "La ciudad de la eterna primavera.",
    imagenesHero: [
      "https://images.pexels.com/photos/29285024/pexels-photo-29285024.jpeg",
      "https://images.pexels.com/photos/12470935/pexels-photo-12470935.jpeg",
      "https://images.pexels.com/photos/37278677/pexels-photo-37278677.jpeg"
    ]
  },
  {
    id: "pasto",
    nombre: "PASTO",
    descripcionHero: "Cultura, tradición y arte al sur de Colombia.",
    imagenesHero: [
      "https://images.pexels.com/photos/16637471/pexels-photo-16637471.jpeg",
      "https://images.pexels.com/photos/15463272/pexels-photo-15463272.jpeg",
      "https://images.pexels.com/photos/11716221/pexels-photo-11716221.jpeg"
    ]
  },
  {
    id: "pereira",
    nombre: "PEREIRA",
    descripcionHero: "Café, naturaleza y calidez en el Eje Cafetero.",
    imagenesHero: [
      "https://images.pexels.com/photos/12138429/pexels-photo-12138429.jpeg",
      "https://images.pexels.com/photos/28405101/pexels-photo-28405101.jpeg",
      "https://images.pexels.com/photos/28405097/pexels-photo-28405097.jpeg"
    ]
  },
  {
    id: "san-andres",
    nombre: "SAN ANDRÉS",
    descripcionHero: "El mar de los siete colores te espera.",
    imagenesHero: [
      "https://images.pexels.com/photos/13836268/pexels-photo-13836268.jpeg",
      "https://images.pexels.com/photos/5287939/pexels-photo-5287939.jpeg",
      "https://images.pexels.com/photos/25003199/pexels-photo-25003199.jpeg"
    ]
  },
  {
    id: "santa-marta",
    nombre: "SANTA MARTA",
    descripcionHero: "Magia ancestral entre la sierra y el mar.",
    imagenesHero: [
      "https://images.pexels.com/photos/28035987/pexels-photo-28035987.jpeg",
      "https://images.pexels.com/photos/11815901/pexels-photo-11815901.jpeg",
      "https://images.pexels.com/photos/13826177/pexels-photo-13826177.jpeg"
    ]
  },
  {
    id: "valledupar",
    nombre: "VALLEDUPAR",
    descripcionHero: "Tierra de acordeones y tradición vallenata.",
    imagenesHero: [
      "https://images.pexels.com/photos/13796705/pexels-photo-13796705.jpeg",
      "https://images.pexels.com/photos/11451144/pexels-photo-11451144.jpeg",
    ]
  }
];

interface ServicioCategoria {
  id: string;
  nombre: string;
  imagen: string;
}

const SERVICIOS_CATEGORIAS: ServicioCategoria[] = [
  { id: "s1", nombre: "HOTELES", imagen: "https://images.pexels.com/photos/33125906/pexels-photo-33125906.jpeg" },
  { id: "s2", nombre: "RBNB", imagen: "https://images.pexels.com/photos/18801079/pexels-photo-18801079.jpeg" },
  { id: "s3", nombre: "HOSTAL", imagen: "https://images.pexels.com/photos/11063553/pexels-photo-11063553.jpeg" },
  { id: "s4", nombre: "GLAMPLING", imagen: "https://images.pexels.com/photos/14106950/pexels-photo-14106950.jpeg" },
  { id: "s5", nombre: "MUSEOS", imagen: "https://images.pexels.com/photos/3779198/pexels-photo-3779198.jpeg" },
  { id: "s6", nombre: "PARQUES", imagen: "https://images.pexels.com/photos/38500394/pexels-photo-38500394.jpeg" },
  { id: "s7", nombre: "TEATROS", imagen: "https://images.pexels.com/photos/33126408/pexels-photo-33126408.jpeg" },
  { id: "s8", nombre: "RESTAURANTES", imagen: "https://images.pexels.com/photos/6763282/pexels-photo-6763282.jpeg" },
  { id: "s9", nombre: "COMIDAS RECOMENDADAS", imagen: "https://images.pexels.com/photos/25217362/pexels-photo-25217362.jpeg" },
  { id: "s10", nombre: "SITIOS GENIALES", imagen: "https://images.pexels.com/photos/17499904/pexels-photo-17499904.jpeg" },
  { id: "s11", nombre: "SITIOS HISTÓRICOS", imagen: "https://images.pexels.com/photos/13767911/pexels-photo-13767911.jpeg" },
];

export default function HeroCarousel() {
  const { t } = useLanguage();
  const [fase, setFase] = useState<'ciudades' | 'servicios'>('ciudades');
  const [slideActivo, setSlideActivo] = useState<HeroSlide>(HERO_SLIDES[0]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<string>(HERO_SLIDES[0].nombre);
  const [imgIndex, setImgIndex] = useState(0);
  const [estaRotando, setEstaRotando] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.offsetWidth * 0.5;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (estaRotando && slideActivo?.imagenesHero?.length > 0) {
      timer = setInterval(() => {
        setImgIndex((prev) => (prev + 1) % slideActivo.imagenesHero.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [estaRotando, slideActivo]);

  useEffect(() => {
    const handleReset = () => {
      setFase('ciudades');
      setSlideActivo(HERO_SLIDES[0]);
      setCiudadSeleccionada(HERO_SLIDES[0].nombre);
      setImgIndex(0);
    };
    window.addEventListener('reset-hero', handleReset);
    return () => window.removeEventListener('reset-hero', handleReset);
  }, []);

  const handleIrASesion4 = (servicioNombre?: string) => {
    window.dispatchEvent(new CustomEvent('ir-a-sesion4', { 
      detail: { ciudad: ciudadSeleccionada, servicio: servicioNombre || null } 
    }));
  };

  const imagenFondoActual = slideActivo?.imagenesHero?.[imgIndex] || slideActivo?.imagenesHero?.[0] || '';

 return (
    <div className="w-full px-4 md:px-12 mt-28 mb-2"> 
      
      {/* Contenedor principal */}
      <div 
        className="relative min-h-[70vh] w-full flex flex-col justify-between px-6 md:px-20 pt-26 pb-20 bg-cover bg-center transition-all duration-700 rounded-3xl shadow-2xl overflow-visible"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(9,9,11,0.4), rgba(9,9,11,0.85)), url(${imagenFondoActual})` 
        }}
      >
        {/* Textos dentro del recuadro */}
        <div className="space-y-2 max-w-xl z-20 mt-2">
          <span className="text-[#ffee00] drop-shadow-[0_0_8px_rgba(255,238,0,0.6)] text-sm md:text-base font-black tracking-[0.25em] uppercase block">
            {t(ciudadSeleccionada)}
          </span>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white drop-shadow-md">
            {t(slideActivo.nombre)}
          </h1>
          <p className="text-white/90 text-sm md:text-base italic border-l-2 border-[#ffee00] pl-3 max-w-md pt-1 drop-shadow">
            {t(slideActivo.descripcionHero)}
          </p>
          
          <button 
            onClick={() => handleIrASesion4(fase === 'servicios' ? slideActivo.nombre : undefined)}
            className="bg-[#ffee00] text-black px-6 py-2.5 font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-white transition-colors cursor-pointer mt-3 shadow-[0_0_15px_rgba(255,238,0,0.5)]"
          >
            {t('Ver más')}
          </button>
        </div>

        {/* Carrusel inferior posicionado para quedar la mitad adentro y la mitad afuera del recuadro */}
        <div className="absolute -bottom-16 right-6 md:right-16 z-30 flex items-center gap-3 w-auto max-w-[65%]">
          <button 
            onClick={() => scroll('left')}
            className="bg-black/80 hover:bg-[#ffee00] hover:text-black hover:drop-shadow-[0_0_8px_rgba(255,238,0,0.6)] text-white p-3 rounded-full transition-all shrink-0 cursor-pointer border border-white/20 shadow-lg"
          >
            ◀
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto py-2 scrollbar-none justify-start items-center"
          >
            {(fase === 'ciudades' ? HERO_SLIDES : SERVICIOS_CATEGORIAS).map((item) => {
              const esSlide = 'imagenesHero' in item;
              const itemSlide = esSlide ? (item as HeroSlide) : null;
              const itemServicio = !esSlide ? (item as ServicioCategoria) : null;
              const imagenUrl = itemSlide ? itemSlide.imagenesHero[0] : itemServicio?.imagen;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    setEstaRotando(true);
                    if (itemSlide) {
                      setSlideActivo(itemSlide);
                      setImgIndex(0);
                    } else if (itemServicio) {
                      setSlideActivo({
                        ...slideActivo,
                        nombre: itemServicio.nombre,
                        imagenesHero: [itemServicio.imagen], 
                        descripcionHero: t('Explora nuestras recomendaciones de {category} en {city}.', {
                          category: t(itemServicio.nombre),
                          city: ciudadSeleccionada,
                        })
                      });
                      setImgIndex(0);
                    }
                  }}
                  onMouseLeave={() => setEstaRotando(false)}
                  onClick={() => {
                    if (fase === 'ciudades' && itemSlide) {
                      setCiudadSeleccionada(itemSlide.nombre);
                      setSlideActivo(itemSlide);
                      setImgIndex(0);
                      setFase('servicios');
                    } else if (itemServicio) {
                      handleIrASesion4(itemServicio.nombre);
                    }
                  }}
                  style={{ width: '130px', minWidth: '130px', height: '210px' }}
                  className="rounded-2xl cursor-pointer border-2 border-transparent hover:border-[#ffee00] hover:shadow-[0_0_12px_rgba(255,238,0,0.6)] transition-all duration-300 relative overflow-hidden shadow-2xl hover:scale-105 shrink-0 bg-zinc-900"
                >
                  <img 
                    src={imagenUrl} 
                    alt={t(item.nombre)}
                    loading="eager"
                    decoding="async"
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '130px', 
                      height: '210px', 
                      objectFit: 'cover' 
                    }}
                  />
                  <div 
                    style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)',
                      pointerEvents: 'none' 
                    }} 
                  />
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', zIndex: 10 }}>
                    <h4 className="text-[11px] font-black uppercase text-white truncate drop-shadow-md">{t(item.nombre)}</h4>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="bg-black/80 hover:bg-[#ffee00] hover:text-black hover:drop-shadow-[0_0_8px_rgba(255,238,0,0.6)] text-white p-3 rounded-full transition-all shrink-0 cursor-pointer border border-white/20 shadow-lg"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}