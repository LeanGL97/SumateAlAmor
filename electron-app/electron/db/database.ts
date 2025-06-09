import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import * as path from 'path';

sqlite3.verbose();

let db: Database | null = null;

export async function initializeDatabase(): Promise<Database> {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'electron', 'db', 'mydb.sqlite');
    console.log('Intentando abrir base de datos en:', dbPath);
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        usuario TEXT NOT NULL,
        correo TEXT,
        telefono TEXT NOT NULL,
        direccion TEXT NOT NULL,
        password TEXT NOT NULL,
        rol TEXT CHECK (rol IN ('Administrador', 'ServicioSocial', 'Albergue')) NOT NULL
      )
    `);
  }
  return db;
}

export async function getDatabase(): Promise<Database> {
  if (!db) {
    await initializeDatabase();
  }
  return db as Database;
}