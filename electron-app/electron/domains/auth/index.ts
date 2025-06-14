/**
 * Auth Domain - Main Module
 * Re-exports all auth domain components for easy importing
 */

// Controller
export { initAuthController } from './AuthController/auth.controller.js';

// Services
export { AuthService } from './AuthService/auth.service.js';
export { LoginService } from './AuthService/login.service.js';
export { SignupService } from './AuthService/signup.service.js';

// Repository
export { IAuthRepository } from './AuthRepository/auth.repository.interface.js';
export { AuthSQLiteRepository } from './AuthRepository/auth.sqlite.repository.js';

// Types and DTOs
export * from './AuthTypes/dtos.js';
export * from './AuthTypes/constants.js';
export * from './AuthTypes/validation.js';

// Container
export { AuthContainer } from './auth.container.js'; 