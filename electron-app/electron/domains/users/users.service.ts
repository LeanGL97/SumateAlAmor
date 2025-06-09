import { getDatabase } from '../../db/database.js';
import { Usuario } from './users.model.js';
import { Database } from 'sqlite';

export async function getAllUsuarios(): Promise<Usuario[]> {
  try {
    const db = await getDatabase() as Database;
    const usuarios = await db.all('SELECT id, nombre, usuario, correo, telefono, direccion, rol FROM usuario') as Usuario[];
    return usuarios;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
}
