/**
 * Login Handler
 * Orchestrates login operations and handles IPC communication
 */

import { AuthService } from '../../AuthService/auth.service.js';
import { LoginDTO, AuthResponseDTO } from '../../AuthTypes/dtos.js';
import { validateLoginData } from '../../AuthTypes/validation.js';
import { AUTH_ERROR_MESSAGES } from '../../AuthTypes/constants.js';

export class LoginHandler {
  constructor(private authService: AuthService) {}

  async handle(data: unknown): Promise<AuthResponseDTO> {
    console.log('📥 Login endpoint llamado con datos:', data);
    
    // 1. Validate input data
    const { isValid, errors } = validateLoginData(data);
    if (!isValid) {
      console.log('❌ Datos de login inválidos:', errors);
      return {
        success: false,
        message: AUTH_ERROR_MESSAGES.INVALID_LOGIN_DATA,
        errors,
      };
    }

    try {
      const loginData = data as LoginDTO;
      console.log('Login attempt for user:', loginData.userName);
      
      const result = await this.authService.login(loginData);
      console.log('Login result:', result.success ? 'Success' : 'Failed');
      
      return result;
    } catch (error) {
      console.error('Error in auth:login handler:', error);
      return {
        success: false,
        message: AUTH_ERROR_MESSAGES.INTERNAL_SERVER_ERROR
      };
    }
  }
} 