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

export interface LoginRequest {
  usuario: string;
  password: string;
}

export interface SignupRequest {
  nombre: string;
  correo?: string;
  usuario: string;
  direccion: string;
  telefono: string;
  password: string;
  rol: UserRole;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<Usuario, 'password'>;
  token?: string;
} 