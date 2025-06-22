/**
 * User Domain - Main Module
 * Re-exports all user domain components for easy importing
 */

// Controller
export { initUserController } from './UserController/user.controller.js';

// Services
export { CreateUserService } from './UserService/Services/create.service.js';
export { GetAllUsersService } from './UserService/Services/get-all.service.js';
export { GetUserByIdService } from './UserService/Services/get-by-id.service.js';
export { SearchUsersService } from './UserService/Services/search.service.js';
export { UpdateUserService } from './UserService/Services/update.service.js';
export { DeleteUserService } from './UserService/Services/delete.service.js';
export { ChangeUserRoleService } from './UserService/Services/change-role.service.js';

// Repository
export { IUserRepository } from './UserRepository/user.repository.interface.js';
export { UserSQLiteRepository } from './UserRepository/user.sqlite.repository.js';

// Types and DTOs
export * from './UserTypes/dtos.js';
export * from './UserTypes/constants.js';
export * from './UserTypes/validation.js';

// Container
export { userContainer } from './user.container.js'; 