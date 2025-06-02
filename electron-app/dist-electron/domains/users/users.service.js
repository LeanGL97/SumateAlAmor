import { db } from '../../db/database.js';
export async function getAllUsuarios() {
    //   const usuarios = await db.all<Usuario[]>('SELECT * FROM usuario');
    const usuarios = await db.all('SELECT id, nombre, usuario, correo, telefono, direccion, rol FROM usuario'); //Filtrar contraseña
    return usuarios;
}
//# sourceMappingURL=users.service.js.map