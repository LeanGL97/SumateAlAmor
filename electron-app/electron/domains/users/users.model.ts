export interface Usuario {
  id: number;
  nombre: string;
  usuario: string;
  correo?: string;
  telefono: string;
  direccion: string;
  password: string;
  rol: 'Administrador' | 'ServicioSocial' | 'Albergue';
}
