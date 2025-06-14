/**
 * Validation functions for Auth Domain
 * Handles data validation for login and signup operations
 */

import { LoginDTO, SignupDTO, UserRole } from './dtos.js';
import { USER_ROLES, PASSWORD_REQUIREMENTS } from './constants.js';

export function isValidUserRole(role: string): role is UserRole {
  return Object.values(USER_ROLES).includes(role as UserRole);
}

export function validateLoginData(data: unknown): data is LoginDTO {
  if (!data || typeof data !== 'object' || data === null) return false;
  
  const d = data as Record<string, unknown>;
  
  return typeof d.usuario === 'string' && 
         typeof d.password === 'string' &&
         d.usuario.trim() !== '' &&
         d.password.trim() !== '';
}

export function validateSignupData(data: unknown): data is SignupDTO {
  if (!data || typeof data !== 'object' || data === null) return false;
  
  const d = data as Record<string, unknown>;
  
  // Check required fields
  if (typeof d.nombre !== 'string' ||
      typeof d.usuario !== 'string' ||
      typeof d.direccion !== 'string' ||
      typeof d.telefono !== 'string' ||
      typeof d.password !== 'string' ||
      typeof d.confirmPassword !== 'string' ||
      typeof d.rol !== 'string') {
    return false;
  }

  // Check non-empty strings
  if (d.nombre.trim() === '' ||
      d.usuario.trim() === '' ||
      d.direccion.trim() === '' ||
      d.telefono.trim() === '') {
    return false;
  }

  // Validate role
  if (!isValidUserRole(d.rol)) {
    return false;
  }

  // Validate password strength
  if (d.password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    return false;
  }

  // Validate password confirmation
  if (d.password !== d.confirmPassword) {
    return false;
  }

  return true;
}

export function validatePasswordStrength(password: string): boolean {
  return password.length >= PASSWORD_REQUIREMENTS.MIN_LENGTH;
}

export function validatePasswordConfirmation(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
} 