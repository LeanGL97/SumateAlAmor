import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import * as path from 'path';
import * as crypto from 'crypto';

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

    // Check if the table exists and get its structure
    const tableInfo = await db.all("PRAGMA table_info(usuario)");
    
    if (tableInfo.length === 0) {
      // Table doesn't exist, create it with new schema
      console.log('Creando tabla usuario con nueva estructura...');
      await db.exec(`
        CREATE TABLE usuario (
          id TEXT PRIMARY KEY,
          nombre TEXT NOT NULL,
          usuario TEXT NOT NULL UNIQUE,
          correo TEXT,
          telefono TEXT NOT NULL,
          direccion TEXT NOT NULL,
          password TEXT NOT NULL,
          rol TEXT CHECK (rol IN ('Administrador', 'ServicioSocial', 'Albergue')) NOT NULL
        )
      `);
    } else {
      // Table exists, check if it needs migration
      const idColumn = tableInfo.find(col => col.name === 'id');
      if (idColumn && idColumn.type === 'INTEGER') {
        console.log('Migrando tabla usuario de INTEGER a TEXT para UUID...');
        
        // Clean up any existing temporary tables from previous failed migrations
        try {
          await db.exec('DROP TABLE IF EXISTS usuario_new');
          console.log('Tabla temporal anterior eliminada');
        } catch {
          console.log('No había tabla temporal que limpiar');
        }
        
        // Create new table with correct structure
        await db.exec(`
          CREATE TABLE usuario_new (
            id TEXT PRIMARY KEY,
            nombre TEXT NOT NULL,
            usuario TEXT NOT NULL UNIQUE,
            correo TEXT,
            telefono TEXT NOT NULL,
            direccion TEXT NOT NULL,
            password TEXT NOT NULL,
            rol TEXT CHECK (rol IN ('Administrador', 'ServicioSocial', 'Albergue')) NOT NULL
          )
        `);
        
        // Copy existing data (if any) with new UUIDs and handle duplicates
        const existingUsers = await db.all('SELECT * FROM usuario ORDER BY id');
        if (existingUsers.length > 0) {
          console.log(`Migrando ${existingUsers.length} usuarios existentes...`);
          
          const usedUsernames = new Set<string>();
          
          for (const user of existingUsers) {
            const newId = crypto.randomUUID();
            
            // Handle duplicate usernames by adding a suffix
            let uniqueUsername = user.usuario;
            let counter = 1;
            while (usedUsernames.has(uniqueUsername)) {
              uniqueUsername = `${user.usuario}_${counter}`;
              counter++;
            }
            usedUsernames.add(uniqueUsername);
            
            try {
              await db.run(`
                INSERT INTO usuario_new (id, nombre, correo, usuario, direccion, telefono, password, rol)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
              `, [newId, user.nombre, user.correo, uniqueUsername, user.direccion, user.telefono, user.password, user.rol]);
              
              if (uniqueUsername !== user.usuario) {
                console.log(`Usuario duplicado renombrado: ${user.usuario} -> ${uniqueUsername}`);
              }
            } catch (error) {
              console.error(`Error migrando usuario ${user.usuario}:`, error);
            }
          }
        }
        
        // Drop old table and rename new one
        await db.exec('DROP TABLE usuario');
        await db.exec('ALTER TABLE usuario_new RENAME TO usuario');
        console.log('Migración completada exitosamente');
      } else {
        console.log('Tabla usuario ya tiene la estructura correcta');
      }
    }
  }
  return db;
}

export async function getDatabase(): Promise<Database> {
  if (!db) {
    await initializeDatabase();
  }
  return db as Database;
}