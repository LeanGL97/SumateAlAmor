/**
 * User Domain Constants
 */

export const USER_ENDPOINTS = {
  CREATE: 'users:create',
  GET_ALL: 'users:getAll',
  GET_BY_ID: 'users:getById',
  SEARCH: 'users:search',
  UPDATE: 'users:update',
  DELETE: 'users:delete',
  CHANGE_ROLE: 'users:changeRole',
} as const;

export const USER_ERROR_MESSAGES = {
  INVALID_DATA: 'Datos de usuario inválidos',
  USER_NOT_FOUND: 'Usuario no encontrado',
  USERNAME_EXISTS: 'El nombre de usuario ya existe',
  PASSWORDS_NOT_MATCH: 'Las contraseñas no coinciden',
  WEAK_PASSWORD: 'La contraseña debe tener al menos 6 caracteres',
  INTERNAL_SERVER_ERROR: 'Error interno del servidor',
  SUCCESSFUL_CREATE: 'Usuario creado exitosamente',
  SUCCESSFUL_UPDATE: 'Usuario actualizado exitosamente',
  SUCCESSFUL_DELETE: 'Usuario eliminado exitosamente',
  SUCCESSFUL_ROLE_CHANGE: 'Rol de usuario actualizado',
} as const;

export const USER_PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 6
} as const; 