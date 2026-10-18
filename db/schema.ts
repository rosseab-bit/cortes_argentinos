export const schemaSql = `
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS cortes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    zona TEXT NOT NULL CHECK (zona IN ('delantera', 'media', 'trasera', 'costado', 'cabeza')),
    textura TEXT,
    coccion TEXT,
    precio_ref TEXT,
    svg_id TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS usos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    corte_id INTEGER NOT NULL REFERENCES cortes(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    detalle TEXT NOT NULL,
    tiempo TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_cortes_nombre ON cortes(nombre COLLATE NOCASE);
  CREATE INDEX IF NOT EXISTS idx_usos_corte_id ON usos(corte_id);
`;
