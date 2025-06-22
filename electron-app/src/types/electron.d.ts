interface ElectronAPI {
  ping: () => Promise<string>;
  getUsuarios: () => Promise<any[]>;
  
  // Auth methods
  login: (loginData: { userName: string; password: string }) => Promise<{
    success: boolean;
    message: string;
    user?: {
      id: string;
      fullName: string;
      searchName: string;
      mail?: string;
      userName: string;
      address: string;
      phone: string;
      role: 'Administrador' | 'ServicioSocial' | 'Albergue';
    };
  }>;
  
  signup: (signupData: {
    fullName: string;
    mail?: string;
    userName: string;
    address: string;
    phone: string;
    password: string;
    role: 'Administrador' | 'ServicioSocial' | 'Albergue';
    confirmPassword: string;
  }) => Promise<{
    success: boolean;
    message: string;
    user?: {
      id: string;
      fullName: string;
      searchName: string;
      mail?: string;
      userName: string;
      address: string;
      phone: string;
      role: 'Administrador' | 'ServicioSocial' | 'Albergue';
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