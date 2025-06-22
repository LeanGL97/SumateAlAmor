/**
 * Search Users Service
 */
import { IUserRepository } from '../../UserRepository/user.repository.interface.js';
import { UserResponseDTO } from '../../UserTypes/dtos.js';

export class SearchUsersService {
  constructor(private userRepository: IUserRepository) {}

  async search(query: string): Promise<{ success: boolean; users: UserResponseDTO[] }> {
    const users = await this.userRepository.searchByNameOrUserName(query);
    const usersResponse = users.map(({ passwordHash, ...rest }) => rest);
    return { success: true, users: usersResponse };
  }
} 