/**
 * Auth Domain - Main Module
 * Re-exports all auth domain components for easy importing
 * Note: User operations are handled by the users domain
 */

// Controller
export { AuthController } from './AuthController/auth.controller.js';

// Services
export { AuthService } from './AuthService/auth.service.js';
export { LoginService } from './AuthService/Services/login.service.js';
export { SignupService } from './AuthService/Services/signup.service.js';

// Types and DTOs
export * from './AuthTypes/dtos.js';
export * from './AuthTypes/constants.js';
export * from './AuthTypes/validation.js';

// Container
export { authContainer } from './auth.container.js'; 