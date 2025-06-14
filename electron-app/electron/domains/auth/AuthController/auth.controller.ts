/**
 * Auth Controller
 * Main controller that initializes handlers and registers IPC endpoints
 */

import { ipcMain } from 'electron';
import { AuthContainer } from '../auth.container.js';
import { AUTH_ENDPOINTS } from '../AuthTypes/constants.js';

export function initAuthController(ipc: typeof ipcMain = ipcMain) {
  console.log('🔐 Inicializando controlador de autenticación...');
  
  // Get dependencies from container
  const container = AuthContainer.getInstance();
  const loginHandler = container.getLoginHandler();
  const signupHandler = container.getSignupHandler();
  
  console.log('✅ Servicio de autenticación creado');

  // Register IPC endpoints
  ipc.handle(AUTH_ENDPOINTS.LOGIN, (event, data) => loginHandler.handleLogin(event, data));
  ipc.handle(AUTH_ENDPOINTS.SIGNUP, (event, data) => signupHandler.handleSignup(event, data));

  console.log('✅ Endpoints de autenticación registrados: auth:login, auth:signup');
} 