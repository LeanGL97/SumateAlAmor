/**
 * Update User Service
 */
import { IUserRepository } from '../../UserRepository/user.repository.interface.js';
import { UpdateUserDTO, UserResponseDTO } from '../../UserTypes/dtos.js';
import { USER_ERROR_MESSAGES } from '../../UserTypes/constants.js';
import { validateUpdateUserData, validateUserId } from '../../UserTypes/validation.js';
import { UserNotFoundError, DuplicateUserError } from '../../UserTypes/errors.js';

export class UpdateUserService {
  constructor(private userRepository: IUserRepository) {}

  async update(id: string, data: unknown): Promise<{ success: boolean; user?: UserResponseDTO; message?: string; errors?: Record<string, string> }> {
    const idValidation = validateUserId(id);
    if (!idValidation.isValid) {
      return { success: false, message: USER_ERROR_MESSAGES.INVALID_DATA, errors: idValidation.errors };
    }
    
    const validation = validateUpdateUserData(data);
    if (!validation.isValid) {
      return { success: false, message: USER_ERROR_MESSAGES.INVALID_DATA, errors: validation.errors };
    }
    
    try {
      const updated = await this.userRepository.update(id, data as UpdateUserDTO);
      
      const userResponse: UserResponseDTO = {
        id: updated.id,
        fullName: updated.fullName,
        searchName: updated.searchName,
        mail: updated.mail,
        userName: updated.userName,
        address: updated.address,
        phone: updated.phone,
        role: updated.role
      };
      
      return { success: true, user: userResponse };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return { success: false, message: error.message };
      }
      if (error instanceof DuplicateUserError) {
        return { success: false, message: error.message, errors: { userName: error.message } };
      }
      console.error('Error in UpdateUserService:', error);
      return { success: false, message: USER_ERROR_MESSAGES.INTERNAL_SERVER_ERROR };
    }
  }
} 