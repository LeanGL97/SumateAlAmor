/**
 * Get User By ID Service
 */
import { IUserRepository } from '../../UserRepository/user.repository.interface.js';
import { UserResponseDTO } from '../../UserTypes/dtos.js';
import { USER_ERROR_MESSAGES } from '../../UserTypes/constants.js';
import { UserNotFoundError } from '../../UserTypes/errors.js';
import { validateUserId } from '../../UserTypes/validation.js';

export class GetUserByIdService {
  constructor(private userRepository: IUserRepository) {}

  async getById(id: string): Promise<{ success: boolean; user?: UserResponseDTO; message?: string; errors?: Record<string, string> }> {
    const validation = validateUserId(id);
    if (!validation.isValid) {
      return { success: false, message: USER_ERROR_MESSAGES.INVALID_DATA, errors: validation.errors };
    }
    
    try {
      const user = await this.userRepository.findById(id);
      
      const userResponse: UserResponseDTO = {
        id: user.id,
        fullName: user.fullName,
        searchName: user.searchName,
        mail: user.mail,
        userName: user.userName,
        address: user.address,
        phone: user.phone,
        role: user.role
      };
      
      return { success: true, user: userResponse };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return { success: false, message: error.message };
      }
      console.error('Error in GetUserByIdService:', error);
      return { success: false, message: USER_ERROR_MESSAGES.INTERNAL_SERVER_ERROR };
    }
  }
} 