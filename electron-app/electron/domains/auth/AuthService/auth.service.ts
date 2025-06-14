/**
 * Main Auth Service
 * Orchestrates authentication operations using dependency injection
 */

import { IAuthRepository } from '../AuthRepository/auth.repository.interface.js';
import { LoginService } from './login.service.js';
import { SignupService } from './signup.service.js';
import { LoginDTO, SignupDTO, AuthResponseDTO } from '../AuthTypes/dtos.js';

export class AuthService {
  private loginService: LoginService;
  private signupService: SignupService;

  constructor(authRepository: IAuthRepository) {
    this.loginService = new LoginService(authRepository);
    this.signupService = new SignupService(authRepository);
  }

  /**
   * Authenticate user login
   */
  async login(loginData: LoginDTO): Promise<AuthResponseDTO> {
    return this.loginService.login(loginData);
  }

  /**
   * Register new user
   */
  async signup(signupData: SignupDTO): Promise<AuthResponseDTO> {
    return this.signupService.signup(signupData);
  }
} 