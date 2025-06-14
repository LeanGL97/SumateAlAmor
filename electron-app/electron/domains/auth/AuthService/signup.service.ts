/**
 * Signup Service
 * Handles user registration logic
 */

import { IAuthRepository } from '../AuthRepository/auth.repository.interface.js';
import { SignupDTO, AuthResponseDTO, UsuarioWithoutPassword } from '../AuthTypes/dtos.js';
import { AUTH_ERROR_MESSAGES } from '../AuthTypes/constants.js';
import { hashPassword } from './auth.utils.js';

export class SignupService {
  constructor(private authRepository: IAuthRepository) {}

  async signup(signupData: SignupDTO): Promise<AuthResponseDTO> {
    try {
      // Validate required fields
      if (!signupData.nombre || !signupData.usuario || !signupData.direccion || 
          !signupData.telefono || !signupData.password || !signupData.rol) {
        return {
          success: false,
          message: AUTH_ERROR_MESSAGES.MISSING_REQUIRED_FIELDS
        };
      }

      // Validate password confirmation
      if (signupData.password !== signupData.confirmPassword) {
        return {
          success: false,
          message: AUTH_ERROR_MESSAGES.PASSWORDS_NOT_MATCH
        };
      }

      // Validate password strength
      if (signupData.password.length < 6) {
        return {
          success: false,
          message: AUTH_ERROR_MESSAGES.WEAK_PASSWORD
        };
      }

      // Check if username already exists
      const usernameExists = await this.authRepository.usernameExists(signupData.usuario);

      if (usernameExists) {
        return {
          success: false,
          message: AUTH_ERROR_MESSAGES.USERNAME_EXISTS
        };
      }

      // Hash password
      const hashedPassword = hashPassword(signupData.password);

      // Create user object
      const newUser = {
        nombre: signupData.nombre,
        correo: signupData.correo,
        usuario: signupData.usuario,
        direccion: signupData.direccion,
        telefono: signupData.telefono,
        password: hashedPassword,
        rol: signupData.rol
      };

      // Insert new user
      const createdUser = await this.authRepository.createUser(newUser);

      // Return user without password
      const userWithoutPassword: UsuarioWithoutPassword = {
        id: createdUser.id,
        nombre: createdUser.nombre,
        correo: createdUser.correo,
        usuario: createdUser.usuario,
        direccion: createdUser.direccion,
        telefono: createdUser.telefono,
        rol: createdUser.rol
      };

      return {
        success: true,
        message: AUTH_ERROR_MESSAGES.SUCCESSFUL_SIGNUP,
        user: userWithoutPassword
      };
    } catch (error) {
      console.error('Error in signup service:', error);
      return {
        success: false,
        message: AUTH_ERROR_MESSAGES.INTERNAL_SERVER_ERROR
      };
    }
  }
} 