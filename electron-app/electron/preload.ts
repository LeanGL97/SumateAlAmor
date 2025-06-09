import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  ping: () => ipcRenderer.invoke('ping'),

  // Ejemplo: Llamada para obtener todos los usuarios
  getUsuarios: () => ipcRenderer.invoke('usuarios:getAll'),

  // Puedes seguir agregando más métodos aquí
});
