/**
 * Enhanced Validation functions for Auth Domain
 * Handles robust data validation for login and signup operations
 * Implements security best practices and input sanitization
 */

import { UserRoleEnum } from './dtos.js';
import { USER_ROLES } from './constants.js';

// Validation result type
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Field validation types
export interface FieldValidation {
  value: unknown;
  fieldName: string;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidation?: (value: string) => string | null;
}

// Common validation functions
export class ValidationUtils {
  /**
   * Sanitizes a string input by trimming whitespace
   */
  static sanitizeString(value: unknown): string {
    if (typeof value !== 'string') return '';
    return value.trim();
  }

  /**
   * Validates if a value is a non-empty string
   */
  static validateRequiredString(value: unknown, fieldName: string): string | null {
    const sanitized = this.sanitizeString(value);
    if (!sanitized) {
      return `El campo '${fieldName}' es requerido.`;
    }
    return null;
  }

  /**
   * Validates string length constraints
   */
  static validateStringLength(
    value: string, 
    fieldName: string, 
    minLength?: number, 
    maxLength?: number
  ): string | null {
    if (minLength && value.length < minLength) {
      return `El campo '${fieldName}' debe tener al menos ${minLength} caracteres.`;
    }
    if (maxLength && value.length > maxLength) {
      return `El campo '${fieldName}' no puede exceder ${maxLength} caracteres.`;
    }
    return null;
  }

  /**
   * Validates string against a regex pattern
   */
  static validatePattern(
    value: string, 
    fieldName: string, 
    pattern: RegExp, 
    errorMessage: string
  ): string | null {
    if (!pattern.test(value)) {
      return errorMessage;
    }
    return null;
  }

  /**
   * Validates a complete field with all constraints
   */
  static validateField(validation: FieldValidation): string | null {
    const { value, fieldName, isRequired = true, minLength, maxLength, pattern, customValidation } = validation;

    // Check if required
    if (isRequired) {
      const requiredError = this.validateRequiredString(value, fieldName);
      if (requiredError) return requiredError;
    } else if (!value) {
      return null; // Optional field is empty, skip other validations
    }

    const sanitized = this.sanitizeString(value);

    // Length validation
    if (sanitized) {
      const lengthError = this.validateStringLength(sanitized, fieldName, minLength, maxLength);
      if (lengthError) return lengthError;

      // Pattern validation
      if (pattern) {
        const patternError = this.validatePattern(sanitized, fieldName, pattern, `El campo '${fieldName}' tiene un formato inválido.`);
        if (patternError) return patternError;
      }

      // Custom validation
      if (customValidation) {
        const customError = customValidation(sanitized);
        if (customError) return customError;
      }
    }

    return null;
  }
}

// Email validation
export class EmailValidator {
  private static EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static MAX_EMAIL_LENGTH = 254; // RFC 5321 limit

  static validate(email: string): string | null {
    return ValidationUtils.validateField({
      value: email,
      fieldName: 'Email',
      isRequired: false,
      maxLength: this.MAX_EMAIL_LENGTH,
      pattern: this.EMAIL_PATTERN,
      customValidation: (value) => {
        if (value && !this.EMAIL_PATTERN.test(value)) {
          return 'El formato del email no es válido.';
        }
        return null;
      }
    });
  }
}

// Phone validation
export class PhoneValidator {
  private static PHONE_PATTERN = /^[+]?[0-9\s\-()]{7,15}$/;
  private static MAX_PHONE_LENGTH = 15;

  static validate(phone: string): string | null {
    return ValidationUtils.validateField({
      value: phone,
      fieldName: 'Teléfono',
      minLength: 7,
      maxLength: this.MAX_PHONE_LENGTH,
      pattern: this.PHONE_PATTERN,
      customValidation: (value) => {
        // Remove all non-digit characters for length check
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 7) {
          return 'El número de teléfono debe tener al menos 7 dígitos.';
        }
        if (digitsOnly.length > 15) {
          return 'El número de teléfono no puede exceder 15 dígitos.';
        }
        return null;
      }
    });
  }
}

// Password validation
export class PasswordValidator {
  static readonly MIN_LENGTH = 8;
  static readonly MAX_LENGTH = 128;
  private static PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

  static validate(password: string): string | null {
    return ValidationUtils.validateField({
      value: password,
      fieldName: 'Contraseña',
      minLength: this.MIN_LENGTH,
      maxLength: this.MAX_LENGTH,
      customValidation: (value) => {
        // Check for at least one lowercase letter
        if (!/[a-z]/.test(value)) {
          return 'La contraseña debe contener al menos una letra minúscula.';
        }
        
        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(value)) {
          return 'La contraseña debe contener al menos una letra mayúscula.';
        }
        
        // Check for at least one digit
        if (!/\d/.test(value)) {
          return 'La contraseña debe contener al menos un número.';
        }
        
        // Check for at least one special character
        if (!/[@$!%*?&]/.test(value)) {
          return 'La contraseña debe contener al menos un carácter especial (@$!%*?&).';
        }

        // Check for common weak patterns
        if (/(.)\1{2,}/.test(value)) {
          return 'La contraseña no puede contener caracteres repetidos consecutivos.';
        }

        return null;
      }
    });
  }

  static validateConfirmation(password: string, confirmPassword: string): string | null {
    if (password !== confirmPassword) {
      return 'Las contraseñas no coinciden.';
    }
    return null;
  }
}

