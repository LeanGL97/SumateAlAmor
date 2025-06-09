"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUsuarioController = initUsuarioController;
const users_service_js_1 = require("./users.service.js");
function initUsuarioController(ipc) {
    ipc.handle('usuarios:getAll', async () => {
        try {
            const usuarios = await (0, users_service_js_1.getAllUsuarios)();
            return usuarios;
        }
        catch (error) {
            console.error('Error en el controlador de usuarios:', error);
            throw error;
        }
    });
    // Aquí irás añadiendo más endpoints: getById, create, update, etc.
}
//# sourceMappingURL=users.controller.js.map