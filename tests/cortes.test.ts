import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { closeDb, getDb } from "../lib/db";
import { getCorteBySlug, getCortes, searchCortes } from "../lib/cortes";
import { cortesSeed } from "../db/seed-data";
import { schemaSql } from "../db/schema";

const testDirectory = mkdtempSync(path.join(tmpdir(), "cortes-argentinos-"));
const databasePath = path.join(testDirectory, "cortes.db");
process.env.CORTES_DB_PATH = databasePath;

beforeAll(() => {
  const database = getDb();
  database.exec(schemaSql);
  const addCorte = database.prepare("INSERT INTO cortes (slug, nombre, descripcion, zona, textura, coccion, svg_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
  const addUso = database.prepare("INSERT INTO usos (corte_id, titulo, detalle, tiempo) VALUES (?, ?, ?, ?)");
  const seed = database.transaction(() => {
    for (const corte of cortesSeed) {
      const result = addCorte.run(corte.slug, corte.nombre, corte.descripcion, corte.zona, corte.textura, corte.coccion, corte.svg_id);
      for (const uso of corte.usos) addUso.run(result.lastInsertRowid, uso.titulo, uso.detalle, uso.tiempo);
    }
  });
  seed();
});

afterAll(() => {
  closeDb();
  rmSync(testDirectory, { recursive: true, force: true });
});

describe("consultas de cortes", () => {
  it("lista los cortes cargados ordenados por nombre", () => {
    const cortes = getCortes();
    expect(cortes).toHaveLength(cortesSeed.length);
    expect(cortes[0].nombre).toBe("Aguja");
  });

  it("devuelve un corte con sus usos", () => {
    const corte = getCorteBySlug("asado-de-tira");
    expect(corte?.nombre).toBe("Asado de tira");
    expect(corte?.usos.length).toBeGreaterThanOrEqual(2);
    expect(corte?.usos[0].tiempo).toBeTruthy();
  });

  it("filtra por nombre sin distinguir mayúsculas", () => {
    expect(searchCortes("BIFE").map(({ nombre }) => nombre)).toEqual(["Bife ancho", "Bife angosto", "Bife de chorizo"]);
  });

  it("escapa comodines de búsqueda", () => {
    expect(searchCortes("%").map(({ nombre }) => nombre)).toEqual([]);
  });
});

describe("API de cortes", () => {
  it("responde el listado y permite filtrar por nombre", async () => {
    const { GET } = await import("../app/api/cortes/route");
    const response = GET(new Request("http://localhost/api/cortes?q=nalga"));
    const body = (await response.json()) as { cortes: Array<{ nombre: string }> };
    expect(response.status).toBe(200);
    expect(body.cortes.map(({ nombre }) => nombre)).toEqual(["Nalga", "Tapa de nalga"]);
  });

  it("responde el detalle y un 404 para un slug inexistente", async () => {
    const { GET } = await import("../app/api/cortes/[slug]/route");
    const found = await GET(new Request("http://localhost/api/cortes/lomo"), { params: Promise.resolve({ slug: "lomo" }) });
    const foundBody = (await found.json()) as { corte: { usos: unknown[] } };
    expect(found.status).toBe(200);
    expect(foundBody.corte.usos.length).toBeGreaterThanOrEqual(2);
    const missing = await GET(new Request("http://localhost/api/cortes/no-existe"), { params: Promise.resolve({ slug: "no-existe" }) });
    expect(missing.status).toBe(404);
  });
});