// User role validation
export class RoleValidator {
  static validate(role: string): string | null {
    return ValidationUtils.validateField({
      value: role,
      fieldName: 'Rol',
      customValidation: (value) => {
        if (!Object.values(USER_ROLES).includes(value as UserRoleEnum)) {
          return `El rol '${value}' no es válido. Los roles permitidos son: ${Object.values(USER_ROLES).join(', ')}.`;
        }
        return null;
      }
    });
  }

  static isValidUserRole(role: string): role is UserRoleEnum {
    return Object.values(USER_ROLES).includes(role as UserRoleEnum);
  }
}

// Main validation functions
export function validateLoginData(data: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  // Type guard for data object
  if (!data || typeof data !== 'object' || data === null) {
    errors.general = 'Datos de login inválidos.';
    return { isValid: false, errors };
  }

  // Safe type assertion with validation
  const loginData = data as Record<string, unknown>;

  // Validate username
  const usernameError = ValidationUtils.validateField({
    value: loginData.userName,
    fieldName: 'Usuario',
    minLength: 3,
    maxLength: 50,
    customValidation: (value) => {
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return 'El nombre de usuario solo puede contener letras, números y guiones bajos.';
      }
      return null;
    }
  });
  if (usernameError) errors.userName = usernameError;

  // Validate password
  const passwordError = ValidationUtils.validateField({
    value: loginData.password,
    fieldName: 'Contraseña',
    minLength: 1, // For login, we just need non-empty
    maxLength: PasswordValidator.MAX_LENGTH
  });
  if (passwordError) errors.password = passwordError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateSignupData(data: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  // Type guard for data object
  if (!data || typeof data !== 'object' || data === null) {
    errors.general = 'Datos de registro inválidos.';
    return { isValid: false, errors };
  }

  // Safe type assertion with validation
  const signupData = data as Record<string, unknown>;

  // Validate full name
  const fullNameError = ValidationUtils.validateField({
    value: signupData.fullName,
    fieldName: 'Nombre completo',
    minLength: 2,
    maxLength: 100,
    customValidation: (value) => {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
        return 'El nombre solo puede contener letras y espacios.';
      }
      return null;
    }
  });
  if (fullNameError) errors.fullName = fullNameError;

  // Validate email (optional)
  if (signupData.mail && typeof signupData.mail === 'string') {
    const emailError = EmailValidator.validate(signupData.mail);
    if (emailError) errors.mail = emailError;
  }

  // Validate username
  const usernameError = ValidationUtils.validateField({
    value: signupData.userName,
    fieldName: 'Usuario',
    minLength: 3,
    maxLength: 50,
    customValidation: (value) => {
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return 'El nombre de usuario solo puede contener letras, números y guiones bajos.';
      }
      return null;
    }
  });
  if (usernameError) errors.userName = usernameError;

  // Validate address
  const addressError = ValidationUtils.validateField({
    value: signupData.address,
    fieldName: 'Dirección',
    minLength: 5,
    maxLength: 200
  });
  if (addressError) errors.address = addressError;

  // Validate phone
  if (typeof signupData.phone === 'string') {
    const phoneError = PhoneValidator.validate(signupData.phone);
    if (phoneError) errors.phone = phoneError;
  }

  // Validate role
  if (typeof signupData.role === 'string') {
    const roleError = RoleValidator.validate(signupData.role);
    if (roleError) errors.role = roleError;
  }

  // Validate password
  if (typeof signupData.password === 'string') {
    const passwordError = PasswordValidator.validate(signupData.password);
    if (passwordError) errors.password = passwordError;
  }

  // Validate password confirmation
  if (typeof signupData.password === 'string' && typeof signupData.confirmPassword === 'string') {
    const confirmError = PasswordValidator.validateConfirmation(
      signupData.password,
      signupData.confirmPassword
    );
    if (confirmError) errors.confirmPassword = confirmError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Legacy functions for backward compatibility
export function validatePasswordStrength(password: string): boolean {
  const error = PasswordValidator.validate(password);
  return error === null;
}

export function validatePasswordConfirmation(password: string, confirmPassword: string): boolean {
  const error = PasswordValidator.validateConfirmation(password, confirmPassword);
  return error === null;
} 