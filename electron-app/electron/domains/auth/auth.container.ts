/**
 * Auth Dependency Container
 * Centralizes dependency injection for the auth domain
 */

import { AuthService } from './AuthService/auth.service.js';
import { AuthSQLiteRepository } from './AuthRepository/auth.sqlite.repository.js';
import { LoginHandler } from './AuthController/AuthHandlers/login.handler.js';
import { SignupHandler } from './AuthController/AuthHandlers/signup.handler.js';

export class AuthContainer {
  private static instance: AuthContainer;
  private authRepository!: AuthSQLiteRepository;
  private authService!: AuthService;
  private loginHandler!: LoginHandler;
  private signupHandler!: SignupHandler;

  private constructor() {
    this.initializeDependencies();
  }

  public static getInstance(): AuthContainer {
    if (!AuthContainer.instance) {
      AuthContainer.instance = new AuthContainer();
    }
    return AuthContainer.instance;
  }

  private initializeDependencies(): void {
    // Initialize repository
    this.authRepository = new AuthSQLiteRepository();
    
    // Initialize service with repository injection
    this.authService = new AuthService(this.authRepository);
    
    // Initialize handlers with service injection
    this.loginHandler = new LoginHandler(this.authService);
    this.signupHandler = new SignupHandler(this.authService);
  }

  public getAuthRepository(): AuthSQLiteRepository {
    return this.authRepository;
  }

  public getAuthService(): AuthService {
    return this.authService;
  }

  public getLoginHandler(): LoginHandler {
    return this.loginHandler;
  }

  public getSignupHandler(): SignupHandler {
    return this.signupHandler;
  }
} 