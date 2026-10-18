import type Database from "better-sqlite3";
import { getDb } from "./db";
import type { Corte, CorteDetalle, Uso, Zona } from "./types";

type CorteRow = Omit<Corte, "zona"> & { zona: string };

function toCorte(row: CorteRow): Corte {
  return { ...row, zona: row.zona as Zona };
}

export function getCortes(database: Database.Database = getDb()): Corte[] {
  const rows = database
    .prepare("SELECT id, slug, nombre, descripcion, zona, textura, coccion, precio_ref, svg_id FROM cortes ORDER BY nombre COLLATE NOCASE")
    .all() as CorteRow[];
  return rows.map(toCorte);
}

export function getCorteBySlug(slug: string, database: Database.Database = getDb()): CorteDetalle | undefined {
  const row = database
    .prepare("SELECT id, slug, nombre, descripcion, zona, textura, coccion, precio_ref, svg_id FROM cortes WHERE slug = ?")
    .get(slug) as CorteRow | undefined;
  if (!row) return undefined;

  const usos = database
    .prepare("SELECT id, titulo, detalle, tiempo FROM usos WHERE corte_id = ? ORDER BY id")
    .all(row.id) as Uso[];
  return { ...toCorte(row), usos };
}

export function searchCortes(query: string, database: Database.Database = getDb()): Corte[] {
  const normalized = query.trim();
  if (!normalized) return getCortes(database);
  const rows = database
    .prepare("SELECT id, slug, nombre, descripcion, zona, textura, coccion, precio_ref, svg_id FROM cortes WHERE nombre LIKE ? ESCAPE '\\' ORDER BY nombre COLLATE NOCASE")
    .all(`%${normalized.replace(/[\\%_]/g, "\\$&")}%`) as CorteRow[];
  return rows.map(toCorte);
}
