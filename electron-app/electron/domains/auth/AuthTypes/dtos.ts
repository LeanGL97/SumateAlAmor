/**
 * Data Transfer Objects for Auth Domain
 * Defines interfaces for input/output data structures
 */

export enum UserRole {
  ADMINISTRADOR = 'Administrador',
  SERVICIO_SOCIAL = 'ServicioSocial',
  ALBERGUE = 'Albergue'
}

export interface Usuario {
  id: string; // UUID
  nombre: string;
  correo?: string;
  usuario: string;
  direccion: string;
  telefono: string;
  password: string; // Hashed password
  rol: UserRole;
}

export interface UsuarioWithoutPassword {
  id: string;
  nombre: string;
  correo?: string;
  usuario: string;
  direccion: string;
  telefono: string;
  rol: UserRole;
}

export interface LoginDTO {
  usuario: string;
  password: string;
}

export interface SignupDTO {
  nombre: string;
  correo?: string;
  usuario: string;
  direccion: string;
  telefono: string;
  password: string;
  rol: UserRole;
  confirmPassword: string;
}

export interface AuthResponseDTO {
  success: boolean;
  message: string;
  user?: UsuarioWithoutPassword;
  token?: string;
}

export interface AuthErrorDTO {
  success: false;
  message: string;
  code?: string;
} 