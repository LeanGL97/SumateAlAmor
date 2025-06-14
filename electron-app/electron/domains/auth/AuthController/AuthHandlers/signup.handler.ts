/**
 * Signup Handler
 * Orchestrates signup operations and handles IPC communication
 */

import { AuthService } from '../../AuthService/auth.service.js';
import { SignupDTO, AuthResponseDTO } from '../../AuthTypes/dtos.js';
import { validateSignupData } from '../../AuthTypes/validation.js';
import { AUTH_ERROR_MESSAGES } from '../../AuthTypes/constants.js';

export class SignupHandler {
  constructor(private authService: AuthService) {}

  async handleSignup(event: Electron.IpcMainInvokeEvent, data: unknown): Promise<AuthResponseDTO> {
    console.log('📥 Signup endpoint llamado con datos:', data);
    
    // Validate input data
    if (!validateSignupData(data)) {
      console.log('❌ Datos de signup inválidos');
      return {
        success: false,
        message: AUTH_ERROR_MESSAGES.INVALID_SIGNUP_DATA
      };
    }

    try {
      const signupData = data as SignupDTO;
      console.log('Signup attempt for user:', signupData.usuario);
      
      const result = await this.authService.signup(signupData);
      console.log('Signup result:', result.success ? 'Success' : 'Failed');
      
      return result;
    } catch (error) {
      console.error('Error in auth:signup handler:', error);
      return {
        success: false,
        message: AUTH_ERROR_MESSAGES.INTERNAL_SERVER_ERROR
      };
    }
  }
} 