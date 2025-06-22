/**
 * Get All Users Service
 */
import { IUserRepository } from '../../UserRepository/user.repository.interface.js';
import { UsersListResponseDTO, UserResponseDTO } from '../../UserTypes/dtos.js';

export class GetAllUsersService {
  constructor(private userRepository: IUserRepository) {}

  async getAll(): Promise<{ success: boolean; users: UserResponseDTO[] }> {
    const users = await this.userRepository.findAll();
    const usersResponse = users.map(({ passwordHash, ...rest }) => rest);
    return { success: true, users: usersResponse };
  }
} 