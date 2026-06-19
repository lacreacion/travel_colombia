export interface Escapada {
  id: string;
  pueblo: string;
  ubicacionTexto: string;
  atraccionPrincipal: string;
  imagenes: string[]; // Arreglo exacto de 3 imágenes para el mini-carrusel
  descripcion: string;
}

export interface Ciudad {
  nombre: string;
  escapadasCercanas: Escapada[];
}

export const LISTA_CIUDADES: Ciudad[] = [
  {
    nombre: "AMAZONAS",
    escapadasCercanas: [
      {
        id: "amz-1",
        pueblo: "Puerto Nariño",
        ubicacionTexto: "A 2 horas de Leticia",
        atraccionPrincipal: "Pesebre Natural",
        imagenes: [
          "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Un municipio ecológico ejemplar donde no existen los vehículos motorizados. Rodeado de selva densa y hogar del místico Lago Tarapoto."
      },
      {
        id: "amz-2",
        pueblo: "Lago Tarapoto",
        ubicacionTexto: "Cerca a Puerto Nariño",
        atraccionPrincipal: "Delfines Rosados",
        imagenes: [
          "https://images.unsplash.com/photo-1570473541596-234180d53b94?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Santuario natural perfecto para el avistamiento de los legendarios delfines rosados y grises del Amazonas bajo atardeceres mágicos."
      },
      {
        id: "amz-3",
        pueblo: "Comunidad Mocagua",
        ubicacionTexto: "Río Amazonas arriba",
        atraccionPrincipal: "Fundación Maikuchiga",
        imagenes: [
          "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Aldea indígena conocida por sus colorivos murales artísticos y su centro dedicado a la protección y rehabilitación de monos huérfanos."
      },
      {
        id: "amz-4",
        pueblo: "Isla de los Monos",
        ubicacionTexto: "A 25 min de Leticia",
        atraccionPrincipal: "Primates Libres",
        imagenes: [
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Un espacio natural de reserva donde cientos de monos ardilla interactúan libremente en las copas de los árboles con los visitantes."
      },
      {
        id: "amz-5",
        pueblo: "Reserva Tanimboca",
        ubicacionTexto: "Km 11 vía Tarapacá",
        atraccionPrincipal: "Canopy Nocturno",
        imagenes: [
          "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Ofrece la experiencia extrema de pernoctar en casas en árboles a 35 metros de altura y hacer caminatas guiadas buscando fauna nocturna."
      }
    ]
  },
  {
    nombre: "BARRANQUILLA",
    escapadasCercanas: [
      {
        id: "baq-1",
        pueblo: "Puerto Colombia",
        ubicacionTexto: "A 20 min de Barranquilla",
        atraccionPrincipal: "Muelle Histórico",
        imagenes: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1473116763269-25544724652c?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Antigua puerta de entrada al país a través de su muelle. Disfruta de la nueva plaza gastronómica, sus playas y su brisa caribeña icónica."
      },
      {
        id: "baq-2",
        pueblo: "Usiacurí",
        ubicacionTexto: "A 45 min de Barranquilla",
        atraccionPrincipal: "Artesanías en Palma",
        imagenes: [
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "El pesebre del Atlántico. Famoso por sus techos pintados de aves, la casa museo del poeta Julio Flórez y los tejidos en palma de iraca."
      },
      {
        id: "baq-3",
        pueblo: "Tubará",
        ubicacionTexto: "A 35 min de Barranquilla",
        atraccionPrincipal: "Piedra Pintada",
        imagenes: [
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1434725039720-abb26e22e34a?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Tierra con historia indígena de los Mokaná. Destaca por sus miradores naturales elevados y senderos que llevan a petroglifos ancestrales."
      },
      {
        id: "baq-4",
        pueblo: "Bocas de Ceniza",
        ubicacionTexto: "Extremo norte de la ciudad",
        atraccionPrincipal: "Choque de Aguas",
        imagenes: [
          "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Un espectacular paseo en tren artesanal sobre un tajamar angosto, viendo dónde se une el Río Magdalena con el inmenso Mar Caribe."
      },
      {
        id: "baq-5",
        pueblo: "Galerazamba",
        ubicacionTexto: "A 1 hora por Autopista",
        atraccionPrincipal: "Mar Rosado",
        imagenes: [
          "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Famoso por sus salinas coloniales que, debido a una microalga en temporadas secas, tiñen las aguas de un color rosa intenso digno de fotos."
      }
    ]
  },
  {
    nombre: "BOGOTÁ",
    escapadasCercanas: [
      {
        id: "bog-1",
        pueblo: "Zipaquirá",
        ubicacionTexto: "A 1 hora de Bogotá",
        atraccionPrincipal: "Catedral de Sal",
        imagenes: [
          "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Una majestuosa joya arquitectónica subterránea tallada completamente en roca de sal dentro de los antiguos túneles mineros."
      },
      {
        id: "bog-2",
        pueblo: "Guatavita",
        ubicacionTexto: "A 1 hora y media de Bogotá",
        atraccionPrincipal: "Laguna Sagrada",
        imagenes: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Cuna de la mística leyenda de El Dorado. El pueblo presenta una hermosa arquitectura colonial uniforme con casas blancas y techos de teja."
      },
      {
        id: "bog-3",
        pueblo: "Choachí",
        ubicacionTexto: "A 45 minutos de Bogotá",
        atraccionPrincipal: "Termales Santa Mónica",
        imagenes: [
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Famoso por albergar las aguas termales medicinales más ricas de la región y la imponente cascada de La Chorrera, la más alta de Colombia."
      },
      {
        id: "bog-4",
        pueblo: "Villa de Leyva",
        ubicacionTexto: "A 3 horas de Bogotá",
        atraccionPrincipal: "Plaza Mayor Gigante",
        imagenes: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1549294413-26f195afcbce?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Un viaje en el tiempo con calles empedradas impecables, desiertos prehistóricos y una de las plazas empedradas más grandes de Sudamérica."
      },
      {
        id: "bog-5",
        pueblo: "Suesca",
        ubicacionTexto: "A 1 hora hacia el norte",
        atraccionPrincipal: "Farallones de Escalada",
        imagenes: [
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Meca del montañismo y la escalada en roca en el país. Impresionantes acantilados de piedra arenisca rodeados de verdes valles andinos."
      }
    ]
  },
  {
    nombre: "BOYACÁ",
    escapadasCercanas: [
      {
        id: "boy-1",
        pueblo: "Monguí",
        ubicacionTexto: "A 40 min de Sogamoso",
        atraccionPrincipal: "Fábricas de Balones",
        imagenes: [
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Catalogado como el pueblo más lindo de Boyacá. Famoso por su puente colonial de Calicanto y su tradición artesanal de balones cosidos a mano."
      },
      {
        id: "boy-2",
        pueblo: "Laguna de Tota",
        ubicacionTexto: "A 1 hora de Tunja",
        atraccionPrincipal: "Playa Blanca Andina",
        imagenes: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "El lago más grande de Colombia ubicado a 3.000 metros de altura, con una playa de arena blanca natural rodeada de cultivos de cebolla."
      },
      {
        id: "boy-3",
        pueblo: "Ráquira",
        ubicacionTexto: "A 30 min de Villa de Leyva",
        atraccionPrincipal: "Cerámica Multicolor",
        imagenes: [
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "La capital artesanal del barro. Sus fachadas pintadas estallan en colores vivos y sus calles están llenas de vasijas, juguetes y ollas de arcilla."
      },
      {
        id: "boy-4",
        pueblo: "Paipa",
        ubicacionTexto: "A 40 min de Tunja",
        atraccionPrincipal: "Termales Mineromedicinales",
        imagenes: [
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Centro hotelero y turístico por excelencia, famoso por su lago Sochagota para deportes náuticos y sus piscinas de aguas termales."
      },
      {
        id: "boy-5",
        pueblo: "Páramo de Ocetá",
        ubicacionTexto: "Saliendo desde Monguí",
        atraccionPrincipal: "Frailejones Gigantes",
        imagenes: [
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Considerado el páramo más hermoso y mejor conservado del mundo. Un jardín de piedra natural repleto de frailejones imponentes."
      }
    ]
  },
  {
    nombre: "CALI",
    escapadasCercanas: [
      {
        id: "cali-1",
        pueblo: "San Cipriano",
        ubicacionTexto: "A 2 horas de Cali",
        atraccionPrincipal: "Paseo en Brujita",
        imagenes: [
          "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Una reserva natural con ríos cristalinos de ensueño a la que se accede montando en 'brujitas': tablados sobre rieles de tren impulsados por motos."
      },
      {
        id: "cali-2",
        pueblo: "Calima El Darién",
        ubicacionTexto: "A 1 hora y media de Cali",
        atraccionPrincipal: "Lago Calima",
        imagenes: [
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Meca del Windsurf y Kitesurf gracias a que cuenta con los vientos más rápidos de América Latina durante todo el año."
      },
      {
        id: "cali-3",
        pueblo: "Pance",
        ubicacionTexto: "A 25 min del sur de Cali",
        atraccionPrincipal: "Río de Piedras",
        imagenes: [
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "El escape dominical por excelencia de los caleños. Aguas frías que bajan directo de los Farallones de Cali ideales para un baño relajante."
      },
      {
        id: "cali-4",
        pueblo: "Dapa",
        ubicacionTexto: "A 30 min al norte de la ciudad",
        atraccionPrincipal: "Clima de Niebla",
        imagenes: [
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Región montañosa de clima frío y bosques de niebla. Destaca por su oferta de restaurantes campestres, cafés y avistamiento de aves exóticas."
      },
      {
        id: "cali-5",
        pueblo: "Ginebra",
        ubicacionTexto: "A 50 min de Cali",
        atraccionPrincipal: "Ruta del Sancocho",
        imagenes: [
          "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Destino gastronómico y musical del Valle. Famoso mundialmente por su sancocho de gallina en fogón de leña y el Festival del Mono Núñez."
      }
    ]
  },
  {
    nombre: "CARTAGENA",
    escapadasCercanas: [
      {
        id: "ctg-1",
        pueblo: "Islas del Rosario",
        ubicacionTexto: "A 45 min en lancha",
        atraccionPrincipal: "Arrecifes de Coral",
        imagenes: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Parque nacional marino compuesto por 28 islas de aguas cristalinas turquesas perfectas para practicar esnórquel y careteo."
      },
      {
        id: "ctg-2",
        pueblo: "Isla Barú",
        ubicacionTexto: "A 1 hora por tierra",
        atraccionPrincipal: "Playa Blanca",
        imagenes: [
          "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1473116763269-25544724652c?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Famosa península costera de arenas blancas brillantes y mar calmado. Por las noches ofrece tours para ver el asombroso plancton luminoso."
      },
      {
        id: "ctg-3",
        pueblo: "San Jacinto",
        ubicacionTexto: "A 1 hora y media al sur",
        atraccionPrincipal: "Tejidos en Telar",
        imagenes: [
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Tierra cultural en los Montes de María, célebre por sus hamacas artesanales finamente tejidas a mano y las gaitas tradicionales colombianas."
      },
      {
        id: "ctg-4",
        pueblo: "San Basilio de Palenque",
        ubicacionTexto: "A 1 hora y cuarto",
        atraccionPrincipal: "Primer Pueblo Libre",
        imagenes: [
          "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Patrimonio de la Humanidad. Un bastión de cultura africana intacta, música de tambores y lengua palenquera propia fundada por cimarrones."
      },
      {
        id: "ctg-5",
        pueblo: "Volcán del Totumo",
        ubicacionTexto: "A 45 min por Vía Mar",
        atraccionPrincipal: "Baño de Lodo",
        imagenes: [
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Un cono volcánico de lodo denso y tibio de 15 metros de altura donde puedes flotar sin esfuerzo debido a las propiedades minerales del suelo."
      }
    ]
  },
  {
    nombre: "CHOCÓ",
    escapadasCercanas: [
      {
        id: "cho-1",
        pueblo: "Bahía Solano",
        ubicacionTexto: "Costa Pacífica Norte",
        atraccionPrincipal: "Ballenas Jorobadas",
        imagenes: [
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1570473541596-234180d53b94?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Uno de los lugares con mayor biodiversidad del planeta. Entre julio y octubre es el escenario perfecto para ver saltar ballenas jorobadas."
      },
      {
        id: "cho-2",
        pueblo: "Nuquí",
        ubicacionTexto: "Al sur de Bahía Solano",
        atraccionPrincipal: "Termales en la Selva",
        imagenes: [
          "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Donde la selva tropical lluviosa choca directamente con las playas vírgenes oscuras del Océano Pacífico. Cuenta con cascadas y baños termales puros."
      },
      {
        id: "cho-3",
        pueblo: "Capurganá",
        ubicacionTexto: "Caribe Chocoano",
        atraccionPrincipal: "La Coquerita",
        imagenes: [
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1473116763269-25544724652c?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Bahía libre de autos en el golfo de Urabá. Mar cristalino caribeño, senderos selváticos hermosos y piscinas naturales de agua salada."
      },
      {
        id: "cho-4",
        pueblo: "Sapzurro",
        ubicacionTexto: "Frontera con Panamá",
        atraccionPrincipal: "Cabo Tiburón",
        imagenes: [
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "La última bahía de Colombia en el Caribe. Un oasis de aguas mansas, cocoteros gigantes y una tranquilidad absoluta ideal para desconectarse."
      },
      {
        id: "cho-5",
        pueblo: "Tutunendo",
        ubicacionTexto: "A 20 min de Quibdó",
        atraccionPrincipal: "Río de Selva Extrema",
        imagenes: [
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Reconocida como una de las zonas más lluviosas del planeta. Sus ríos cristalinos corren en medio de una densa vegetación selvática exótica."
      }
    ]
  },
  {
    nombre: "GUAJIRA",
    escapadasCercanas: [
      {
        id: "guaj-1",
        pueblo: "Cabo de la Vela",
        ubicacionTexto: "A 3 horas de Riohacha",
        atraccionPrincipal: "Pilón de Azúcar",
        imagenes: [
          "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Un paraje sagrado Wayúu donde los acantilados del desierto naranja se hunden directamente en un mar verde esmeralda idílico."
      },
      {
        id: "guaj-2",
        pueblo: "Punta Gallinas",
        ubicacionTexto: "Extremo norte continental",
        atraccionPrincipal: "Dunas de Taroa",
        imagenes: [
          "https://images.unsplash.com/photo-1473116763269-25544724652c?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Enormes montañas de arena desértica que caen verticalmente hacia las olas del mar caribeño. El punto más septentrional de Sudamérica."
      },
      {
        id: "guaj-3",
        pueblo: "Mayapo",
        ubicacionTexto: "A 25 min de Riohacha",
        atraccionPrincipal: "Playas de Kitesurf",
        imagenes: [
          "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Extensas playas de arena blanca fina y vientos potentes perfectos para la práctica de deportes náuticos extremos y descanso caribeño."
      },
      {
        id: "guaj-4",
        pueblo: "Palomino",
        ubicacionTexto: "Límite con Magdalena",
        atraccionPrincipal: "Tubing en el Río",
        imagenes: [
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Destino mochilero famoso por el descenso relajante en flotadores inflables por el río Palomino hasta su desembocadura directa en el mar."
      },
      {
        id: "guaj-5",
        pueblo: "Santuario Los Flamencos",
        ubicacionTexto: "Camarones, Guajira",
        atraccionPrincipal: "Avistamiento de Aves",
        imagenes: [
          "https://images.unsplash.com/photo-1434725039720-abb26e22e34a?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Lagunas costeras donde se congregan bandadas de hermosos flamencos rosados. Un espectáculo natural para recorrer en cayucos tradicionales."
      }
    ]
  },
  {
    nombre: "MEDELLÍN",
    escapadasCercanas: [
      {
        id: "med-1",
        pueblo: "Guatapé",
        ubicacionTexto: "A 2 horas de Medellín",
        atraccionPrincipal: "Piedra del Peñol",
        imagenes: [
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "El pueblo de los zócalos de colores. Alberga el gigantesco monolito de la Piedra del Peñol con más de 700 escalones hacia la mejor vista del embalse."
      },
      {
        id: "med-2",
        pueblo: "Santa Fe de Antioquia",
        ubicacionTexto: "A 1 hora y cuarto al oeste",
        atraccionPrincipal: "Puente de Occidente",
        imagenes: [
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Ciudad colonial de clima cálido con arquitectura intacta del siglo XVII, calles de piedra y el histórico puente colgante sobre el Río Cauca."
      },
      {
        id: "med-3",
        pueblo: "Jardín",
        ubicacionTexto: "A 3 horas al suroeste",
        atraccionPrincipal: "Café de Plaza Tradicional",
        imagenes: [
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1434725039720-abb26e22e34a?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Un pueblo cafetero idílico rodeado de montañas, famoso por sus sillas pintadas a mano en la plaza principal y la Cueva del Esplendor."
      },
      {
        id: "med-4",
        pueblo: "Jericó",
        ubicacionTexto: "A 2 horas y media de Medellín",
        atraccionPrincipal: "Talleres de Carrieles",
        imagenes: [
          "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "Cuna de la Madre Laura y del carriel antioqueño. Hermoso pueblo patrimonial con una profunda tradición religiosa, artesanal y botánica."
      },
      {
        id: "med-5",
        pueblo: "San Rafael",
        ubicacionTexto: "A 30 min de Guatapé",
        atraccionPrincipal: "Charcos de Agua Pura",
        imagenes: [
          "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80"
        ],
        descripcion: "La capital hidroecológica de Antioquia. Un destino rodeado de naturaleza densa con decenas de charcos naturales de agua cristalina y cascadas."
      }
    ]
  }
];