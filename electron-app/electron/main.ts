import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import * as path from 'path';
import { bootstrapBackend } from './domains/index.js';
import { initializeDatabase } from './db/database.js';

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  try {
    // Inicializar la base de datos primero
    await initializeDatabase();
    console.log('Base de datos inicializada correctamente');

    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.cjs'),
        contextIsolation: true,
        nodeIntegration: false
      }
    })

    mainWindow.loadURL('http://localhost:5173')

    const template: Electron.MenuItemConstructorOptions[] = [
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
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    // ⬇️ Inicializa el backend (tu "Nest-like")
    await bootstrapBackend(ipcMain);
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error);
    app.quit();
  }
}

app.whenReady().then(createWindow)
