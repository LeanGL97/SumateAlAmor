/**
 * Change User Role Handler
 */
import { ChangeUserRoleService } from '../../UserService/Services/change-role.service.js';
import { ChangeUserRoleDTO } from '../../UserTypes/dtos.js';

export class ChangeUserRoleHandler {
  constructor(private changeUserRoleService: ChangeUserRoleService) {}

  async handleChangeRole(event: Electron.IpcMainInvokeEvent, id: string, data: ChangeUserRoleDTO) {
    console.log('📥 Change user role endpoint llamado con ID:', id, 'y rol:', data.role);
    return this.changeUserRoleService.changeRole(id, data);
  }
} 