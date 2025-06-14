/**
 * Auth Repository Interface
 * Defines the contract for user data persistence operations
 */

import { Usuario, UsuarioWithoutPassword } from '../AuthTypes/dtos.js';

export interface IAuthRepository {
  /**
   * Find user by username
   */
  findByUsername(username: string): Promise<Usuario | null>;

  /**
   * Find user by ID
   */
  findById(id: string): Promise<Usuario | null>;

  /**
   * Check if username exists
   */
  usernameExists(username: string): Promise<boolean>;

  /**
   * Create new user
   */
  createUser(user: Omit<Usuario, 'id'>): Promise<Usuario>;

  /**
   * Update user
   */
  updateUser(id: string, userData: Partial<Usuario>): Promise<Usuario | null>;

  /**
   * Delete user
   */
  deleteUser(id: string): Promise<boolean>;

  /**
   * Get all users (without passwords)
   */
  getAllUsers(): Promise<UsuarioWithoutPassword[]>;
} 