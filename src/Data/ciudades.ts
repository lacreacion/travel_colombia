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
    imagenesHero: ["/sesion2_ciudades/Amazonas/a_1.jfif","/sesion2_ciudades/Amazonas/a_2.jfif","/sesion2_ciudades/Amazonas/a_3.jpg"],
  escapadasCercanas:[ ]
  },
  {
    id: "barranquilla",
    nombre: "BARRANQUILLA",
    atraccionPrincipal:"Déjate sorprender por el brillo monumental de la Ventana al Mundo, sumérgete en la historia viva de la Plaza de San Nicolás y celebra nuestra identidad cultural ante el imponente Sombrero Vueltiao.",
    descripcionHero: "¡Descubre la esencia de Barranquilla!.",
    imagenesHero: ["/sesion2_ciudades/Barranquilla/a_1.jfif","/sesion2_ciudades/Barranquilla/a_2.jfif","/sesion2_ciudades/Barranquilla/sombrero valluno.jpg"],
 escapadasCercanas:[ ]
  },
  {
    id: "bogota",
    nombre: "BOGOTA",
    atraccionPrincipal:"Recorre la histórica arquitectura de La Candelaria, maravíllate con las vistas panorámicas desde lo alto de Monserrate y sumérgete en el arte único del Museo Botero.",
    descripcionHero: "¡Descubre la magia de Bogotá!",
    imagenesHero: ["/sesion2_ciudades/Bogota/c_1.jfif","/sesion2_ciudades/Bogota/c_2.jfif","/sesion2_ciudades/Bogota/c_3.jfif"],
 escapadasCercanas:[ ]
  },
  {
    id: "boyaca",
    nombre: "BOYACA",
    atraccionPrincipal:"Recorre la historia en el emblemático Puente de Boyacá, déjate cautivar por el colorido artesanal de Ráquira y enamórate de la arquitectura colonial de Villa de Leyva.",
    descripcionHero: "¡Vive la magia de Boyacá!",
    imagenesHero: ["/sesion2_ciudades/Boyaca/d_1.jpg","/sesion2_ciudades/Boyaca/d_2.jpg","/sesion2_ciudades/Boyaca/d_3.jpg"],
  escapadasCercanas:[ ]
  },
  {
    id: "cali",
    nombre: "CALI",
    atraccionPrincipal:"Muévete al ritmo de La calle de la salsa, maravíllate con la vista panorámica desde el Mirador y sumérgete en la historia local del Museo. ¡La Sucursal del Cielo te espera!",
    descripcionHero: "¡Vive la pasión de Cali!",
    imagenesHero: ["/sesion2_ciudades/Cali/e_1.jpg","/sesion2_ciudades/Cali/e_2.jpg","/sesion2_ciudades/Cali/e_3.jpg"],
  escapadasCercanas:[ ]
  },
  {
    id: "cartagena",
    nombre: "CARTAGENA",
    atraccionPrincipal:"Explora la majestuosa historia del Castillo de San Felipe, camina por la encantadora Ciudad amurallada y relájate en la naturaleza del Parque.",
    descripcionHero: "¡La Heroica te espera!Enamórate de Cartagena",
    imagenesHero: ["/sesion2_ciudades/Cartagena/castillo.jpg","/sesion2_ciudades/Cartagena/ciudad.jpg","/sesion2_ciudades/Cartagena/parque.jpg"],
  escapadasCercanas:[ ]
  },
  {
    id: "choco",
    nombre: "CHOCO",
    atraccionPrincipal:"Maravíllate con el avistamiento de ballenas, explora la exuberante naturaleza del Chocó y vive la cultura local en la plaza.",
    descripcionHero: "¡Una experiencia única en el Pacífico te espera!",
    imagenesHero: ["/sesion2_ciudades/Choco/ballenas.jpg","/sesion2_ciudades/Choco/choco.jpg","/sesion2_ciudades/Choco/plaza.jpg"],
  escapadasCercanas:[ ]
  },
  {
    id: "guajira",
    nombre: "GUAJIRA",
    atraccionPrincipal:"Explora la inmensidad del desierto del tatacoa y vive la cultura local en la plaza dorada.",
    descripcionHero: "¡Una aventura inolvidable te espera en el norte de Colombia!",
    imagenesHero: ["/sesion2_ciudades/Guajira/desierto .jpg","/sesion2_ciudades/Guajira/plaza.jpg"],
  escapadasCercanas:[ ]
  },
  {
    id: "medellin",
    nombre: "MEDELLIN",
    atraccionPrincipal:"Recorre el arte urbano de la Comuna 13, admira los paisajes de Guatapé y siente la tradición en el Pueblito Paisa.",
    descripcionHero: "¡Tu aventura en la Ciudad de la Eterna Primavera te espera!",
    imagenesHero: ["/sesion2_ciudades/Medellin/comuna_13.jpg","/sesion2_ciudades/Medellin/guatape.jpg","/sesion2_ciudades/Medellin/pueblito_viejo.jpg"],
  escapadasCercanas:[ ]
  },
  {
    id: "pasto",
    nombre: "PASTO",
    atraccionPrincipal:"iente la alegría del Carnaval, explora la belleza de la ciudad, maravíllate con el lago y recorre el majestuoso Santuario de Las Lajas.",
    descripcionHero: "¡Vive la magia de Pasto!",
    imagenesHero: ["/sesion2_ciudades/Pasto/carnaval de pasto.jpg","/sesion2_ciudades/Pasto/ciudad de pasto.jpg","/sesion2_ciudades/Pasto/lago pasto.jpg","/sesion2_ciudades/Pasto/santuario de las lajas.jpg"],
  escapadasCercanas:[ ]
  },
  {
    id: "pereira",
    nombre: "PEREIRA",
    atraccionPrincipal:".Admira la ciudad desde el Mirador Altagracia, explora la naturaleza en el Parque Ucumarí y Santa Rosa, y recorre el icónico Viaducto.",
    descripcionHero: "¡La Perla del Otún te espera para una experiencia inolvidable!",
    imagenesHero: ["/sesion2_ciudades/Pereira/mirador altagracia.jpg","/sesion2_ciudades/Pereira/viaducto.jpg"],
  escapadasCercanas:[ ]
  },
  {
    id: "san_andres",
    nombre: "SAN ANDRES",
    atraccionPrincipal:"Explora la biodiversidad del acuario, disfruta de una experiencia única de compras en las tiendas y relájate en la belleza natural de San Andrés.",
    descripcionHero: "¡El mar de siete colores te espera!",
    imagenesHero: ["/sesion2_ciudades/San andres/acuario.jpg","/sesion2_ciudades/San andres/san andres_tiendas.jpg","/sesion2_ciudades/San andres/san andres.jpg" ],
  escapadasCercanas:[ ]
  },
  {
    id: "santa marta",
    nombre: "SANTA MARTA",
    atraccionPrincipal:"Recorre su histórica ciudad, camina frente al mar en el malecón y relájate en las aguas cristalinas de Playa Blanca.",
    descripcionHero: "¡El paraíso caribeño te espera!",
    imagenesHero: ["/sesion2_ciudades/Santa marta/ciudad.jpg","/sesion2_ciudades/Santa marta/malecon.jpg","/sesion2_ciudades/Santa marta/playa blanca.jpg"],
  escapadasCercanas:[ ]
  },
  {
    id: "valledupar",
    nombre: "VALLEDUPAR",
    atraccionPrincipal:"Recorre sus icónicos monumentos en la ciudad y refréscate en las cristalinas aguas del río Guatapurí.",
    descripcionHero: "¡La Capital Mundial del Vallenato te espera!",
    imagenesHero: ["/sesion2_ciudades/Valledupar/monumentos y ciudad.jpg","/sesion2_ciudades/Valledupar/monumentos.jpg","/sesion2_ciudades/Valledupar/rio guatapuri.jpg"],
  escapadasCercanas:[ ]
  },





  
];