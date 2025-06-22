import { ipcMain } from 'electron';
import { initUserController } from './users/UserController/user.controller.js';
import { AuthController } from './auth/AuthController/auth.controller.js';
import { AUTH_ENDPOINTS } from './auth/AuthTypes/constants.js';

export async function bootstrapBackend(ipc: typeof ipcMain) {
  console.log('🚀 Iniciando backend...');
  
  // Inicializa los controladores de dominio
  initUserController(ipc);
  
  // Registra los endpoints de autenticación
  ipc.handle(AUTH_ENDPOINTS.LOGIN, AuthController.login);
  ipc.handle(AUTH_ENDPOINTS.SIGNUP, AuthController.signup);
  
  console.log('✅ Endpoints de autenticación registrados.');
  console.log('🎉 Backend iniciado correctamente.');
}
