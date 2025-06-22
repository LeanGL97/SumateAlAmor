/**
 * User Controller
 * Main controller that initializes handlers and registers IPC endpoints
 */

import { ipcMain } from 'electron';
import { userContainer } from '../user.container.js';
import { USER_ENDPOINTS } from '../UserTypes/constants.js';

export function initUserController(ipc: typeof ipcMain = ipcMain) {
  console.log('👥 Inicializando controlador de usuarios...');
  
  // Get dependencies from container
  const createHandler = userContainer.getCreateHandler();
  const getAllHandler = userContainer.getGetAllHandler();
  const getByIdHandler = userContainer.getGetByIdHandler();
  const searchHandler = userContainer.getSearchHandler();
  const updateHandler = userContainer.getUpdateHandler();
  const deleteHandler = userContainer.getDeleteHandler();
  const changeRoleHandler = userContainer.getChangeRoleHandler();
  
  console.log('✅ Servicio de usuarios creado');

  // Register IPC endpoints
  ipc.handle(USER_ENDPOINTS.CREATE, (event, data) => createHandler.handleCreate(event, data));
  ipc.handle(USER_ENDPOINTS.GET_ALL, (event) => getAllHandler.handleGetAll(event));
  ipc.handle(USER_ENDPOINTS.GET_BY_ID, (event, id) => getByIdHandler.handleGetById(event, id));
  ipc.handle(USER_ENDPOINTS.SEARCH, (event, query) => searchHandler.handleSearch(event, query));
  ipc.handle(USER_ENDPOINTS.UPDATE, (event, id, data) => updateHandler.handleUpdate(event, id, data));
  ipc.handle(USER_ENDPOINTS.DELETE, (event, id) => deleteHandler.handleDelete(event, id));
  ipc.handle(USER_ENDPOINTS.CHANGE_ROLE, (event, id, data) => changeRoleHandler.handleChangeRole(event, id, data));

  console.log('✅ Endpoints de usuarios registrados:', Object.values(USER_ENDPOINTS));
} 