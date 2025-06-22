"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    ping: () => electron_1.ipcRenderer.invoke('ping'),
    // User methods - using correct endpoint names from backend
    getUsuarios: () => electron_1.ipcRenderer.invoke('users:getAll'),
    // Auth methods
    login: (loginData) => electron_1.ipcRenderer.invoke('auth:login', loginData),
    signup: (signupData) => electron_1.ipcRenderer.invoke('auth:signup', signupData),
    // Puedes seguir agregando más métodos aquí
});
//# sourceMappingURL=preload.js.map