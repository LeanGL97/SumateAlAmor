/**
 * Authentication Utilities
 * Handles password hashing, verification, and UUID generation
 */

import * as crypto from 'crypto';

/**
 * Hash a password using PBKDF2 with salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify a password against its hash
 */
export function verifyPassword(password: string, hashedPassword: string): boolean {
  const [salt, hash] = hashedPassword.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

/**
 * Generate a UUID for user identification
 */
export function generateUUID(): string {
  return crypto.randomUUID();
} 