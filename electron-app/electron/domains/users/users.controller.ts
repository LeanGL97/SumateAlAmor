import { ipcMain } from 'electron';
import { getAllUsuarios } from './users.service.js';

export function initUsuarioController(ipc: typeof ipcMain) {
  ipc.handle('usuarios:getAll', async () => {
    try {
      const usuarios = await getAllUsuarios();
      return usuarios;
    } catch (error) {
      console.error('Error en el controlador de usuarios:', error);
      throw error;
    }
  });

  // Aquí irás añadiendo más endpoints: getById, create, update, etc.
}
