import { db } from '../../db/database.js';
import { Usuario } from './users.model.js';

export async function getAllUsuarios(): Promise<Usuario[]> {
//   const usuarios = await db.all<Usuario[]>('SELECT * FROM usuario');
    const usuarios = await db.all<Usuario[]>('SELECT id, nombre, usuario, correo, telefono, direccion, rol FROM usuario'); //Filtrar contraseña
  return usuarios;
}
