/**
 * User Controller
 * Main controller that handles user operations through static methods
 * Follows the same architectural pattern as AuthController for consistency
 */

import { IpcMainInvokeEvent, ipcMain } from 'electron';
import { userContainer } from '../user.container.js';
import { 
  CreateUserDTO, 
  UpdateUserDTO, 
  ChangeUserRoleDTO, 
  UserResponseWrapperDTO, 
  UsersListResponseWrapperDTO 
} from '../UserTypes/dtos.js';
import { USER_ENDPOINTS } from '../UserTypes/constants.js';

export class UserController {
  static async create(
    _event: IpcMainInvokeEvent,
    userData: CreateUserDTO,
  ): Promise<UserResponseWrapperDTO> {
    const handler = userContainer.getCreateHandler();
    return handler.handleCreate(_event, userData);
  }

  static async getAll(
    _event: IpcMainInvokeEvent,
  ): Promise<UsersListResponseWrapperDTO> {
    const handler = userContainer.getGetAllHandler();
    return handler.handleGetAll(_event);
  }

  static async getById(
    _event: IpcMainInvokeEvent,
    id: string,
  ): Promise<UserResponseWrapperDTO> {
    const handler = userContainer.getGetByIdHandler();
    return handler.handleGetById(_event, id);
  }

  static async search(
    _event: IpcMainInvokeEvent,
    query: string,
  ): Promise<UsersListResponseWrapperDTO> {
    const handler = userContainer.getSearchHandler();
    return handler.handleSearch(_event, query);
  }

  static async update(
    _event: IpcMainInvokeEvent,
    id: string,
    userData: UpdateUserDTO,
  ): Promise<UserResponseWrapperDTO> {
    const handler = userContainer.getUpdateHandler();
    return handler.handleUpdate(_event, id, userData);
  }

  static async delete(
    _event: IpcMainInvokeEvent,
    id: string,
  ): Promise<UserResponseWrapperDTO> {
    const handler = userContainer.getDeleteHandler();
    return handler.handleDelete(_event, id);
  }

  static async changeRole(
    _event: IpcMainInvokeEvent,
    id: string,
    roleData: ChangeUserRoleDTO,
  ): Promise<UserResponseWrapperDTO> {
    const handler = userContainer.getChangeRoleHandler();
    return handler.handleChangeRole(_event, id, roleData);
  }
}

/**
 * Initialize User Controller and register IPC endpoints
 * @param ipc - IPC main instance (defaults to ipcMain)
 */
export function initUserController(ipc: typeof ipcMain = ipcMain) {
  console.log('👥 Inicializando controlador de usuarios...');
  
  // Register IPC endpoints
  ipc.handle(USER_ENDPOINTS.CREATE, UserController.create);
  ipc.handle(USER_ENDPOINTS.GET_ALL, UserController.getAll);
  ipc.handle(USER_ENDPOINTS.GET_BY_ID, UserController.getById);
  ipc.handle(USER_ENDPOINTS.SEARCH, UserController.search);
  ipc.handle(USER_ENDPOINTS.UPDATE, UserController.update);
  ipc.handle(USER_ENDPOINTS.DELETE, UserController.delete);
  ipc.handle(USER_ENDPOINTS.CHANGE_ROLE, UserController.changeRole);
  
  console.log('✅ Endpoints de usuarios registrados:', Object.values(USER_ENDPOINTS));
} 