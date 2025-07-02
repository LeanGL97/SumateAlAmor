/**
 * Backend Infrastructure
 * Handles Electron IPC setup and domain initialization
 * Separates infrastructure concerns from domain logic
 */

import { ipcMain } from 'electron';
import { initUserController } from '../domains/users/UserController/user.controller.js';
import { initAuthController } from '../domains/auth/AuthController/auth.controller.js';

export async function bootstrapBackend(ipc: typeof ipcMain) {
  console.log('🚀 Iniciando backend...');
  
  // Initialize domain controllers
  initAuthController(ipc);
  initUserController(ipc);
  
  console.log('🎉 Backend iniciado correctamente.');
} 