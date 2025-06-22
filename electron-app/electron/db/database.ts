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

    // Check if the users table exists and get its structure
    const tableInfo = await db.all("PRAGMA table_info(users)");
    
    if (tableInfo.length === 0) {
      // Table doesn't exist, create it with new schema
      console.log('Creando tabla users con nueva estructura...');
      await db.exec(`
        CREATE TABLE users (
          id TEXT PRIMARY KEY,
          fullName TEXT NOT NULL,
          searchName TEXT NOT NULL,
          mail TEXT,
          userName TEXT NOT NULL UNIQUE,
          address TEXT NOT NULL,
          phone TEXT NOT NULL,
          passwordHash TEXT NOT NULL,
          role TEXT CHECK (role IN ('Administrador', 'ServicioSocial', 'Albergue')) NOT NULL,
          deleted INTEGER DEFAULT 0
        )
      `);
      
      // Check if old usuario table exists and migrate data
      const oldTableInfo = await db.all("PRAGMA table_info(usuario)");
      if (oldTableInfo.length > 0) {
        console.log('Migrando datos de tabla usuario a users...');
        
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
              const searchName = (user.nombre + ' ' + uniqueUsername).toLowerCase().replace(/\s+/g, ' ').trim();
              
              await db.run(`
                INSERT INTO users (id, fullName, searchName, mail, userName, address, phone, passwordHash, role, deleted)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
              `, [newId, user.nombre, searchName, user.correo, uniqueUsername, user.direccion, user.telefono, user.password, user.rol]);
              
              if (uniqueUsername !== user.usuario) {
                console.log(`Usuario duplicado renombrado: ${user.usuario} -> ${uniqueUsername}`);
              }
            } catch (error) {
              console.error(`Error migrando usuario ${user.usuario}:`, error);
            }
          }
        }
        
        // Drop old table
        await db.exec('DROP TABLE usuario');
        console.log('Tabla usuario antigua eliminada');
      }
    } else {
      console.log('Tabla users ya existe con la estructura correcta');
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