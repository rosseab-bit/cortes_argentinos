import { getDb } from "../lib/db";
import { cortesSeed } from "./seed-data";

const database = getDb();
const insertCorte = database.prepare(`
  INSERT INTO cortes (slug, nombre, descripcion, zona, textura, coccion, precio_ref, svg_id)
  VALUES (@slug, @nombre, @descripcion, @zona, @textura, @coccion, NULL, @svg_id)
`);
const insertUso = database.prepare(`
  INSERT INTO usos (corte_id, titulo, detalle, tiempo)
  VALUES (@corteId, @titulo, @detalle, @tiempo)
`);

const seed = database.transaction(() => {
  database.prepare("DELETE FROM usos").run();
  database.prepare("DELETE FROM cortes").run();
  for (const corte of cortesSeed) {
    const { lastInsertRowid } = insertCorte.run(corte);
    for (const uso of corte.usos) insertUso.run({ corteId: lastInsertRowid, ...uso });
  }
});

seed();
console.info(`Seed completado: ${cortesSeed.length} cortes cargados en la base de datos.`);
database.close();
