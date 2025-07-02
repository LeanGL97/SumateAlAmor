/**
 * User Domain DTOs and Model
 */

export enum UserRoleEnum {
  ADMINISTRADOR = 'Administrador',
  SERVICIO_SOCIAL = 'ServicioSocial',
  ALBERGUE = 'Albergue'
}

export interface User {
  id: string; // UUID
  fullName: string;
  searchName: string;
  mail?: string;
  userName: string;
  address: string;
  phone: string;
  passwordHash: string;
  role: UserRoleEnum;
  deleted?: boolean;
}

export interface CreateUserDTO {
  fullName: string;
  mail?: string;
  userName: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRoleEnum;
}

export type UserToCreateDTO = Omit<CreateUserDTO, 'password' | 'confirmPassword'> & {
  passwordHash: string;
  searchName: string;
};

export interface UpdateUserDTO {
  fullName?: string;
  mail?: string;
  userName?: string;
  address?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  role?: UserRoleEnum;
}

export interface ChangeUserRoleDTO {
  role: UserRoleEnum;
}

export interface UserResponseDTO {
  id: string;
  fullName: string;
  searchName: string;
  mail?: string;
  userName: string;
  address: string;
  phone: string;
  role: UserRoleEnum;
}

export interface UsersListResponseDTO {
  users: UserResponseDTO[];
}

export interface UserResponseWrapperDTO {
  success: boolean;
  message?: string;
  user?: UserResponseDTO;
  errors?: Record<string, string>;
}

export interface UsersListResponseWrapperDTO {
  success: boolean;
  message?: string;
  users?: UserResponseDTO[];
  errors?: Record<string, string>;
} 