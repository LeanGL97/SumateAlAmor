/**
 * SQLite Implementation of Auth Repository
 * Handles all database operations for user management
 */

import { getDatabase } from '../../../db/database.js';
import { IAuthRepository } from './auth.repository.interface.js';
import { Usuario, UsuarioWithoutPassword } from '../AuthTypes/dtos.js';

export class AuthSQLiteRepository implements IAuthRepository {
  async findByUsername(username: string): Promise<Usuario | null> {
    try {
      const db = await getDatabase();
      const user = await db.get<Usuario>(
        'SELECT * FROM usuario WHERE usuario = ?',
        [username]
      );
      return user || null;
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw new Error('Database error while finding user');
    }
  }

  async findById(id: string): Promise<Usuario | null> {
    try {
      const db = await getDatabase();
      const user = await db.get<Usuario>(
        'SELECT * FROM usuario WHERE id = ?',
        [id]
      );
      return user || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Database error while finding user');
    }
  }

  async usernameExists(username: string): Promise<boolean> {
    try {
      const db = await getDatabase();
      const existingUser = await db.get<{ id: string }>(
        'SELECT id FROM usuario WHERE usuario = ?',
        [username]
      );
      return !!existingUser;
    } catch (error) {
      console.error('Error checking username existence:', error);
      throw new Error('Database error while checking username');
    }
  }

  async createUser(user: Omit<Usuario, 'id'>): Promise<Usuario> {
    try {
      const db = await getDatabase();
      const userId = crypto.randomUUID();
      
      await db.run(
        `INSERT INTO usuario (id, nombre, correo, usuario, direccion, telefono, password, rol) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          user.nombre,
          user.correo || null,
          user.usuario,
          user.direccion,
          user.telefono,
          user.password,
          user.rol
        ]
      );

      return {
        id: userId,
        ...user
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Database error while creating user');
    }
  }

  async updateUser(id: string, userData: Partial<Usuario>): Promise<Usuario | null> {
    try {
      const db = await getDatabase();
      
      // Build dynamic update query
      const fields = Object.keys(userData).filter(key => key !== 'id');
      if (fields.length === 0) return null;

      const setClause = fields.map(field => `${field} = ?`).join(', ');
      const values = fields.map(field => (userData as Record<string, unknown>)[field]);
      values.push(id);

      await db.run(
        `UPDATE usuario SET ${setClause} WHERE id = ?`,
        values
      );

      return this.findById(id);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Database error while updating user');
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const db = await getDatabase();
      const result = await db.run('DELETE FROM usuario WHERE id = ?', [id]);
      return (result.changes ?? 0) > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Database error while deleting user');
    }
  }

  async getAllUsers(): Promise<UsuarioWithoutPassword[]> {
    try {
      const db = await getDatabase();
      const users = await db.all<Usuario[]>(
        'SELECT id, nombre, correo, usuario, direccion, telefono, rol FROM usuario'
      );
      
      return users.map((user: Usuario) => ({
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        usuario: user.usuario,
        direccion: user.direccion,
        telefono: user.telefono,
        rol: user.rol
      }));
    } catch (error) {
      console.error('Error getting all users:', error);
      throw new Error('Database error while getting users');
    }
  }
} 