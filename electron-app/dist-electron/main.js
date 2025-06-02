import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { bootstrapBackend } from './domains/index.js'; // inicializador de backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let mainWindow = null;
async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    mainWindow.loadURL('http://localhost:5173');
    const template = [
        {
            label: 'Archivo',
            submenu: [{ role: 'quit', label: 'Salir' }]
        },
        {
            label: 'Editar',
            submenu: [
                { role: 'undo', label: 'Deshacer' },
                { role: 'redo', label: 'Rehacer' },
                { type: 'separator' },
                { role: 'cut', label: 'Cortar' },
                { role: 'copy', label: 'Copiar' },
                { role: 'paste', label: 'Pegar' }
            ]
        },
        {
            label: 'Ver',
            submenu: [
                { role: 'reload', label: 'Recargar' },
                { role: 'toggleDevTools', label: 'Herramientas de desarrollo' },
                { type: 'separator' },
                { role: 'resetZoom', label: 'Restablecer zoom' },
                { role: 'zoomIn', label: 'Acercar' },
                { role: 'zoomOut', label: 'Alejar' },
                { type: 'separator' },
                { role: 'togglefullscreen', label: 'Pantalla completa' }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    // ⬇️ Inicializa el backend (tu "Nest-like")
    await bootstrapBackend(ipcMain);
}
app.whenReady().then(createWindow);
//# sourceMappingURL=main.js.map