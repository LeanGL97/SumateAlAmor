/**
 * Data Transfer Objects for Auth Domain
 * Defines interfaces for input/output data structures
 * Note: Uses User domain types for consistency
 */

import { UserRoleEnum, UserResponseDTO } from '../../users/UserTypes/dtos.js';

// Re-export user types for consistency
export { UserRoleEnum, UserResponseDTO } from '../../users/UserTypes/dtos.js';

export interface LoginDTO {
  userName: string;
  password: string;
}

export interface SignupDTO {
  fullName: string;
  mail?: string;
  userName: string;
  address: string;
  phone: string;
  password: string;
  role: UserRoleEnum;
  confirmPassword: string;
}

export interface AuthResponseDTO {
  success: boolean;
  message: string;
  user?: UserResponseDTO;
  token?: string;
  errors?: Record<string, string>;
}

export interface AuthErrorDTO {
  success: false;
  message: string;
  code?: string;
} 