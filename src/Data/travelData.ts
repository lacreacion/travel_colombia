// src/data/travelData.ts

export interface ServicioItem {
  nombre: string;
  imagen: string;
}

export interface CiudadData {
  nombre: string;
  departamento: string;
  descripcion: string;
  imagenPrincipal: string;
  servicios: Record<string, ServicioItem[]>;
}

export const LISTA_SERVICIOS = [
  "Hoteles", "Rbnb", "Hostal", "Museos", "Parques", 
  "Teatros", "Restaurantes", "Comidas Recomendadas", 
  "Sitios Geniales", "Sitios Históricos"
];

export const LISTA_CIUDADES: CiudadData[] = [
  {
    nombre: "AMAZONAS",
    departamento: "LETICIA",
    descripcion: "Pulmón del mundo, un encuentro místico con la naturaleza salvaje y majestuosas culturas ancestrales.",
    imagenPrincipal: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1600",
    servicios: {
      "Hoteles": [{ nombre: "EcoLodge Amazonas", imagen: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600" }],
      "Parques": [{ nombre: "Parque Amacayacu", imagen: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=600" }]
    }
  },
  {
    nombre: "BARRANQUILLA",
    departamento: "ATLÁNTICO",
    descripcion: "La casa de la alegría eterna, el sabor del Caribe, arquitectura dorada y el carnaval más grande del país.",
    imagenPrincipal: "https://images.unsplash.com/photo-1629814421870-dfd3eb4759bf?q=80&w=1600",
    servicios: {
      "Hoteles": [{ nombre: "Hotel del Prado", imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600" }]
    }
  },
  {
    nombre: "BOGOTÁ",
    departamento: "CUNDINAMARCA",
    descripcion: "Capital multicultural llena de contrastes históricos, museos fascinantes, cerros imponentes y gastronomía de altura.",
    imagenPrincipal: "https://images.unsplash.com/photo-1538681105587-85640961bf8b?q=80&w=1600",
    servicios: {
      "Hoteles": [{ nombre: "Grand Hyatt Bogotá", imagen: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600" }],
      "Museos": [{ nombre: "Museo del Oro", imagen: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=600" }]
    }
  },
  {
    nombre: "BOYACÁ",
    departamento: "TUNJA / VILLA DE LEYVA",
    descripcion: "Pueblos coloniales de ensueño detenidos en el tiempo, páramos mágicos y campos llenos de historia libertadora.",
    imagenPrincipal: "https://images.unsplash.com/photo-1600010072023-e18fa4e13dae?q=80&w=1600",
    servicios: {
      "Hostal": [{ nombre: "Hostal Plaza Mayor", imagen: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600" }]
    }
  },
  {
    nombre: "CALI",
    departamento: "VALLE DEL CAUCA",
    descripcion: "La capital mundial de la salsa, sucursal del cielo, desbbordante de ritmo, brisa nocturna y calidez inigualable.",
    imagenPrincipal: "https://images.unsplash.com/photo-1620216447881-8bbf8e4bb6e7?q=80&w=1600",
    servicios: {
      "Restaurantes": [{ nombre: "Rincón Valluno", imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600" }]
    }
  },
  {
    nombre: "CARTAGENA",
    departamento: "BOLÍVAR",
    descripcion: "Magia colonial amurallada, calles empedradas adornadas con balcones floridos y atardeceres dorados frente al mar Caribe.",
    imagenPrincipal: "https://images.unsplash.com/photo-1583996269383-855f916d7d48?q=80&w=1600",
    servicios: {
      "Hoteles": [{ nombre: "Sofitel Santa Clara", imagen: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600" }],
      "Rbnb": [{ nombre: "Casa Colonial de Lujo", imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600" }]
    }
  },
  {
    nombre: "CHOCÓ",
    departamento: "QUIBDÓ / BAHÍA SOLANO",
    descripcion: "Paraíso místico donde la selva tropical más densa choca salvajemente con las playas vírgenes del Océano Pacífico.",
    imagenPrincipal: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1600",
    servicios: {
      "Sitios Geniales": [{ nombre: "Avistamiento de Ballenas", imagen: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=600" }]
    }
  },
  {
    nombre: "GUAJIRA",
    departamento: "RIOHACHA",
    descripcion: "Desierto imponente de arenas anaranjadas que se funde con el mar turquesa bajo el resguardo de la cultura Wayúu.",
    imagenPrincipal: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600",
    servicios: {
      "Sitios Históricos": [{ nombre: "Cabo de la Vela", imagen: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600" }]
    }
  },
  {
    nombre: "MEDELLÍN",
    departamento: "ANTIOQUIA",
    descripcion: "La innovadora Ciudad de la Eterna Primavera, rodeada de montañas, arte urbano, Metrocables y una cultura paisa vibrante.",
    imagenPrincipal: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=1600",
    servicios: {
      "Parques": [{ nombre: "Parque Arví", imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600" }]
    }
  },
  {
    nombre: "PASTO",
    departamento: "NARIÑO",
    descripcion: "Tierra de volcanes imponentes, templos de arquitectura gótica de fantasía y el místico Santuario de Las Lajas.",
    imagenPrincipal: "https://images.unsplash.com/photo-1599939575323-e18fa4e13dae?q=80&w=1600",
    servicios: {
      "Sitios Históricos": [{ nombre: "Santuario de Las Lajas", imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600" }]
    }
  },
  {
    nombre: "PEREIRA",
    departamento: "RISARALDA",
    descripcion: "El corazón del Eje Cafetero, colinas tapizadas de plantaciones de café, palmas de cera gigantes y termales relajantes.",
    imagenPrincipal: "https://images.unsplash.com/photo-1598415779336-d71c8ed3ca3a?q=80&w=1600",
    servicios: {
      "Rbnb": [{ nombre: "Finca Cafetera Tradicional", imagen: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=600" }]
    }
  },
  {
    nombre: "SAN ANDRÉS",
    departamento: "ARCHIPIÉLAGO",
    descripcion: "Un edén caribeño famoso por su alucinante mar de los siete colores, playas de arena blanca coralina y música reggae.",
    imagenPrincipal: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1600",
    servicios: {
      "Hoteles": [{ nombre: "Decameron Isleño", imagen: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600" }]
    }
  },
  {
    nombre: "SANTA MARTA",
    departamento: "MAGDALENA",
    descripcion: "La magia de tener los picos nevados más altos del mundo junto a las bahías sagradas del Parque Nacional Tayrona.",
    imagenPrincipal: "https://images.unsplash.com/photo-1589519160732-57fc4e75907c?q=80&w=1600",
    servicios: {
      "Parques": [{ nombre: "Parque Nacional Tayrona", imagen: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600" }]
    }
  },
  {
    nombre: "VALLEDUPAR",
    departamento: "CESAR",
    descripcion: "La capital mundial del Vallenato, tierra de juglares y leyendas que fluyen a la sombra de los árboles de cañaguate.",
    imagenPrincipal: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1600",
    servicios: {
      "Sitios Geniales": [{ nombre: "Río Guatapurí", imagen: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600" }]
    }
  }
];