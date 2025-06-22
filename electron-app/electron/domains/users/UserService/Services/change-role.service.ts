/**
 * Change User Role Service
 */
import { IUserRepository } from '../../UserRepository/user.repository.interface.js';
import { ChangeUserRoleDTO, UserResponseDTO } from '../../UserTypes/dtos.js';
import { USER_ERROR_MESSAGES } from '../../UserTypes/constants.js';
import { UserNotFoundError } from '../../UserTypes/errors.js';
import { validateUserId, validateChangeRoleData } from '../../UserTypes/validation.js';

export class ChangeUserRoleService {
  constructor(private userRepository: IUserRepository) {}

  async changeRole(id: string, data: ChangeUserRoleDTO): Promise<{ success: boolean; user?: UserResponseDTO; message?: string; errors?: Record<string, string> }> {
    const idValidation = validateUserId(id);
    if (!idValidation.isValid) {
      return { success: false, message: USER_ERROR_MESSAGES.INVALID_DATA, errors: idValidation.errors };
    }
    
    const dataValidation = validateChangeRoleData(data);
    if (!dataValidation.isValid) {
      return { success: false, message: USER_ERROR_MESSAGES.INVALID_DATA, errors: dataValidation.errors };
    }
    
    try {
      const updated = await this.userRepository.changeRole(id, data.role);
      
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
      
      return { success: true, user: userResponse, message: USER_ERROR_MESSAGES.SUCCESSFUL_ROLE_CHANGE };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return { success: false, message: error.message };
      }
      console.error('Error in ChangeUserRoleService:', error);
      return { success: false, message: USER_ERROR_MESSAGES.INTERNAL_SERVER_ERROR };
    }
  }
} 