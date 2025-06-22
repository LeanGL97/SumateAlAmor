/**
 * Create User Service
 */
import { IUserRepository } from '../../UserRepository/user.repository.interface.js';
import { CreateUserDTO, UserResponseDTO, UserToCreateDTO } from '../../UserTypes/dtos.js';
import { USER_ERROR_MESSAGES } from '../../UserTypes/constants.js';
import { validateCreateUserData } from '../../UserTypes/validation.js';
import { hashPassword } from '../user.utils.js';
import { DuplicateUserError } from '../../UserTypes/errors.js';

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async create(data: unknown): Promise<{ success: boolean; message: string; user?: UserResponseDTO; errors?: Record<string, string> }> {
    const validation = validateCreateUserData(data);
    if (!validation.isValid) {
      return { success: false, message: USER_ERROR_MESSAGES.INVALID_DATA, errors: validation.errors };
    }
    
    const dto = data as CreateUserDTO;
    
    try {
      const passwordHash = await hashPassword(dto.password);
      const searchName = (dto.fullName + ' ' + dto.userName).toLowerCase().replace(/\s+/g, ' ').trim();
      
      const userToCreate: UserToCreateDTO = { ...dto, passwordHash, searchName };
      
      const user = await this.userRepository.create(userToCreate);
      
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

      return { success: true, message: USER_ERROR_MESSAGES.SUCCESSFUL_CREATE, user: userResponse };
    } catch (error) {
      if (error instanceof DuplicateUserError) {
        return { success: false, message: error.message, errors: { userName: error.message } };
      }
      console.error('Error in CreateUserService:', error);
      return { success: false, message: USER_ERROR_MESSAGES.INTERNAL_SERVER_ERROR };
    }
  }
} 