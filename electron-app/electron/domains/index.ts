import { ipcMain } from 'electron';
import { initUsuarioController } from './users/users.controller.js';

export async function bootstrapBackend(ipc: typeof ipcMain) {
  // Aquí inicializas tus controladores (como NestJS lo haría)
  initUsuarioController(ipc);

  // En el futuro puedes hacer: initPacienteController(ipc), etc.
}
