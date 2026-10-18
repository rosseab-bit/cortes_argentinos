import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { schemaSql } from "../db/schema";

const databaseSymbol = Symbol.for("cortes-argentinos.database");
type DatabaseGlobal = typeof globalThis & { [databaseSymbol]?: Database.Database };

function databasePath(): string {
  const configuredPath = process.env.CORTES_DB_PATH;
  if (!configuredPath) return path.join(process.cwd(), "data", "cortes.db");
  if (!path.isAbsolute(configuredPath)) {
    throw new Error("CORTES_DB_PATH debe ser una ruta absoluta.");
  }
  return configuredPath;
}

export function getDb(): Database.Database {
  const globalWithDatabase = globalThis as DatabaseGlobal;
  if (!globalWithDatabase[databaseSymbol]) {
    const filePath = databasePath();
    mkdirSync(path.dirname(filePath), { recursive: true });
    const database = new Database(filePath);
    database.pragma("journal_mode = WAL");
    database.pragma("foreign_keys = ON");
    database.exec(schemaSql);
    globalWithDatabase[databaseSymbol] = database;
  }
  return globalWithDatabase[databaseSymbol];
}

export function closeDb(): void {
  const globalWithDatabase = globalThis as DatabaseGlobal;
  globalWithDatabase[databaseSymbol]?.close();
  delete globalWithDatabase[databaseSymbol];
}
