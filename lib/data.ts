const u = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export type Dish = {
  name: string;
  hanzi: string;
  desc: string;
  price: string;
  img: string;
  alt: string;
};

export const signatureDishes: Dish[] = [
  {
    name: "Pato laqueado 48 horas",
    hanzi: "鸭",
    desc: "Curado dos días, laqueado con miel de azahar y servido en rebanadas finas con crepas de cebollín.",
    price: "$425",
    img: u("photo-1504674900247-0877df9cc836", 1400),
    alt: "Rebanadas de pato laqueado servidas en plato hondo con hierbas frescas",
  },
  {
    name: "Dumplings de la casa",
    hanzi: "饺",
    desc: "Plegados a mano cada mañana. Cerdo con jengibre, camarón con bambú o setas con col china.",
    price: "$185",
    img: u("photo-1563245372-f21724e3856d", 1400),
    alt: "Baos al vapor dentro de vaporeras de bambú en un comedor con poca luz",
  },
  {
    name: "Estofado rojo de Sichuan",
    hanzi: "辣",
    desc: "Res cocida lenta en chile seco, pimienta de Sichuan y pasta de frijol fermentado. Pica y abraza.",
    price: "$295",
    img: u("photo-1455619452474-d2be8b1e70cd", 1400),
    alt: "Estofado rojo brillante con chiles secos sobre mesa de madera negra",
  },
  {
    name: "Fideos estirados a mano",
    hanzi: "面",
    desc: "La masa se estira frente a ti. Salteados al wok con res, cebollín tostado y aceite de chile.",
    price: "$215",
    img: u("photo-1612927601601-6638404737ce", 1400),
    alt: "Tazón negro de fideos estirados con chile, huevo y cebollín",
  },
];

export const menuDishes: Dish[] = [
  {
    name: "Xiaolongbao",
    hanzi: "包",
    desc: "Ocho piezas rellenas de caldo de cerdo. Se comen con cuchara y paciencia.",
    price: "$165",
    img: u("photo-1518983546435-91f8b87fe561", 1200),
    alt: "Xiaolongbao recién hechos dentro de una vaporera de bambú",
  },
  {
    name: "Arroz del wok",
    hanzi: "饭",
    desc: "Arroz de jazmín salteado a fuego altísimo con camarón seco y huevo.",
    price: "$145",
    img: u("photo-1512058564366-18510be2db19", 1200),
    alt: "Arroz salteado con camarones y limón en sartén negro",
  },
  {
    name: "Sopa de camarón",
    hanzi: "汤",
    desc: "Caldo claro de doce horas, camarón del día, fideo de huevo y chícharo chino.",
    price: "$175",
    img: u("photo-1569718212165-3a8278d5f624", 1200),
    alt: "Sopa de fideos con camarones, huevo cocido y verduras",
  },
  {
    name: "Jiaozi al vapor",
    hanzi: "蒸",
    desc: "Seis piezas de masa delgada con cerdo y jengibre, ajonjolí negro por encima.",
    price: "$135",
    img: u("photo-1496116218417-1a781b1c416c", 1200),
    alt: "Jiaozi al vapor con ajonjolí negro servidos en plato de madera",
  },
  {
    name: "Fideos fríos picantes",
    hanzi: "凉",
    desc: "Fideo de trigo, aceite de chile de árbol, cacahuate y vinagre negro de Chinkiang.",
    price: "$155",
    img: u("photo-1555126634-323283e090fa", 1200),
    alt: "Tazón de fideos en caldo rojo picante con hierbas frescas",
  },
  {
    name: "Té oolong de la casa",
    hanzi: "茶",
    desc: "Hojas tostadas en casa, tres infusiones en la misma mesa. Cierra cualquier comida.",
    price: "$85",
    img: u("photo-1541696490-8744a5dc0228", 1200),
    alt: "Vaso de té oolong recién servido sobre mesa de mármol",
  },
];

export const storyImages = {
  fire: {
    img: u("photo-1603088549155-6ae9395b928f", 1800),
    alt: "Brasas y humo sobre una parrilla callejera con brochetas de res",
  },
  hands: {
    img: u("photo-1526318896980-cf78c088247c", 1200),
    alt: "Mano levantando fideos con palillos sobre fondo negro",
  },
};

export const heroImage = {
  img: u("photo-1585032226651-759b368d7246", 1800),
  alt: "Plato de fideos salteados con palillos sobre fondo negro",
};

export const reserveImage = {
  img: u("photo-1414235077428-338989a2e8c0", 1600),
  alt: "Mesa servida con copas y velas en un comedor de noche",
};

export const testimonials = [
  {
    quote:
      "El pato se deshace antes de llegar a la mesa. Pedimos un segundo sin pensarlo dos veces.",
    name: "Renata Olvera",
    role: "Vecina de la Roma",
  },
  {
    quote:
      "Crecí comiendo dim sum en el barrio chino de Dolores y estos dumplings me regresaron ahí.",
    name: "Joaquín Sandoval",
    role: "Fotógrafo gastronómico",
  },
  {
    quote:
      "Vine por una cena rápida y me quedé tres horas. El wok no deja de sonar y eso se agradece.",
    name: "Mariel Castañeda",
    role: "Crítica en revista Sobremesa",
  },
];

export const faqs = [
  {
    q: "¿Necesito reservar?",
    a: "De jueves a sábado por la noche, sí: el comedor se llena rápido. La barra del wok siempre recibe sin reserva, por orden de llegada.",
  },
  {
    q: "¿Tienen opciones vegetarianas o veganas?",
    a: "Sí. El mapo tofu se prepara vegano, hay dumplings de setas con col china y casi todos los salteados pueden hacerse sin proteína animal. Avísanos al ordenar.",
  },
  {
    q: "¿Cómo manejan alergias?",
    a: "Nuestra cocina trabaja con soya, ajonjolí, cacahuate y mariscos todos los días. Cuéntanos tu alergia al reservar y el equipo adapta el menú o te dice con honestidad qué plato evitar.",
  },
  {
    q: "¿Hay estacionamiento?",
    a: "Ofrecemos valet de jueves a sábado a partir de las 19:00. El resto de la semana hay un estacionamiento público a una cuadra, sobre Orizaba.",
  },
  {
    q: "¿Hacen entregas a domicilio?",
    a: "Entregamos en Roma, Condesa y Juárez directamente desde nuestra web. Los dumplings viajan en vaporera de bambú para que lleguen calientes.",
  },
  {
    q: "¿Puedo hacer un evento privado?",
    a: "El comedor trasero recibe hasta 14 personas con menú degustación a la medida. Escríbenos con al menos una semana de anticipación.",
  },
];

export const info = {
  address: "Orizaba 161, Roma Norte, CDMX",
  phone: "55 4821 7736",
  hours: [
    { days: "Martes a domingo", time: "13:30 a 23:00" },
    { days: "Lunes", time: "Cerrado" },
  ],
};
