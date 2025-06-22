/**
 * Get All Users Handler
 */
import { GetAllUsersService } from '../../UserService/Services/get-all.service.js';

export class GetAllUsersHandler {
  constructor(private getAllUsersService: GetAllUsersService) {}

  async handleGetAll(event: Electron.IpcMainInvokeEvent) {
    console.log('📥 Get all users endpoint llamado');
    return this.getAllUsersService.getAll();
  }
} 