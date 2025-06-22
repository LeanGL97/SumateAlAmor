/**
 * Custom Error Classes for User Domain
 */

export class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class UserNotFoundError extends UserError {
  constructor(message = 'El usuario no fue encontrado.') {
    super(message);
  }
}

export class DuplicateUserError extends UserError {
  constructor(message = 'Ya existe un usuario con ese nombre de usuario.') {
    super(message);
  }
} 