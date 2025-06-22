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

  async handle(data: unknown): Promise<AuthResponseDTO> {
    console.log('📥 Signup endpoint llamado con datos:', data);
    
    // 1. Validate input data
    const { isValid, errors } = validateSignupData(data);
    if (!isValid) {
      console.log('❌ Datos de signup inválidos:', errors);
      return {
        success: false,
        message: AUTH_ERROR_MESSAGES.INVALID_SIGNUP_DATA,
        errors,
      };
    }

    try {
      const signupData = data as SignupDTO;
      console.log('Signup attempt for user:', signupData.userName);
      
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