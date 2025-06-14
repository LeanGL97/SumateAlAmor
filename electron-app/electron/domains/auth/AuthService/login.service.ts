/**
 * Login Service
 * Handles user authentication logic
 */

import { IAuthRepository } from '../AuthRepository/auth.repository.interface.js';
import { LoginDTO, AuthResponseDTO, UsuarioWithoutPassword } from '../AuthTypes/dtos.js';
import { AUTH_ERROR_MESSAGES } from '../AuthTypes/constants.js';
import { verifyPassword } from './auth.utils.js';

export class LoginService {
  constructor(private authRepository: IAuthRepository) {}

  async login(loginData: LoginDTO): Promise<AuthResponseDTO> {
    try {
      // Validate required fields
      if (!loginData.usuario || !loginData.password) {
        return {
          success: false,
          message: AUTH_ERROR_MESSAGES.INVALID_LOGIN_DATA
        };
      }

      // Find user by username
      const user = await this.authRepository.findByUsername(loginData.usuario);

      if (!user) {
        return {
          success: false,
          message: AUTH_ERROR_MESSAGES.USER_NOT_FOUND
        };
      }

      // Verify password
      if (!verifyPassword(loginData.password, user.password)) {
        return {
          success: false,
          message: AUTH_ERROR_MESSAGES.INVALID_PASSWORD
        };
      }

      // Return user without password
      const userWithoutPassword: UsuarioWithoutPassword = {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        usuario: user.usuario,
        direccion: user.direccion,
        telefono: user.telefono,
        rol: user.rol
      };
      
      return {
        success: true,
        message: AUTH_ERROR_MESSAGES.SUCCESSFUL_LOGIN,
        user: userWithoutPassword
      };
    } catch (error) {
      console.error('Error in login service:', error);
      return {
        success: false,
        message: AUTH_ERROR_MESSAGES.INTERNAL_SERVER_ERROR
      };
    }
  }
} 