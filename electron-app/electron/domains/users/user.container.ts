/**
 * User Dependency Container
 * Centralizes dependency injection for the user domain
 */

import { UserSQLiteRepository } from './UserRepository/user.sqlite.repository.js';
import { CreateUserService } from './UserService/Services/create.service.js';
import { GetAllUsersService } from './UserService/Services/get-all.service.js';
import { GetUserByIdService } from './UserService/Services/get-by-id.service.js';
import { SearchUsersService } from './UserService/Services/search.service.js';
import { UpdateUserService } from './UserService/Services/update.service.js';
import { DeleteUserService } from './UserService/Services/delete.service.js';
import { ChangeUserRoleService } from './UserService/Services/change-role.service.js';
import { CreateUserHandler } from './UserController/UserHandlers/create.handler.js';
import { GetAllUsersHandler } from './UserController/UserHandlers/get-all.handler.js';
import { GetUserByIdHandler } from './UserController/UserHandlers/get-by-id.handler.js';
import { SearchUsersHandler } from './UserController/UserHandlers/search.handler.js';
import { UpdateUserHandler } from './UserController/UserHandlers/update.handler.js';
import { DeleteUserHandler } from './UserController/UserHandlers/delete.handler.js';
import { ChangeUserRoleHandler } from './UserController/UserHandlers/change-role.handler.js';

class UserContainer {
  private userRepository!: UserSQLiteRepository;
  private createUserService!: CreateUserService;
  private getAllUsersService!: GetAllUsersService;
  private getUserByIdService!: GetUserByIdService;
  private searchUsersService!: SearchUsersService;
  private updateUserService!: UpdateUserService;
  private deleteUserService!: DeleteUserService;
  private changeUserRoleService!: ChangeUserRoleService;

  private createUserHandler!: CreateUserHandler;
  private getAllUsersHandler!: GetAllUsersHandler;
  private getUserByIdHandler!: GetUserByIdHandler;
  private searchUsersHandler!: SearchUsersHandler;
  private updateUserHandler!: UpdateUserHandler;
  private deleteUserHandler!: DeleteUserHandler;
  private changeUserRoleHandler!: ChangeUserRoleHandler;

  constructor() {
    this.initializeDependencies();
  }

  private initializeDependencies(): void {
    // Initialize repository
    this.userRepository = new UserSQLiteRepository();
    
    // Initialize services with repository injection
    this.createUserService = new CreateUserService(this.userRepository);
    this.getAllUsersService = new GetAllUsersService(this.userRepository);
    this.getUserByIdService = new GetUserByIdService(this.userRepository);
    this.searchUsersService = new SearchUsersService(this.userRepository);
    this.updateUserService = new UpdateUserService(this.userRepository);
    this.deleteUserService = new DeleteUserService(this.userRepository);
    this.changeUserRoleService = new ChangeUserRoleService(this.userRepository);
    
    // Initialize handlers with service injection
    this.createUserHandler = new CreateUserHandler(this.createUserService);
    this.getAllUsersHandler = new GetAllUsersHandler(this.getAllUsersService);
    this.getUserByIdHandler = new GetUserByIdHandler(this.getUserByIdService);
    this.searchUsersHandler = new SearchUsersHandler(this.searchUsersService);
    this.updateUserHandler = new UpdateUserHandler(this.updateUserService);
    this.deleteUserHandler = new DeleteUserHandler(this.deleteUserService);
    this.changeUserRoleHandler = new ChangeUserRoleHandler(this.changeUserRoleService);
  }

  // Repository getters
  public getUserRepository(): UserSQLiteRepository {
    return this.userRepository;
  }

  // Service getters
  public getCreateUserService(): CreateUserService {
    return this.createUserService;
  }

  public getGetAllUsersService(): GetAllUsersService {
    return this.getAllUsersService;
  }

  public getGetUserByIdService(): GetUserByIdService {
    return this.getUserByIdService;
  }

  public getSearchUsersService(): SearchUsersService {
    return this.searchUsersService;
  }

  public getUpdateUserService(): UpdateUserService {
    return this.updateUserService;
  }

  public getDeleteUserService(): DeleteUserService {
    return this.deleteUserService;
  }

  public getChangeUserRoleService(): ChangeUserRoleService {
    return this.changeUserRoleService;
  }

  // Handler getters
  public getCreateHandler(): CreateUserHandler {
    return this.createUserHandler;
  }

  public getGetAllHandler(): GetAllUsersHandler {
    return this.getAllUsersHandler;
  }

  public getGetByIdHandler(): GetUserByIdHandler {
    return this.getUserByIdHandler;
  }

  public getSearchHandler(): SearchUsersHandler {
    return this.searchUsersHandler;
  }

  public getUpdateHandler(): UpdateUserHandler {
    return this.updateUserHandler;
  }

  public getDeleteHandler(): DeleteUserHandler {
    return this.deleteUserHandler;
  }

  public getChangeRoleHandler(): ChangeUserRoleHandler {
    return this.changeUserRoleHandler;
  }
}

// Create and export a single instance
export const userContainer = new UserContainer(); 