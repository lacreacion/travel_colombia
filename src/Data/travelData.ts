export interface SitioItem {
  id: string;
  nombre: string;
  imagen: string;
}

export interface CiudadData {
  nombre: string;
  departamento: string;
  imagenPrincipal: string;
  descripcion: string;
  servicios: {
    [key: string]: SitioItem[]; 
  };
}

export const LISTA_CIUDADES: CiudadData[] = [
  {
    nombre: "Bogotá",
    departamento: "Cundinamarca",
    imagenPrincipal: "https://images.unsplash.com/photo-1538330621152-478f3d39570a?q=80&w=1440",
    descripcion: "La vibrante capital, corazón cultural y gastronómico del país.",
    servicios: {
      "Hoteles": [
        { id: "b_h1", nombre: "Hotel Hilton Bogotá", imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1440" }
      ],
      "Rbnb": [
        { id: "b_r1", nombre: "Apartamento de Lujo Rosales", imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1440" }
      ],
      "Museos": [
        { id: "b_m1", nombre: "Museo del Oro", imagen: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=1440" }
      ],
      "Parques": [
        { id: "b_p1", nombre: "Parque Simón Bolívar", imagen: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1440" }
      ],
      "Restaurantes": [
        { id: "b_res1", nombre: "Zona G Gastronómica", imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1440" }
      ]
    }
  },
  {
    nombre: "Amazonas",
    departamento: "Leticia",
    imagenPrincipal: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1440",
    descripcion: "Pulmón del mundo, un encuentro místico con la naturaleza y culturas ancestrales.",
    servicios: {
      "Hoteles": [
        { id: "am_h1", nombre: "Eco-Lodge Selva", imagen: "https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=1440" }
      ],
      "Parques": [
        { id: "am_p1", nombre: "Parque Amacayacu", imagen: "https://images.unsplash.com/photo-1588531388055-6b589f81df69?q=80&w=1440" }
      ]
    }
  },
  {
    nombre: "Cartagena",
    departamento: "Bolívar",
    imagenPrincipal: "https://images.unsplash.com/photo-1583531352515-88841314dd95?q=80&w=1440",
    descripcion: "Magia colonial, murallas históricas y playas bañadas por el mar Caribe.",
    servicios: {
      "Hoteles": [
        { id: "c_h1", nombre: "Hotel Santa Clara", imagen: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1440" }
      ],
      "Sitios Históricos": [
        { id: "c_s1", nombre: "Castillo San Felipe", imagen: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=1440" }
      ]
    }
  }
];

export const LISTA_SERVICIOS = [
  "Hoteles", "Rbnb", "Hostal", "Museos", "Parques", 
  "Teatros", "Restaurantes", "Comidas Recomendadas", "Sitios Geniales", "Sitios Históricos"
];