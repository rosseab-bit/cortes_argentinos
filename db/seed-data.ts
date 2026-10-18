import type { Zona } from "../lib/types";

export type CorteSeed = {
  slug: string;
  nombre: string;
  descripcion: string;
  zona: Zona;
  textura: string;
  coccion: string;
  svg_id: string;
  usos: Array<{ titulo: string; detalle: string; tiempo: string }>;
};

export const cortesSeed: CorteSeed[] = [
  {
    slug: "garron",
    nombre: "Garrón",
    descripcion: "Músculo de la parte baja de las patas, muy trabajado y rico en colágeno. Se luce cuando se cocina despacio y con líquido.",
    zona: "delantera",
    textura: "Firme, con fibras y mucho colágeno",
    coccion: "Guisos y cocciones largas",
    svg_id: "corte-garron",
    usos: [
      { titulo: "Osobuco braseado", detalle: "Dorar las rodajas y cocinarlas tapadas con vegetales, caldo y vino hasta que estén tiernas.", tiempo: "2 h 30 min" },
      { titulo: "Puchero", detalle: "Sumarlo a la olla con agua fría y verduras; mantener un hervor suave para obtener un caldo sabroso.", tiempo: "2 h" }
    ]
  },
  {
    slug: "brazuelo",
    nombre: "Brazuelo",
    descripcion: "Corte de la parte superior de la pata delantera. Tiene tejido conectivo y sabor profundo, ideal para preparaciones húmedas.",
    zona: "delantera",
    textura: "Fibrosa y gelatinosa",
    coccion: "Braseado, olla y guiso",
    svg_id: "corte-brazuelo",
    usos: [
      { titulo: "Estofado de brazuelo", detalle: "Cocinar en cubos con tomate, cebolla y hierbas hasta que la carne se desarme fácilmente.", tiempo: "2 h" },
      { titulo: "Carne desmechada", detalle: "Brasear tapado con caldo y usar la carne tibia en empanadas o sándwiches.", tiempo: "2 h 30 min" }
    ]
  },
  {
    slug: "paleta",
    nombre: "Paleta",
    descripcion: "Corte amplio del cuarto delantero, ubicado sobre la escápula. Es versátil y suele venderse entero o en bifes.",
    zona: "delantera",
    textura: "Firme, de grano medio",
    coccion: "Plancha, horno y olla",
    svg_id: "corte-paleta",
    usos: [
      { titulo: "Bifes a la plancha", detalle: "Cortar contra la fibra, cocinar en plancha muy caliente y dejar reposar antes de servir.", tiempo: "8-10 min" },
      { titulo: "Paleta al horno", detalle: "Hornear en una fuente tapada con vegetales y un fondo de caldo hasta que quede tierna.", tiempo: "1 h 40 min" }
    ]
  },
  {
    slug: "cogote",
    nombre: "Cogote",
    descripcion: "Carne de la zona del cuello, de fibras marcadas y sabor intenso. Su contenido de colágeno mejora con una cocción prolongada.",
    zona: "delantera",
    textura: "Firme y sabrosa",
    coccion: "Guisos y cocción lenta",
    svg_id: "corte-cogote",
    usos: [
      { titulo: "Guiso de cogote", detalle: "Cortar en porciones y cocinar lentamente con legumbres, verduras y pimentón.", tiempo: "2 h" },
      { titulo: "Ragú para pastas", detalle: "Brasear con tomate y vino; desmenuzar la carne y mezclarla con la salsa.", tiempo: "2 h 30 min" }
    ]
  },
  {
    slug: "aguja",
    nombre: "Aguja",
    descripcion: "Corte delantero situado junto al cogote y el roast beef. Tiene buen sabor y una proporción equilibrada de grasa.",
    zona: "delantera",
    textura: "Tierna, con grasa entreverada",
    coccion: "Parrilla, plancha y guiso",
    svg_id: "corte-aguja",
    usos: [
      { titulo: "Aguja a la parrilla", detalle: "Asar en bifes gruesos sobre brasas medias y salar al final.", tiempo: "12-16 min" },
      { titulo: "Hamburguesas caseras", detalle: "Picar una vez, formar sin compactar demasiado y cocinar hasta el punto deseado.", tiempo: "10-12 min" }
    ]
  },
  {
    slug: "tapa-de-asado",
    nombre: "Tapa de asado",
    descripcion: "Músculo que cubre la parte superior del asado. Una capa de grasa protege la carne durante la cocción lenta.",
    zona: "delantera",
    textura: "Firme, con una cubierta de grasa",
    coccion: "Parrilla y horno",
    svg_id: "corte-tapa-de-asado",
    usos: [
      { titulo: "A la parrilla", detalle: "Cocinar primero del lado de la grasa a fuego moderado para que se funda lentamente.", tiempo: "1 h 20 min" },
      { titulo: "Tapa de asado al horno", detalle: "Hornear cubierta con papel aluminio y retirar la cobertura al final para dorar.", tiempo: "1 h 30 min" }
    ]
  },
  {
    slug: "costilla",
    nombre: "Costilla",
    descripcion: "Porción de carne adherida a las costillas del cuarto delantero. Combina carne, hueso y grasa que aportan mucho sabor.",
    zona: "delantera",
    textura: "Jugosa, con hueso y grasa",
    coccion: "Parrilla y horno",
    svg_id: "corte-costilla",
    usos: [
      { titulo: "Costilla a las brasas", detalle: "Asar con el hueso hacia el fuego y dar vuelta cuando la superficie comience a dorarse.", tiempo: "35-50 min" },
      { titulo: "Costilla al horno", detalle: "Cocinar tapada a temperatura media y destapar al final para gratinar.", tiempo: "1 h 15 min" }
    ]
  },
  {
    slug: "asado-de-tira",
    nombre: "Asado de tira",
    descripcion: "Costillas cortadas transversalmente en tiras. Es uno de los cortes más tradicionales de la parrilla argentina.",
    zona: "media",
    textura: "Jugosa, con hueso y grasa",
    coccion: "Parrilla",
    svg_id: "corte-asado-de-tira",
    usos: [
      { titulo: "A la parrilla", detalle: "Asar primero del lado del hueso, sobre brasas moderadas, y terminar del lado de la carne.", tiempo: "35-50 min" },
      { titulo: "Asado al horno", detalle: "Hornear en una fuente con un poco de líquido y terminar destapado para dorar.", tiempo: "1 h 10 min" }
    ]
  },
  {
    slug: "vacio",
    nombre: "Vacío",
    descripcion: "Corte del costillar ubicado entre las costillas y la cadera. Su membrana y grasa ayudan a conservar los jugos.",
    zona: "media",
    textura: "Fibrosa y jugosa",
    coccion: "Parrilla y horno",
    svg_id: "corte-vacio",
    usos: [
      { titulo: "Vacío a la parrilla", detalle: "Cocinar a fuego medio, primero del lado de la grasa y sin pinchar la pieza.", tiempo: "1 h 20 min" },
      { titulo: "Vacío al horno", detalle: "Hornear entero con la membrana hacia arriba y dejar reposar antes de cortar contra la fibra.", tiempo: "1 h 30 min" }
    ]
  },
  {
    slug: "entrana",
    nombre: "Entraña",
    descripcion: "Músculo fino que recubre el diafragma. Tiene sabor marcado y una membrana característica que puede retirarse antes de cocinar.",
    zona: "media",
    textura: "Tierna, de fibra larga",
    coccion: "Parrilla y plancha",
    svg_id: "corte-entrana",
    usos: [
      { titulo: "Entraña a las brasas", detalle: "Asar rápidamente sobre fuego fuerte, vuelta y vuelta, para mantenerla jugosa.", tiempo: "8-12 min" },
      { titulo: "Entraña a la plancha", detalle: "Cocinar en una plancha bien caliente y cortar en tiras finas contra la fibra.", tiempo: "6-8 min" }
    ]
  },
  {
    slug: "bife-angosto",
    nombre: "Bife angosto",
    descripcion: "Corte del lomo bajo que incluye el músculo y, según el desposte, puede conservar parte del hueso y la tapa.",
    zona: "media",
    textura: "Tierna y magra",
    coccion: "Parrilla y plancha",
    svg_id: "corte-bife-angosto",
    usos: [
      { titulo: "Bife a la parrilla", detalle: "Cocinar en bifes de buen grosor y dar vuelta una sola vez para conservar los jugos.", tiempo: "8-14 min" },
      { titulo: "Bife a la plancha", detalle: "Sellar en una plancha precalentada y salar al retirar.", tiempo: "6-10 min" }
    ]
  },
  {
    slug: "lomo",
    nombre: "Lomo",
    descripcion: "Músculo interno de la región lumbar, protegido y poco ejercitado. Es el corte más tierno y de sabor delicado.",
    zona: "media",
    textura: "Muy tierna y magra",
    coccion: "Plancha, parrilla y horno",
    svg_id: "corte-lomo",
    usos: [
      { titulo: "Medallones de lomo", detalle: "Sellar los medallones a fuego fuerte y terminar al punto elegido; dejar reposar.", tiempo: "8-12 min" },
      { titulo: "Lomo al horno", detalle: "Dorar la pieza entera, hornear brevemente y reposar antes de cortar.", tiempo: "25-35 min" }
    ]
  },
  {
    slug: "bife-ancho",
    nombre: "Bife ancho",
    descripcion: "Corte del lomo alto, reconocido por su ojo de bife y vetas de grasa que aportan sabor y jugosidad.",
    zona: "media",
    textura: "Tierna y marmolada",
    coccion: "Parrilla y plancha",
    svg_id: "corte-bife-ancho",
    usos: [
      { titulo: "Bife ancho a la parrilla", detalle: "Asar en bifes gruesos sobre brasas vivas y dejar reposar unos minutos.", tiempo: "10-16 min" },
      { titulo: "Ojo de bife a la plancha", detalle: "Sellar por ambas caras y terminar a fuego medio para lograr el punto buscado.", tiempo: "8-12 min" }
    ]
  },
  {
    slug: "cuadril",
    nombre: "Cuadril",
    descripcion: "Corte de la cadera, magro y de grano fino. Puede prepararse entero, en bifes o en porciones para milanesas.",
    zona: "trasera",
    textura: "Magra y tierna",
    coccion: "Parrilla, horno y plancha",
    svg_id: "corte-cuadril",
    usos: [
      { titulo: "Bifes de cuadril", detalle: "Cocinar a fuego fuerte en plancha o parrilla, sin sobrecocinar para preservar la terneza.", tiempo: "6-10 min" },
      { titulo: "Cuadril al horno", detalle: "Dorar la pieza entera y hornear con vegetales; reposar y cortar en fetas.", tiempo: "45-60 min" }
    ]
  },
  {
    slug: "colita-de-cuadril",
    nombre: "Colita de cuadril",
    descripcion: "Pieza triangular de la parte posterior del cuadril. Resulta tierna, pareja y cómoda para cocinar entera.",
    zona: "trasera",
    textura: "Magra y tierna",
    coccion: "Horno y parrilla",
    svg_id: "corte-colita-de-cuadril",
    usos: [
      { titulo: "Colita al horno", detalle: "Sellar la pieza y hornear con papas; dejar reposar y cortar en fetas finas.", tiempo: "45-55 min" },
      { titulo: "A la parrilla", detalle: "Asar entera a fuego medio, girándola para dorar de manera pareja.", tiempo: "40-55 min" }
    ]
  },
  {
    slug: "nalga",
    nombre: "Nalga",
    descripcion: "Músculo grande y magro del cuarto trasero. Su forma regular permite obtener fetas parejas y finas.",
    zona: "trasera",
    textura: "Magra, de grano fino",
    coccion: "Milanesas y plancha",
    svg_id: "corte-nalga",
    usos: [
      { titulo: "Milanesas de nalga", detalle: "Cortar fetas finas, pasar por huevo y pan rallado, y cocinar hasta dorar.", tiempo: "10-15 min" },
      { titulo: "Escalopes", detalle: "Pasar bifes finos por harina y cocinarlos brevemente con una salsa ligera.", tiempo: "8-10 min" }
    ]
  },
  {
    slug: "bola-de-lomo",
    nombre: "Bola de lomo",
    descripcion: "Corte redondeado de la parte delantera de la pierna trasera. Es magro, parejo y rendidor para milanesas.",
    zona: "trasera",
    textura: "Magra y compacta",
    coccion: "Milanesas, plancha y horno",
    svg_id: "corte-bola-de-lomo",
    usos: [
      { titulo: "Milanesas", detalle: "Cortar transversalmente en fetas, empanar y cocinar en horno o fritura moderada.", tiempo: "12-18 min" },
      { titulo: "Bifes a la plancha", detalle: "Marinar brevemente y cocinar a fuego fuerte para que no se sequen.", tiempo: "6-8 min" }
    ]
  },
  {
    slug: "peceto",
    nombre: "Peceto",
    descripcion: "Músculo cilíndrico y muy magro de la cara posterior de la pierna. Se cocina entero para mantener una forma uniforme.",
    zona: "trasera",
    textura: "Muy magra y firme",
    coccion: "Hervido, horno y olla",
    svg_id: "corte-peceto",
    usos: [
      { titulo: "Vitel toné", detalle: "Hervir suavemente con verduras, enfriar dentro del caldo y cortar en fetas finas.", tiempo: "1 h 20 min" },
      { titulo: "Peceto al horno", detalle: "Dorar la pieza y hornearla con caldo; reposar antes de cortar para que no pierda jugos.", tiempo: "50-65 min" }
    ]
  },
  {
    slug: "tapa-de-nalga",
    nombre: "Tapa de nalga",
    descripcion: "Músculo superficial que cubre parte de la nalga. Tiene forma amplia y suele aprovecharse en milanesas y rellenos.",
    zona: "trasera",
    textura: "Magra y algo firme",
    coccion: "Milanesas y horno",
    svg_id: "corte-tapa-de-nalga",
    usos: [
      { titulo: "Milanesas de tapa de nalga", detalle: "Cortar fetas parejas, tiernizar ligeramente, empanar y cocinar hasta dorar.", tiempo: "12-16 min" },
      { titulo: "Tapa rellena", detalle: "Rellenar la pieza abierta, arrollar y cocinar al horno con un fondo de verduras.", tiempo: "1 h 15 min" }
    ]
  },
  {
    slug: "garron-trasero",
    nombre: "Garrón trasero",
    descripcion: "Parte baja de la pata posterior. Su hueso y colágeno dan cuerpo a caldos y preparaciones largas.",
    zona: "trasera",
    textura: "Firme y gelatinosa",
    coccion: "Olla y cocción lenta",
    svg_id: "corte-garron-trasero",
    usos: [
      { titulo: "Osobuco al tuco", detalle: "Dorar las rodajas y cocinarlas a fuego bajo en salsa de tomate hasta que estén tiernas.", tiempo: "2 h 30 min" },
      { titulo: "Caldo de carne", detalle: "Hervir suavemente con verduras y hierbas; colar y desgrasar antes de usar.", tiempo: "2 h" }
    ]
  },
  {
    slug: "matambre",
    nombre: "Matambre",
    descripcion: "Lámina delgada de carne ubicada entre el cuero y las costillas. Se cocina arrollada o extendida a la parrilla.",
    zona: "costado",
    textura: "Fina, con fibras marcadas",
    coccion: "Parrilla, horno y hervor",
    svg_id: "corte-matambre",
    usos: [
      { titulo: "Matambre a la pizza", detalle: "Tiernizar, dorar a la parrilla o al horno y cubrir con tomate y queso.", tiempo: "45-60 min" },
      { titulo: "Matambre arrollado", detalle: "Rellenar con vegetales y huevo, enrollar y hervir suavemente hasta que esté cocido.", tiempo: "1 h 30 min" }
    ]
  },
  {
    slug: "falda",
    nombre: "Falda",
    descripcion: "Corte de la parte baja del pecho y el costillar, con hueso y tejido conectivo. Aporta sabor a guisos y caldos.",
    zona: "costado",
    textura: "Firme y sabrosa",
    coccion: "Puchero, guiso y braseado",
    svg_id: "corte-falda",
    usos: [
      { titulo: "Falda al horno", detalle: "Cocinar tapada con vegetales y caldo hasta que la carne se desprenda con facilidad.", tiempo: "1 h 45 min" },
      { titulo: "Puchero", detalle: "Agregar a la olla con agua fría y verduras; mantener una cocción suave.", tiempo: "2 h" }
    ]
  },
  {
    slug: "bife-de-chorizo",
    nombre: "Bife de chorizo",
    descripcion: "Bife deshuesado del lomo bajo, con una capa externa de grasa que protege la carne y suma sabor.",
    zona: "costado",
    textura: "Tierna y jugosa",
    coccion: "Parrilla y plancha",
    svg_id: "corte-bife-de-chorizo",
    usos: [
      { titulo: "A la parrilla", detalle: "Cocinar bifes gruesos primero del lado de la grasa y terminar del otro lado.", tiempo: "10-14 min" },
      { titulo: "A la plancha", detalle: "Sellar sobre una superficie muy caliente y dejar reposar antes de servir.", tiempo: "8-12 min" }
    ]
  },
  {
    slug: "lengua",
    nombre: "Lengua",
    descripcion: "Músculo de la cavidad bucal. Requiere una cocción previa prolongada para retirar la piel y lograr una textura tierna.",
    zona: "cabeza",
    textura: "Compacta y tierna después de cocinar",
    coccion: "Hervida, escabeche y parrilla",
    svg_id: "corte-lengua",
    usos: [
      { titulo: "Lengua a la vinagreta", detalle: "Hervir con aromáticos, pelar mientras está tibia y servir en fetas con vinagreta.", tiempo: "2 h" },
      { titulo: "Lengua al escabeche", detalle: "Cocinar, pelar y conservar en una mezcla de vinagre, aceite y vegetales.", tiempo: "2 h 15 min" }
    ]
  },
  {
    slug: "cola",
    nombre: "Cola",
    descripcion: "Conjunto de vértebras y carne de la cola. Es un corte sabroso que aporta gelatina a las cocciones lentas.",
    zona: "cabeza",
    textura: "Firme, con hueso y gelatina",
    coccion: "Guiso y braseado",
    svg_id: "corte-cola",
    usos: [
      { titulo: "Rabo guisado", detalle: "Dorar las piezas y estofar con vino, tomate y vegetales hasta que se desprendan del hueso.", tiempo: "3 h" },
      { titulo: "Caldo de cola", detalle: "Cocinar a hervor bajo con verduras y hierbas para obtener un caldo intenso.", tiempo: "2 h 30 min" }
    ]
  },
  {
    slug: "osobuco",
    nombre: "Osobuco",
    descripcion: "Rodaja transversal de la pata con hueso central y médula. Es un corte clásico para cocciones largas.",
    zona: "cabeza",
    textura: "Firme, con colágeno y médula",
    coccion: "Braseado y guiso",
    svg_id: "corte-osobuco",
    usos: [
      { titulo: "Osobuco a la milanesa", detalle: "Enharinar las rodajas, dorarlas y brasearlas en una salsa de vegetales y vino.", tiempo: "2 h 30 min" },
      { titulo: "Risotto con osobuco", detalle: "Cocinar lentamente la carne con tomate hasta que quede tierna y servir sobre risotto.", tiempo: "2 h 45 min" }
    ]
  }
];
