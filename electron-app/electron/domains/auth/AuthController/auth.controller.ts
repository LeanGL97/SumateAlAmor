/**
 * Auth Controller
 * Main controller that initializes handlers and registers IPC endpoints
 */

import { IpcMainInvokeEvent, ipcMain } from 'electron';
import { LoginDTO, SignupDTO, AuthResponseDTO } from '../AuthTypes/dtos.js';
import { authContainer } from '../auth.container.js';
import { AUTH_ENDPOINTS } from '../AuthTypes/constants.js';

export class AuthController {
  static async login(
    _event: IpcMainInvokeEvent,
    loginData: LoginDTO,
  ): Promise<AuthResponseDTO> {
    const handler = authContainer.getLoginHandler();
    return handler.handle(loginData);
  }

  static async signup(
    _event: IpcMainInvokeEvent,
    signupData: SignupDTO,
  ): Promise<AuthResponseDTO> {
    const handler = authContainer.getSignupHandler();
    return handler.handle(signupData);
  }
}

/**
 * Initialize Auth Controller and register IPC endpoints
 * @param ipc - IPC main instance (defaults to ipcMain)
 */
export function initAuthController(ipc: typeof ipcMain = ipcMain) {
  console.log('🔐 Inicializando controlador de autenticación...');
  
  // Register IPC endpoints
  ipc.handle(AUTH_ENDPOINTS.LOGIN, AuthController.login);
  ipc.handle(AUTH_ENDPOINTS.SIGNUP, AuthController.signup);
  
  console.log('✅ Endpoints de autenticación registrados:', Object.values(AUTH_ENDPOINTS));
} 