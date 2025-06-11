"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
exports.getDatabase = getDatabase;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
sqlite3_1.default.verbose();
let db = null;
async function initializeDatabase() {
    if (!db) {
        const dbPath = path.join(process.cwd(), 'electron', 'db', 'mydb.sqlite');
        console.log('Intentando abrir base de datos en:', dbPath);
        db = await (0, sqlite_1.open)({
            filename: dbPath,
            driver: sqlite3_1.default.Database
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
        }
        else {
            // Table exists, check if it needs migration
            const idColumn = tableInfo.find(col => col.name === 'id');
            if (idColumn && idColumn.type === 'INTEGER') {
                console.log('Migrando tabla usuario de INTEGER a TEXT para UUID...');
                // Clean up any existing temporary tables from previous failed migrations
                try {
                    await db.exec('DROP TABLE IF EXISTS usuario_new');
                    console.log('Tabla temporal anterior eliminada');
                }
                catch {
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
                    const usedUsernames = new Set();
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
                        }
                        catch (error) {
                            console.error(`Error migrando usuario ${user.usuario}:`, error);
                        }
                    }
                }
                // Drop old table and rename new one
                await db.exec('DROP TABLE usuario');
                await db.exec('ALTER TABLE usuario_new RENAME TO usuario');
                console.log('Migración completada exitosamente');
            }
            else {
                console.log('Tabla usuario ya tiene la estructura correcta');
            }
        }
    }
    return db;
}
async function getDatabase() {
    if (!db) {
        await initializeDatabase();
    }
    return db;
}
//# sourceMappingURL=database.js.map