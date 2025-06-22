/**
 * Get User By ID Handler
 */
import { GetUserByIdService } from '../../UserService/Services/get-by-id.service.js';

export class GetUserByIdHandler {
  constructor(private getUserByIdService: GetUserByIdService) {}

  async handleGetById(event: Electron.IpcMainInvokeEvent, id: string) {
    console.log('📥 Get user by ID endpoint llamado con ID:', id);
    return this.getUserByIdService.getById(id);
  }
} 