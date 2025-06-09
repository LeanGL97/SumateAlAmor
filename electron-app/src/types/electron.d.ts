interface ElectronAPI {
  ping: () => Promise<string>;
  getUsuarios: () => Promise<any[]>;
  [key: string]: (...args: any[]) => Promise<any>; // Permite acceso dinámico a los endpoints
}

declare global {
  interface Window {
    api: ElectronAPI;
  }
}

export {}; 