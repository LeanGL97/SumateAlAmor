/**
 * Main Auth Service
 * Orchestrates authentication operations using dependency injection
 */

import { IUserRepository } from '../../users/UserRepository/user.repository.interface.js';
import { LoginService } from './Services/login.service.js';
import { SignupService } from './Services/signup.service.js';
import { LoginDTO, SignupDTO, AuthResponseDTO } from '../AuthTypes/dtos.js';

export class AuthService {
  private loginService: LoginService;
  private signupService: SignupService;

  constructor(userRepository: IUserRepository) {
    this.loginService = new LoginService(userRepository);
    this.signupService = new SignupService(userRepository);
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