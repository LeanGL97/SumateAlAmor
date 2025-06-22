/**
 * Update User Handler
 */
import { UpdateUserService } from '../../UserService/Services/update.service.js';

export class UpdateUserHandler {
  constructor(private updateUserService: UpdateUserService) {}

  async handleUpdate(event: Electron.IpcMainInvokeEvent, id: string, data: unknown) {
    console.log('📥 Update user endpoint llamado con ID:', id, 'y datos:', data);
    return this.updateUserService.update(id, data);
  }
} 