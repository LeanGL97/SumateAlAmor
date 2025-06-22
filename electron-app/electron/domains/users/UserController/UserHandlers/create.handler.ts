/**
 * Create User Handler
 */
import { CreateUserService } from '../../UserService/Services/create.service.js';
import { CreateUserDTO } from '../../UserTypes/dtos.js';

export class CreateUserHandler {
  constructor(private createUserService: CreateUserService) {}

  async handleCreate(event: Electron.IpcMainInvokeEvent, data: unknown) {
    console.log('📥 Create user endpoint llamado con datos:', data);
    return this.createUserService.create(data);
  }
} 