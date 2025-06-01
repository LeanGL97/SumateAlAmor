import { contextBridge } from 'electron';
contextBridge.exposeInMainWorld('api', {
    ping: () => 'pong'
});
//# sourceMappingURL=preload.js.map