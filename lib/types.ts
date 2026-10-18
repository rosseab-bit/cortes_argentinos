export const zonas = ["delantera", "media", "trasera", "costado", "cabeza"] as const;

export type Zona = (typeof zonas)[number];

export type Uso = {
  id: number;
  titulo: string;
  detalle: string;
  tiempo: string | null;
};

export type Corte = {
  id: number;
  slug: string;
  nombre: string;
  descripcion: string;
  zona: Zona;
  textura: string | null;
  coccion: string | null;
  precio_ref: string | null;
  svg_id: string;
};

export type CorteDetalle = Corte & { usos: Uso[] };
