export interface Escapada {
  id: string;
  ciudadParent: string; 
  nombre: string;
  descripcionCorta: string;
  imagenes: string[]; 
  informacionDetallada: string;
  opcionesTransporte: string[]; 
}



export const ESCAPADAS_DATA: Escapada[] = [
 {
    id: 'leticia_01',
    ciudadParent: 'Amazonas, Leticia',
    nombre: 'Santa Sofía',
    descripcionCorta: 'Interactúa con la fauna silvestre en la reserva de los micos.',
    imagenes: [
      '/sesion3_escapadas/Amazonas/Santa Sofía/santa sofia_2.jpg',
      "/sesion3_escapadas/Amazonas/Santa Sofía/santa sofia_3.jpg",
      '/sesion3_escapadas/Amazonas/Santa Sofía/santa sofia_micos_2.jpg',
      '/sesion3_escapadas/Amazonas/Santa Sofía/Santa Sofía.jpg', 
      '/sesion3_escapadas/Amazonas/Santa Sofía/santasofia_micos.jpg',

    ],
    informacionDetallada: "Es el lugar ideal para observar y convivir de cerca con estas especies en su hábitat selvático.",
    opcionesTransporte: ['Bus', 'Didi', 'Uber','Terminal de transporte']
  },
  {
    id: 'leticia_02',
    ciudadParent: 'Amazonas,Leticia',
    nombre: 'orilla del río Loretoyacu',
    descripcionCorta: 'Visita el "pesebre natural" de Colombia en el Amazonas.',
    imagenes: [
      '/sesion3_escapadas/Amazonas/Loretoyacu/Loretoyacu_1.jpg',
      '/sesion3_escapadas/Amazonas/Loretoyacu/Loretoyacu_2.jpg',
      '/sesion3_escapadas/Amazonas/Loretoyacu/Loretoyacu_3.jpg',
      '/sesion3_escapadas/Amazonas/Loretoyacu/Loretoyacu_4.jpg', 
      '/sesion3_escapadas/Amazonas/Loretoyacu/Loretoyacu_5.jpg'
   

    ],
    informacionDetallada: 'Es el punto de partida perfecto para navegar hacia los Lagos de Tarapoto y observar delfines rosados en su entorno natural.',
    opcionesTransporte: ['Bus', 'Didi', 'Uber','Terminal de transporte']
  },
  {
    id: 'leticia_03',
    ciudadParent: 'Amazonas, Leticia',
    nombre: 'Mariscal Ramón Castilla',
    descripcionCorta: 'Aventúrate en la reserva ecológica de Marash.',
    imagenes: [
      '/sesion3_escapadas/Amazonas/Santa Sofía/santa sofia_2.jpg',
      '/sesion3_escapadas/Amazonas/Santa Sofía/santa sofia_3.jpg',
      '/sesion3_escapadas/Amazonas/Santa Sofía/santa sofia_micos_2.jpg',
      '/sesion3_escapadas/Amazonas/Santa Sofía/Santa Sofía.jpg', 
      '/sesion3_escapadas/Amazonas/Santa Sofía/santasofia_micos.jpg'
      

    ],
    informacionDetallada: 'esta reserva ofrece una experiencia auténtica con actividades como kayak, avistamiento de la flor de loto Victoria regia y pesca de pirañas en su lago interior.',
    opcionesTransporte: ['Bus', 'Didi', 'Uber','Terminal de transporte']
  },
  {
    id: 'quilla_01',
    ciudadParent: 'Barranquilla',
    nombre: 'Malecón del Río',
    descripcionCorta: 'Disfruta el atardecer a orillas del majestuoso río Magdalena',
    imagenes: [
      '/sesion3_escapadas/Barranquilla/Malecón/Malecón_1.jpg',
       '/sesion3_escapadas/Barranquilla/Malecón/Malecón_2.jpg',
        '/sesion3_escapadas/Barranquilla/Malecón/Malecón_3.jpg',
         '/sesion3_escapadas/Barranquilla/Malecón/Malecón_4.jpg',
          '/sesion3_escapadas/Barranquilla/Malecón/Malecón_5.jpg'
     

    ],
    informacionDetallada: 'Es un espacio perfecto para caminar, hacer deporte, disfrutar de una variada oferta gastronómica y contemplar vistas espectaculares del puerto.',
    opcionesTransporte: ['Bus', 'Didi', 'Uber','Terminal de transporte']
  },
  {
    id: 'quilla_02',
    ciudadParent: 'Barranquilla',
    nombre: 'Ventana al Mundo',
    descripcionCorta: "Contempla la estructura de cristal que simboliza la apertura de la ciudad.",
    imagenes: [
"/sesion3_escapadas/Barranquilla/Ventana al Mundo/Ventana_1.jpg",
"/sesion3_escapadas/Barranquilla/Ventana al Mundo/Ventana_2.jpg",
"/sesion3_escapadas/Barranquilla/Ventana al Mundo/Ventana_3.jpg"



    ],
    informacionDetallada: 'Es un ícono moderno de Barranquilla que rinde homenaje al progreso, Un impresionante monumento de 45 metros de altura.',
    opcionesTransporte: ['Bus', 'Didi', 'Uber','Terminal de transporte']
  },
  {
    id: 'quilla_03',
    ciudadParent: 'Barranquilla',
    nombre: 'Barrio El Prado',
    descripcionCorta: 'Viaja en el tiempo a través de la arquitectura republicana.',
    imagenes: [
"/sesion3_escapadas/Barranquilla/Barrio El Prado/El Prado_1.jpg",
"/sesion3_escapadas/Barranquilla/Barrio El Prado/El Prado_2.jpg",
"/sesion3_escapadas/Barranquilla/Barrio El Prado/El Prado_3.jpg",
"/sesion3_escapadas/Barranquilla/Barrio El Prado/El Prado_4.jpg",
"/sesion3_escapadas/Barranquilla/Barrio El Prado/El Prado.jpg"
 ],
    informacionDetallada: 'Uno de los barrios más emblemáticos y elegantes, famoso por sus casonas de estilo republicano y art déco. Sus calles arboladas albergan historia',
    opcionesTransporte: ['Bus', 'Didi', 'Uber','Terminal de transporte']
  },
  {
    id: 'bogo_01',
    ciudadParent: 'Bogota',
    nombre: 'choachi',
    descripcionCorta: 'Relájate en las aguas curativas de los termales.',
    imagenes: [
"/sesion3_escapadas/Bogota/choachi/pueblo_1_choachi.jpg",
"/sesion3_escapadas/Bogota/choachi/pueblo_2_choachi.jpg",
"/sesion3_escapadas/Bogota/choachi/termale_2_choachi.jpg",
"/sesion3_escapadas/Bogota/choachi/termales_1_choachi.jpg",
"/sesion3_escapadas/Bogota/choachi/termales_2_choachi.jpg"
 ],
    informacionDetallada: 'Ubicados en entornos naturales privilegiados, estos pozos de aguas volcánicas ricas en minerales son el destino ideal para desconectarse, revitalizar el cuerpo y disfrutar de un descanso terapéutico.',
    opcionesTransporte: ['Bus', 'Didi', 'Uber','Terminal de transporte']
  },
  {
    id:'bogo_02',
    ciudadParent: 'Bogota',
    nombre: 'Guatavita',
    descripcionCorta: 'Explora la mística Laguna de Guatavita y su leyenda.',
    imagenes: [
"/sesion3_escapadas/Bogota/guatavita/casareves_gutavita.jpg",
"/sesion3_escapadas/Bogota/guatavita/laguna_guatavita.jpg",
"/sesion3_escapadas/Bogota/guatavita/pueblo_2_guatavita.jpg",
"/sesion3_escapadas/Bogota/guatavita/pueblo_3_guatavita.jpg",
"/sesion3_escapadas/Bogota/guatavita/pueblo_guatavita.jpg"
 ],
    informacionDetallada: 'Ubicada en Sesquilé, esta laguna sagrada es famosa por la leyenda de El Dorado, siendo un lugar de gran valor histórico y belleza natural rodeado de montañas andinas.',
    opcionesTransporte: ['Bus', 'Didi', 'Uber','Terminal de transporte']
  },
  {
    id: 'bogo_03',
    ciudadParent: 'Bogota',
    nombre: 'Zipaquira',
    descripcionCorta: 'Conoce la impresionante Catedral de Sal.',
    imagenes: [
"/sesion3_escapadas/Bogota/zipaquira/catedral_2_zipaquira.jpg",
"/sesion3_escapadas/Bogota/zipaquira/catedral_3_zipaquira.jpg",
"/sesion3_escapadas/Bogota/zipaquira/catedral_zipaquira.jpg",
"/sesion3_escapadas/Bogota/zipaquira/pueblo_1_zipaquira.jpg",
"/sesion3_escapadas/Bogota/zipaquira/pueblo_zipaquira.jpg",
"/sesion3_escapadas/Bogota/zipaquira/tren_zipaquira.jpg"
 ],
    informacionDetallada: 'Ubicada cerca de Bogotá, esta ciudad es mundialmente reconocida por su imponente Catedral de Sal, una maravilla arquitectónica construida bajo tierra en el interior de antiguas minas, símbolo de fe y cultura.',
    opcionesTransporte: ['Bus', 'Didi', 'Uber','Terminal de transporte']
  },

  {
    id: 'boya_01',
    ciudadParent: 'Boyaca',
    nombre: 'Mongui',
    descripcionCorta: 'Descubre la magia de uno de los pueblos más lindos de Colombia.',
    imagenes: [
"/sesion3_escapadas/Boyaca/mongui/mongui_1.jpg",
"/sesion3_escapadas/Boyaca/mongui/mongui_2.jpg",
"/sesion3_escapadas/Boyaca/mongui/mongui_3.jpg",
"/sesion3_escapadas/Boyaca/mongui/mongui_4.jpg",
"/sesion3_escapadas/Boyaca/mongui/mongui_5.jpg"
 ],
    informacionDetallada: 'Famoso por su arquitectura colonial del siglo XVII y su tradición en la fabricación de balones de fútbol. Rodeado de montañas, es el punto de partida ideal para explorar el impresionante Páramo de Ocetá y disfrutar de un ambiente tranquilo y auténtico.',
    opcionesTransporte: ['Bus', 'Didi', 'Uber','Terminal de transporte']
  },
  {
    id: 'boya_02',
    ciudadParent: 'Boyaca',
    nombre: 'Villa de Leyva',
    descripcionCorta:'Déjate cautivar por la joya colonial más emblemática de Boyacá.',
    imagenes: [
"/sesion3_escapadas/Boyaca/villa de leyva/Villa de Leyva_1.jpg",
"/sesion3_escapadas/Boyaca/villa de leyva/Villa de Leyva_2.jpg",
"/sesion3_escapadas/Boyaca/villa de leyva/Villa de Leyva_3.jpg",
"/sesion3_escapadas/Boyaca/villa de leyva/Villa de Leyva_4.jpg",
"/sesion3_escapadas/Boyaca/villa de leyva/Villa de Leyva_5.jpg"

    ],
    informacionDetallada: 'Declarado Monumento Nacional, este pueblo destaca por su inmensa Plaza Mayor y calles empedradas. Es un destino que combina historia, arquitectura colonial, artesanías y una vibrante cultura artística en el corazón del altiplano.',
    opcionesTransporte: ['Bus', 'Didi', 'Uber','Terminal de transporte']
  },
  {
    id: 'boya_03',
    ciudadParent: 'Boyaca',
    nombre: 'Raquira',
    descripcionCorta: 'Sumérgete en el colorido mundo de la artesanía boyacense.',
    imagenes: [
"/sesion3_escapadas/Boyaca/raquira/raquira_1.jpg",
"/sesion3_escapadas/Boyaca/raquira/raquira_2.jpg",
"/sesion3_escapadas/Boyaca/raquira/raquira_3.jpg",
"/sesion3_escapadas/Boyaca/raquira/raquira_4.jpg",
"/sesion3_escapadas/Boyaca/raquira/raquira_5.jpg",
"/sesion3_escapadas/Boyaca/raquira/raquira_6.jpg",
"/sesion3_escapadas/Boyaca/raquira/raquira_7.jpg"

    ],
    informacionDetallada: 'Conocida como la capital artesanal de Colombia, sus calles están llenas de talleres de cerámica con fachadas vibrantes. Es el lugar perfecto para apreciar el talento de los artesanos locales y adquirir piezas únicas trabajadas en arcilla.',
    opcionesTransporte: ['Bus', 'Didi', 'Uber','Terminal de transporte']
  },


  ]
  
  
  
  
