import { getDatabase } from '../../db/database.js';
import { Usuario, LoginRequest, SignupRequest, AuthResponse } from './auth.model.js';
import * as crypto from 'crypto';

// Simple bcrypt-like function for password hashing (we'll use crypto for now)
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, hashedPassword: string): boolean {
  const [salt, hash] = hashedPassword.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

function generateUUID(): string {
  return crypto.randomUUID();
}

export class AuthService {
  async login(loginData: LoginRequest): Promise<AuthResponse> {
    try {
      const db = await getDatabase();
      
      // Validate required fields
      if (!loginData.usuario || !loginData.password) {
        return {
          success: false,
          message: 'Usuario y contraseña son requeridos'
        };
      }

      // Find user by username
      const user = await db.get<Usuario>(
        'SELECT * FROM usuario WHERE usuario = ?',
        [loginData.usuario]
      );

      if (!user) {
        return {
          success: false,
          message: 'Usuario no encontrado'
        };
      }

      // Verify password
      if (!verifyPassword(loginData.password, user.password)) {
        return {
          success: false,
          message: 'Contraseña incorrecta'
        };
      }

      // Return user without password
      const userWithoutPassword = {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        usuario: user.usuario,
        direccion: user.direccion,
        telefono: user.telefono,
        rol: user.rol
      };
      
      return {
        success: true,
        message: 'Inicio de sesión exitoso',
        user: userWithoutPassword
      };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: 'Error interno del servidor'
      };
    }
  }

  async signup(signupData: SignupRequest): Promise<AuthResponse> {
    try {
      const db = await getDatabase();
      
      // Validate required fields
      if (!signupData.nombre || !signupData.usuario || !signupData.direccion || 
          !signupData.telefono || !signupData.password || !signupData.rol) {
        return {
          success: false,
          message: 'Todos los campos obligatorios deben ser completados'
        };
      }

      // Validate password confirmation
      if (signupData.password !== signupData.confirmPassword) {
        return {
          success: false,
          message: 'Las contraseñas no coinciden'
        };
      }

      // Validate password strength (minimum 6 characters)
      if (signupData.password.length < 6) {
        return {
          success: false,
          message: 'La contraseña debe tener al menos 6 caracteres'
        };
      }

      // Check if username already exists
      const existingUser = await db.get<Usuario>(
        'SELECT id FROM usuario WHERE usuario = ?',
        [signupData.usuario]
      );

      if (existingUser) {
        return {
          success: false,
          message: 'El nombre de usuario ya existe'
        };
      }

      // Hash password
      const hashedPassword = hashPassword(signupData.password);

      // Generate UUID
      const userId = generateUUID();

      // Insert new user
      await db.run(
        `INSERT INTO usuario (id, nombre, correo, usuario, direccion, telefono, password, rol) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          signupData.nombre,
          signupData.correo || null,
          signupData.usuario,
          signupData.direccion,
          signupData.telefono,
          hashedPassword,
          signupData.rol
        ]
      );

      // Return user without password
      const newUser: Omit<Usuario, 'password'> = {
        id: userId,
        nombre: signupData.nombre,
        correo: signupData.correo,
        usuario: signupData.usuario,
        direccion: signupData.direccion,
        telefono: signupData.telefono,
        rol: signupData.rol
      };

      return {
        success: true,
        message: 'Usuario registrado exitosamente',
        user: newUser
      };
    } catch (error) {
      console.error('Error en signup:', error);
      return {
        success: false,
        message: 'Error interno del servidor'
      };
    }
  }
} 