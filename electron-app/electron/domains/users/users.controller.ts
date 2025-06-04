import { ipcMain } from 'electron';
import { getAllUsuarios } from './users.service.js';

export function initUsuarioController(ipc: typeof ipcMain) {
  ipc.handle('usuarios:getAll', async () => {
    const usuarios = await getAllUsuarios();
    return usuarios;
  });

  // Aquí irás añadiendo más endpoints: getById, create, update, etc.
}
