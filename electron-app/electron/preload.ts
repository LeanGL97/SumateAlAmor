import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  ping: () => ipcRenderer.invoke('ping'),

  // Ejemplo: Llamada para obtener todos los usuarios
  getUsuarios: () => ipcRenderer.invoke('usuarios:getAll'),

  // Auth methods
  login: (loginData: { usuario: string; password: string }) => 
    ipcRenderer.invoke('auth:login', loginData),
  
  signup: (signupData: {
    nombre: string;
    correo?: string;
    usuario: string;
    direccion: string;
    telefono: string;
    password: string;
    rol: 'Administrador' | 'ServicioSocial' | 'Albergue';
    confirmPassword: string;
  }) => ipcRenderer.invoke('auth:signup', signupData),

  // Puedes seguir agregando más métodos aquí
});
