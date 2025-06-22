/**
 * User Domain Validation Functions
 */

import { CreateUserDTO, UpdateUserDTO, UserRoleEnum } from './dtos.js';
import { USER_PASSWORD_REQUIREMENTS } from './constants.js';

export function isValidUserRole(role: string): role is UserRoleEnum {
  return Object.values(UserRoleEnum).includes(role as UserRoleEnum);
}

export function validateCreateUserData(data: unknown): { isValid: boolean, errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!data || typeof data !== 'object' || data === null) {
    errors.general = 'Datos de creación inválidos.';
    return { isValid: false, errors };
  }

  const d = data as CreateUserDTO;

  if (!d.fullName || d.fullName.trim() === '') {
    errors.fullName = 'El nombre completo es requerido.';
  }
  if (!d.userName || d.userName.trim() === '') {
    errors.userName = 'El nombre de usuario es requerido.';
  }
  if (!d.address || d.address.trim() === '') {
    errors.address = 'La dirección es requerida.';
  }
  if (!d.phone || d.phone.trim() === '') {
    errors.phone = 'El teléfono es requerido.';
  }
  if (!d.role || !isValidUserRole(d.role)) {
    errors.role = 'El rol seleccionado no es válido.';
  }
  if (!d.password) {
    errors.password = 'La contraseña es requerida.';
  } else if (d.password.length < USER_PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    errors.password = `La contraseña debe tener al menos ${USER_PASSWORD_REQUIREMENTS.MIN_LENGTH} caracteres.`;
  }
  if (d.password !== d.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden.';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateUpdateUserData(data: unknown): { isValid: boolean, errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!data || typeof data !== 'object' || data === null) {
    errors.general = 'Datos de actualización inválidos.';
    return { isValid: false, errors };
  }

  const d = data as UpdateUserDTO;

  if (d.fullName !== undefined && d.fullName.trim() === '') {
    errors.fullName = 'El nombre completo no puede estar vacío.';
  }
  if (d.userName !== undefined && d.userName.trim() === '') {
    errors.userName = 'El nombre de usuario no puede estar vacío.';
  }
  if (d.address !== undefined && d.address.trim() === '') {
    errors.address = 'La dirección no puede estar vacía.';
  }
  if (d.phone !== undefined && d.phone.trim() === '') {
    errors.phone = 'El teléfono no puede estar vacío.';
  }
  if (d.role !== undefined && !isValidUserRole(d.role)) {
    errors.role = 'El rol seleccionado no es válido.';
  }
  if (d.password !== undefined) {
    if (d.password.length < USER_PASSWORD_REQUIREMENTS.MIN_LENGTH) {
      errors.password = `La contraseña debe tener al menos ${USER_PASSWORD_REQUIREMENTS.MIN_LENGTH} caracteres.`;
    }
    if (d.confirmPassword !== undefined && d.password !== d.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden.';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateUserId(id: unknown): { isValid: boolean, errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!id || typeof id !== 'string' || id.trim() === '') {
    errors.id = 'El ID del usuario es requerido.';
  } else if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    errors.id = 'El ID del usuario debe ser un UUID válido.';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateChangeRoleData(data: unknown): { isValid: boolean, errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!data || typeof data !== 'object' || data === null) {
    errors.general = 'Datos de cambio de rol inválidos.';
    return { isValid: false, errors };
  }

  const d = data as { role?: string };

  if (!d.role || typeof d.role !== 'string' || !isValidUserRole(d.role)) {
    errors.role = 'El rol seleccionado no es válido.';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
} 