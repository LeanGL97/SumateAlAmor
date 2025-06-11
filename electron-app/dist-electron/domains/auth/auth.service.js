"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_js_1 = require("../../db/database.js");
const crypto = __importStar(require("crypto"));
// Simple bcrypt-like function for password hashing (we'll use crypto for now)
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}
function verifyPassword(password, hashedPassword) {
    const [salt, hash] = hashedPassword.split(':');
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
}
function generateUUID() {
    return crypto.randomUUID();
}
class AuthService {
    async login(loginData) {
        try {
            const db = await (0, database_js_1.getDatabase)();
            // Validate required fields
            if (!loginData.usuario || !loginData.password) {
                return {
                    success: false,
                    message: 'Usuario y contraseña son requeridos'
                };
            }
            // Find user by username
            const user = await db.get('SELECT * FROM usuario WHERE usuario = ?', [loginData.usuario]);
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
        }
        catch (error) {
            console.error('Error en login:', error);
            return {
                success: false,
                message: 'Error interno del servidor'
            };
        }
    }
    async signup(signupData) {
        try {
            const db = await (0, database_js_1.getDatabase)();
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
            const existingUser = await db.get('SELECT id FROM usuario WHERE usuario = ?', [signupData.usuario]);
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
            await db.run(`INSERT INTO usuario (id, nombre, correo, usuario, direccion, telefono, password, rol) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
                userId,
                signupData.nombre,
                signupData.correo || null,
                signupData.usuario,
                signupData.direccion,
                signupData.telefono,
                hashedPassword,
                signupData.rol
            ]);
            // Return user without password
            const newUser = {
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
        }
        catch (error) {
            console.error('Error en signup:', error);
            return {
                success: false,
                message: 'Error interno del servidor'
            };
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map