// Runtime type definitions for auth module
export const AUTH_ENDPOINTS = {
  LOGIN: 'auth:login',
  SIGNUP: 'auth:signup'
} as const;

export const USER_ROLES = {
  ADMINISTRADOR: 'Administrador',
  SERVICIO_SOCIAL: 'ServicioSocial',
  ALBERGUE: 'Albergue'
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Runtime validation functions
export function isValidUserRole(role: string): role is UserRole {
  return Object.values(USER_ROLES).includes(role as UserRole);
}

export function validateLoginData(data: unknown): boolean {
  if (!data || typeof data !== 'object' || data === null) return false;
  
  const d = data as Record<string, unknown>;
  
  return typeof d.usuario === 'string' && 
         typeof d.password === 'string' &&
         d.usuario.trim() !== '' &&
         d.password.trim() !== '';
}

export function validateSignupData(data: unknown): boolean {
  if (!data || typeof data !== 'object' || data === null) return false;
  
  const d = data as Record<string, unknown>;
  
  return typeof d.nombre === 'string' &&
         typeof d.usuario === 'string' &&
         typeof d.direccion === 'string' &&
         typeof d.telefono === 'string' &&
         typeof d.password === 'string' &&
         typeof d.confirmPassword === 'string' &&
         typeof d.rol === 'string' &&
         isValidUserRole(d.rol) &&
         d.nombre.trim() !== '' &&
         d.usuario.trim() !== '' &&
         d.direccion.trim() !== '' &&
         d.telefono.trim() !== '' &&
         d.password.length >= 6 &&
         d.password === d.confirmPassword;
} 