/**
 * Validation functions for Auth Domain
 * Handles data validation for login and signup operations
 */

import { UserRoleEnum } from './dtos.js';
import { USER_ROLES, PASSWORD_REQUIREMENTS } from './constants.js';

export function isValidUserRole(role: string): role is UserRoleEnum {
  return Object.values(USER_ROLES).includes(role as UserRoleEnum);
}

export function validateLoginData(data: unknown): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!data || typeof data !== 'object' || data === null) {
    errors.general = 'Datos de login inválidos.';
    return { isValid: false, errors };
  }

  const d = data as Record<string, unknown>;

  if (!d.userName || typeof d.userName !== 'string' || d.userName.trim() === '') {
    errors.userName = 'El nombre de usuario es requerido.';
  }
  if (!d.password || typeof d.password !== 'string' || d.password.trim() === '') {
    errors.password = 'La contraseña es requerida.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateSignupData(data: unknown): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!data || typeof data !== 'object' || data === null) {
    errors.general = 'Datos de registro inválidos.';
    return { isValid: false, errors };
  }

  const d = data as Record<string, unknown>;

  // Check required fields & non-empty strings
  if (!d.fullName || typeof d.fullName !== 'string' || d.fullName.trim() === '') {
    errors.fullName = "El campo 'Nombre' es requerido.";
  }
  if (!d.userName || typeof d.userName !== 'string' || d.userName.trim() === '') {
    errors.userName = "El campo 'Usuario' es requerido.";
  }
  if (!d.address || typeof d.address !== 'string' || d.address.trim() === '') {
    errors.address = "El campo 'Dirección' es requerido.";
  }
  if (!d.phone || typeof d.phone !== 'string' || d.phone.trim() === '') {
    errors.phone = "El campo 'Teléfono' es requerido.";
  }
  if (!d.role || typeof d.role !== 'string' || !isValidUserRole(d.role)) {
    errors.role = "El 'Rol' seleccionado no es válido.";
  }

  // Validate password
  if (!d.password || typeof d.password !== 'string') {
    errors.password = "El campo 'Contraseña' es requerido.";
  } else {
    if (d.password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
      errors.password = `La contraseña debe tener al menos ${PASSWORD_REQUIREMENTS.MIN_LENGTH} caracteres.`;
    }
    if (d.password !== d.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validatePasswordStrength(password: string): boolean {
  return password.length >= PASSWORD_REQUIREMENTS.MIN_LENGTH;
}

export function validatePasswordConfirmation(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
} 