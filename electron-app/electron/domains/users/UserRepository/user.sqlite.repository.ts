/**
 * SQLite Implementation of User Repository
 */

import { getDatabase } from '../../../db/database.js';
import { IUserRepository } from './user.repository.interface.js';
import { User, UpdateUserDTO, UserToCreateDTO } from '../../users/UserTypes/dtos.js';
import { v4 as uuidv4 } from 'uuid';
import { UserNotFoundError, DuplicateUserError } from '../UserTypes/errors.js';

type SQLiteError = Error & {
  code: string;
};

export class UserSQLiteRepository implements IUserRepository {
  async findById(id: string): Promise<User> {
    const db = await getDatabase();
    const user = await db.get<User>('SELECT * FROM users WHERE id = ? AND deleted IS NOT 1', [id]);
    if (!user) {
      throw new UserNotFoundError(`Usuario con id '${id}' no encontrado.`);
    }
    return user;
  }

  async findByUserName(userName: string): Promise<User> {
    const db = await getDatabase();
    const user = await db.get<User>('SELECT * FROM users WHERE userName = ? AND deleted IS NOT 1', [userName]);
    if (!user) {
      throw new UserNotFoundError(`Usuario con nombre de usuario '${userName}' no encontrado.`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    const db = await getDatabase();
    return db.all<User[]>('SELECT * FROM users WHERE deleted IS NOT 1');
  }

  async searchByNameOrUserName(query: string): Promise<User[]> {
    const db = await getDatabase();
    const q = `%${query.toLowerCase()}%`;
    return db.all<User[]>(
      'SELECT * FROM users WHERE (LOWER(searchName) LIKE ? OR LOWER(userName) LIKE ?) AND deleted IS NOT 1',
      [q, q]
    );
  }

  async create(user: UserToCreateDTO): Promise<User> {
    const db = await getDatabase();
    const id = uuidv4();
    const newUser: User = {
      id,
      ...user,
      deleted: false
    };

    try {
      await db.run(
        `INSERT INTO users (id, fullName, searchName, mail, userName, address, phone, passwordHash, role, deleted)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
        [
          newUser.id,
          newUser.fullName,
          newUser.searchName,
          newUser.mail || null,
          newUser.userName,
          newUser.address,
          newUser.phone,
          newUser.passwordHash,
          newUser.role
        ]
      );
      return newUser;
    } catch (err) {
      const error = err as SQLiteError;
      if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('userName')) {
        throw new DuplicateUserError(`El nombre de usuario '${user.userName}' ya está en uso.`);
      }
      throw error; // Re-throw other errors
    }
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const db = await getDatabase();
    // Throws UserNotFoundError if not found
    const user = await this.findById(id); 

    const updatedUser = { ...user, ...data };

    try {
      await db.run(
        `UPDATE users SET fullName = ?, mail = ?, userName = ?, address = ?, phone = ?, role = ? WHERE id = ?`,
        [
          updatedUser.fullName,
          updatedUser.mail,
          updatedUser.userName,
          updatedUser.address,
          updatedUser.phone,
          updatedUser.role,
          id
        ]
      );
      return await this.findById(id); // Return the fully updated user
    } catch (err) {
      const error = err as SQLiteError;
      if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('userName')) {
        throw new DuplicateUserError(`El nombre de usuario '${data.userName}' ya está en uso.`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const db = await getDatabase();
    // First, ensure the user exists, which also throws UserNotFoundError
    await this.findById(id);
    await db.run('UPDATE users SET deleted = 1 WHERE id = ?', [id]);
  }

  async changeRole(id: string, role: string): Promise<User> {
    const db = await getDatabase();
    // Throws UserNotFoundError if not found
    await this.findById(id); 
    await db.run('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    return this.findById(id);
  }
} 