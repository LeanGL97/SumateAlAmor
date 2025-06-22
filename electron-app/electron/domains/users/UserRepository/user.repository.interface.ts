/**
 * User Repository Interface
 */

import { User, UpdateUserDTO, UserToCreateDTO } from '../../users/UserTypes/dtos.js';

export interface IUserRepository {
  findById(id: string): Promise<User>;
  findByUserName(userName: string): Promise<User>;
  findAll(): Promise<User[]>;
  searchByNameOrUserName(query: string): Promise<User[]>;
  create(user: UserToCreateDTO): Promise<User>;
  update(id: string, data: UpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  changeRole(id: string, role: string): Promise<User>;
} 