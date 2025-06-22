/**
 * Delete User Handler
 */
import { DeleteUserService } from '../../UserService/Services/delete.service.js';

export class DeleteUserHandler {
  constructor(private deleteUserService: DeleteUserService) {}

  async handleDelete(event: Electron.IpcMainInvokeEvent, id: string) {
    console.log('📥 Delete user endpoint llamado con ID:', id);
    return this.deleteUserService.delete(id);
  }
} 