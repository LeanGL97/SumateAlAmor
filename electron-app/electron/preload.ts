import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  ping: () => ipcRenderer.invoke('ping'),

  // User methods - using correct endpoint names from backend
  getUsuarios: () => ipcRenderer.invoke('users:getAll'),

  // Auth methods
  login: (loginData: { userName: string; password: string }) => 
    ipcRenderer.invoke('auth:login', loginData),
  
  signup: (signupData: {
    fullName: string;
    mail?: string;
    userName: string;
    address: string;
    phone: string;
    password: string;
    role: 'Administrador' | 'ServicioSocial' | 'Albergue';
    confirmPassword: string;
  }) => ipcRenderer.invoke('auth:signup', signupData),

  // Puedes seguir agregando más métodos aquí
});
