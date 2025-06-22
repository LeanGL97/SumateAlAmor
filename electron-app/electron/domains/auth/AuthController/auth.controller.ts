/**
 * Auth Controller
 * Main controller that initializes handlers and registers IPC endpoints
 */

import { IpcMainInvokeEvent } from 'electron';
import { LoginDTO, SignupDTO, AuthResponseDTO } from '../AuthTypes/dtos.js';
import { authContainer } from '../auth.container.js';

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