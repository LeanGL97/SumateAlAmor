/**
 * Delete User Service
 */
import { IUserRepository } from '../../UserRepository/user.repository.interface.js';
import { USER_ERROR_MESSAGES } from '../../UserTypes/constants.js';
import { UserNotFoundError } from '../../UserTypes/errors.js';
import { validateUserId } from '../../UserTypes/validation.js';

export class DeleteUserService {
  constructor(private userRepository: IUserRepository) {}

  async delete(id: string): Promise<{ success: boolean; message: string; errors?: Record<string, string> }> {
    const validation = validateUserId(id);
    if (!validation.isValid) {
      return { success: false, message: USER_ERROR_MESSAGES.INVALID_DATA, errors: validation.errors };
    }
    
    try {
      await this.userRepository.delete(id);
      return { success: true, message: USER_ERROR_MESSAGES.SUCCESSFUL_DELETE };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return { success: false, message: error.message };
      }
      console.error('Error in DeleteUserService:', error);
      return { success: false, message: USER_ERROR_MESSAGES.INTERNAL_SERVER_ERROR };
    }
  }
} 