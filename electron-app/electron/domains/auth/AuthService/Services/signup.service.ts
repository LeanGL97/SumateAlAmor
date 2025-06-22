/**
 * Signup Service
 * Handles user registration logic
 */

import { IUserRepository } from '../../../users/UserRepository/user.repository.interface.js';
import { UserToCreateDTO } from '../../../users/UserTypes/dtos.js';
import { SignupDTO, AuthResponseDTO, UserResponseDTO } from '../../AuthTypes/dtos.js';
import { AUTH_ERROR_MESSAGES } from '../../AuthTypes/constants.js';
import { hashPassword } from '../auth.utils.js';
import { DuplicateUserError } from '../../../users/UserTypes/errors.js';

export class SignupService {
  constructor(private userRepository: IUserRepository) {}

  async signup(signupData: SignupDTO): Promise<AuthResponseDTO> {
    try {
      // Hash password
      const passwordHash = await hashPassword(signupData.password);

      // Create user object for the centralized repository
      const newUser: UserToCreateDTO = {
        fullName: signupData.fullName,
        mail: signupData.mail,
        userName: signupData.userName,
        address: signupData.address,
        phone: signupData.phone,
        passwordHash,
        role: signupData.role,
        searchName: (signupData.fullName + ' ' + signupData.userName).toLowerCase().replace(/\s+/g, ' ').trim()
      };

      // This will throw DuplicateUserError if the username is already taken.
      const createdUser = await this.userRepository.create(newUser);

      // Return user without password
      const userResponse: UserResponseDTO = {
        id: createdUser.id,
        fullName: createdUser.fullName,
        searchName: createdUser.searchName,
        mail: createdUser.mail,
        userName: createdUser.userName,
        address: createdUser.address,
        phone: createdUser.phone,
        role: createdUser.role
      };

      return {
        success: true,
        message: AUTH_ERROR_MESSAGES.SUCCESSFUL_SIGNUP,
        user: userResponse
      };
    } catch (error) {
      if (error instanceof DuplicateUserError) {
        return {
          success: false,
          message: error.message,
          errors: { userName: error.message } // Provide field-specific error
        };
      }
      
      console.error('Error in signup service:', error);
      return {
        success: false,
        message: AUTH_ERROR_MESSAGES.INTERNAL_SERVER_ERROR
      };
    }
  }
} 