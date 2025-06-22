/**
 * Auth Dependency Container
 * Centralizes dependency injection for the auth domain
 * Note: Uses UserRepository from users domain for all user operations
 */

import { AuthService } from './AuthService/auth.service.js';
import { UserSQLiteRepository } from '../users/UserRepository/user.sqlite.repository.js';
import { LoginHandler } from './AuthController/AuthHandlers/login.handler.js';
import { SignupHandler } from './AuthController/AuthHandlers/signup.handler.js';
import { IUserRepository } from '../users/UserRepository/user.repository.interface.js';

class AuthContainer {
  private userRepository!: IUserRepository;
  private authService!: AuthService;
  private loginHandler!: LoginHandler;
  private signupHandler!: SignupHandler;

  constructor() {
    this.initializeDependencies();
  }

  private initializeDependencies(): void {
    this.userRepository = new UserSQLiteRepository();
    this.authService = new AuthService(this.userRepository);
    this.loginHandler = new LoginHandler(this.authService);
    this.signupHandler = new SignupHandler(this.authService);
  }

  public getLoginHandler(): LoginHandler {
    return this.loginHandler;
  }

  public getSignupHandler(): SignupHandler {
    return this.signupHandler;
  }
}

// Create and export a single instance
export const authContainer = new AuthContainer(); 