import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
sqlite3.verbose();
export const db = await open({
    filename: './mydb.sqlite',
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
//# sourceMappingURL=database.js.map