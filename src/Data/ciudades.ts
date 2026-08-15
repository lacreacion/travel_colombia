export interface Escapada {
  id: string;
  pueblo: string;
  ubicacionTexto: string;
  atraccionPrincipal: string;
  descripcion: string; 
  imagenes?: string[]; 
  imagen?: string;     
}

export interface Ciudad {
  id: string;
  nombre: string;
  atraccionPrincipal: string;
  descripcionHero: string;
  imagenesHero: string[];
  escapadasCercanas: Escapada[]; 
}

export const LISTA_CIUDADES: Ciudad[] = [
  {
    id: "amazonas",
    nombre: "AMAZONAS",
    atraccionPrincipal: "maravíllate con miles de aves, la planta acuática más grande del mundo, famoso por sus delfines rosados",
    descripcionHero: "Sumérgete en la magia del Amazonas.",
    imagenesHero: [
      "https://images.unsplash.com/photo-1610416616970-456ae5b64c6f?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1596701062351-8c2c19d1a6dd?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "barranquilla",
    nombre: "BARRANQUILLA",
    atraccionPrincipal: "Déjate sorprender por el brillo monumental de la Ventana al Mundo, sumérgete en la historia viva de la Plaza de San Nicolás y celebra nuestra identidad cultural ante el imponente Sombrero Vueltiao.",
    descripcionHero: "¡Descubre la esencia de Barranquilla!.",
    imagenesHero: [
      "https://images.unsplash.com/photo-1580423048628-0c5558e21921?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "bogota",
    nombre: "BOGOTA",
    atraccionPrincipal: "Recorre la histórica arquitectura de La Candelaria, maravíllate con las vistas panorámicas desde lo alto de Monserrate y sumérgete en el arte único del Museo Botero.",
    descripcionHero: "¡Descubre la magia de Bogotá!",
    imagenesHero: [
      "https://images.unsplash.com/photo-1518227849348-e6e17085853f?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1599811807317-5e60d0fb9b0f?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1588714779197-fac8134cd756?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "boyaca",
    nombre: "BOYACA",
    atraccionPrincipal: "Recorre la historia en el emblemático Puente de Boyacá, déjate cautivar por el colorido artesanal de Ráquira y enamórate de la arquitectura colonial de Villa de Leyva.",
    descripcionHero: "¡Vive la magia de Boyacá!",
    imagenesHero: [
      "https://images.unsplash.com/photo-1631435784930-17ff69763078?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1512813076211-19d7d6f5d58f?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "cali",
    nombre: "CALI",
    atraccionPrincipal: "Muévete al ritmo de La calle de la salsa, maravíllate con la vista panorámica desde el Mirador y sumérgete en la historia local del Museo. ¡La Sucursal del Cielo te espera!",
    descripcionHero: "¡Vive la pasión de Cali!",
    imagenesHero: [
      "https://images.unsplash.com/photo-1675181432372-17ac444c89b6?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "cartagena",
    nombre: "CARTAGENA",
    atraccionPrincipal: "Explora la majestuosa historia del Castillo de San Felipe, camina por la encantadora Ciudad amurallada y relájate en la naturaleza del Parque.",
    descripcionHero: "¡La Heroica te espera! Enamórate de Cartagena",
    imagenesHero: [
      "https://images.unsplash.com/photo-1533484399335-82472dfa9440?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "choco",
    nombre: "CHOCO",
    atraccionPrincipal: "Maravíllate con el avistamiento de ballenas, explora la exuberante naturaleza del Chocó y vive la cultura local en la plaza.",
    descripcionHero: "¡Una experiencia única en el Pacífico te espera!",
    imagenesHero: [
      "https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1519074069444-1ba4ea16d66c?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "guajira",
    nombre: "GUAJIRA",
    atraccionPrincipal: "Explora la inmensidad del desierto y vive la cultura local en la plaza dorada.",
    descripcionHero: "¡Una aventura inolvidable te espera en el norte de Colombia!",
    imagenesHero: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "medellin",
    nombre: "MEDELLIN",
    atraccionPrincipal: "Recorre el arte urbano de la Comuna 13, admira los paisajes de Guatapé y siente la tradición en el Pueblito Paisa.",
    descripcionHero: "¡Tu aventura en la Ciudad de la Eterna Primavera te espera!",
    imagenesHero: [
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "pasto",
    nombre: "PASTO",
    atraccionPrincipal: "Siente la alegría del Carnaval, explora la belleza de la ciudad, maravíllate con el lago y recorre el majestuoso Santuario de Las Lajas.",
    descripcionHero: "¡Vive la magia de Pasto!",
    imagenesHero: [
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1426604966848-d7adacbd02bff?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "pereira",
    nombre: "PEREIRA",
    atraccionPrincipal: "Admira la ciudad desde el Mirador Altagracia, explora la naturaleza en el Parque Ucumarí y Santa Rosa, y recorre el icónico Viaducto.",
    descripcionHero: "¡La Perla del Otún te espera para una experiencia inolvidable!",
    imagenesHero: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "san_andres",
    nombre: "SAN ANDRES",
    atraccionPrincipal: "Explora la biodiversidad del acuario, disfruta de una experiencia única de compras en las tiendas y relájate en la belleza natural de San Andrés.",
    descripcionHero: "¡El mar de siete colores te espera!",
    imagenesHero: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "santa marta",
    nombre: "SANTA MARTA",
    atraccionPrincipal: "Recorre su histórica ciudad, camina frente al mar en el malecón y relájate en las aguas cristalinas de Playa Blanca.",
    descripcionHero: "¡El paraíso caribeño te espera!",
    imagenesHero: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1519074069444-1ba4ea16d66c?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  },
  {
    id: "valledupar",
    nombre: "VALLEDUPAR",
    atraccionPrincipal: "Recorre sus icónicos monumentos en la ciudad y refréscate en las cristalinas aguas del río Guatapurí.",
    descripcionHero: "¡La Capital Mundial del Vallenato te espera!",
    imagenesHero: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920&h=1080&fit=crop"
    ],
    escapadasCercanas: []
  }
];