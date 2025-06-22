/**
 * Login Service
 * Handles user authentication logic
 */

import { IUserRepository } from '../../../users/UserRepository/user.repository.interface.js';
import { LoginDTO, AuthResponseDTO, UserResponseDTO } from '../../AuthTypes/dtos.js';
import { AUTH_ERROR_MESSAGES } from '../../AuthTypes/constants.js';
import { verifyPassword } from '../auth.utils.js';
import { UserNotFoundError } from '../../../users/UserTypes/errors.js';

export class LoginService {
  constructor(private userRepository: IUserRepository) {}

  async login(loginData: LoginDTO): Promise<AuthResponseDTO> {
    try {
      // Find user by username. This will throw UserNotFoundError if not found.
      const user = await this.userRepository.findByUserName(loginData.userName);

      // Verify password
      const isPasswordValid = await verifyPassword(loginData.password, user.passwordHash);
      if (!isPasswordValid) {
        // Same error message as user not found for security reasons
        return {
          success: false,
          message: AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS,
        };
      }

      // Return user without password
      const userResponse: UserResponseDTO = {
        id: user.id,
        fullName: user.fullName,
        searchName: user.searchName,
        mail: user.mail,
        userName: user.userName,
        address: user.address,
        phone: user.phone,
        role: user.role,
      };
      
      return {
        success: true,
        message: AUTH_ERROR_MESSAGES.SUCCESSFUL_LOGIN,
        user: userResponse
      };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        // Generic error message to prevent user enumeration attacks
        return {
          success: false,
          message: AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS
        };
      }
      
      console.error('Error in login service:', error);
      return {
        success: false,
        message: AUTH_ERROR_MESSAGES.INTERNAL_SERVER_ERROR
      };
    }
  }
} 