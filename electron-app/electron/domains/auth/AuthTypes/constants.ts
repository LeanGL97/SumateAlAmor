/**
 * Constants for Auth Domain
 * Defines endpoints, roles, and other constant values
 */

export const AUTH_ENDPOINTS = {
  LOGIN: 'auth:login',
  SIGNUP: 'auth:signup'
} as const;

export const USER_ROLES = {
  ADMINISTRADOR: 'Administrador',
  SERVICIO_SOCIAL: 'ServicioSocial',
  ALBERGUE: 'Albergue'
} as const;

export const AUTH_ERROR_MESSAGES = {
  INVALID_LOGIN_DATA: 'Datos de login inválidos',
  INVALID_SIGNUP_DATA: 'Datos de registro inválidos',
  USER_NOT_FOUND: 'Usuario no encontrado',
  INVALID_PASSWORD: 'Contraseña incorrecta',
  USERNAME_EXISTS: 'El nombre de usuario ya existe',
  PASSWORDS_NOT_MATCH: 'Las contraseñas no coinciden',
  WEAK_PASSWORD: 'La contraseña debe tener al menos 6 caracteres',
  MISSING_REQUIRED_FIELDS: 'Todos los campos obligatorios deben ser completados',
  INTERNAL_SERVER_ERROR: 'Error interno del servidor',
  SUCCESSFUL_LOGIN: 'Inicio de sesión exitoso',
  SUCCESSFUL_SIGNUP: 'Usuario registrado exitosamente'
} as const;

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 6
} as const; 