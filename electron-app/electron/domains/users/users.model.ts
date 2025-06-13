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
