"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsuarios = getAllUsuarios;
const database_js_1 = require("../../db/database.js");
async function getAllUsuarios() {
    try {
        const db = await (0, database_js_1.getDatabase)();
        const usuarios = await db.all('SELECT id, nombre, usuario, correo, telefono, direccion, rol FROM usuario');
        return usuarios;
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}
//# sourceMappingURL=users.service.js.map