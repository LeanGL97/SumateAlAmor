interface ElectronAPI {
  ping: () => Promise<string>;
  getUsuarios: () => Promise<any[]>;
  
  // Auth methods
  login: (loginData: { usuario: string; password: string }) => Promise<{
    success: boolean;
    message: string;
    user?: {
      id: string;
      nombre: string;
      correo?: string;
      usuario: string;
      direccion: string;
      telefono: string;
      rol: 'Administrador' | 'ServicioSocial' | 'Albergue';
    };
  }>;
  
  signup: (signupData: {
    nombre: string;
    correo?: string;
    usuario: string;
    direccion: string;
    telefono: string;
    password: string;
    rol: 'Administrador' | 'ServicioSocial' | 'Albergue';
    confirmPassword: string;
  }) => Promise<{
    success: boolean;
    message: string;
    user?: {
      id: string;
      nombre: string;
      correo?: string;
      usuario: string;
      direccion: string;
      telefono: string;
      rol: 'Administrador' | 'ServicioSocial' | 'Albergue';
    };
  }>;
  
  [key: string]: (...args: any[]) => Promise<any>; // Permite acceso dinámico a los endpoints
}

declare global {
  interface Window {
    api: ElectronAPI;
  }
}

export {}; 