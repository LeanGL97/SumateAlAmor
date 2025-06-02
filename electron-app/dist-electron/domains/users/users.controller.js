import { getAllUsuarios } from './users.service.js';
export function initUsuarioController(ipc) {
    ipc.handle('usuarios:getAll', async () => {
        const usuarios = await getAllUsuarios();
        return usuarios;
    });
    // Aquí irás añadiendo más endpoints: getById, create, update, etc.
}
//# sourceMappingURL=users.controller.js.map