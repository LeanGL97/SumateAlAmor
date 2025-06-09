"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    ping: () => electron_1.ipcRenderer.invoke('ping'),
    // Ejemplo: Llamada para obtener todos los usuarios
    getUsuarios: () => electron_1.ipcRenderer.invoke('usuarios:getAll'),
    // Puedes seguir agregando más métodos aquí
});
//# sourceMappingURL=preload.js.map