"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROLES = exports.AUTH_ENDPOINTS = void 0;
exports.isValidUserRole = isValidUserRole;
exports.validateLoginData = validateLoginData;
exports.validateSignupData = validateSignupData;
// Runtime type definitions for auth module
exports.AUTH_ENDPOINTS = {
    LOGIN: 'auth:login',
    SIGNUP: 'auth:signup'
};
exports.USER_ROLES = {
    ADMINISTRADOR: 'Administrador',
    SERVICIO_SOCIAL: 'ServicioSocial',
    ALBERGUE: 'Albergue'
};
// Runtime validation functions
function isValidUserRole(role) {
    return Object.values(exports.USER_ROLES).includes(role);
}
function validateLoginData(data) {
    if (!data || typeof data !== 'object' || data === null)
        return false;
    const d = data;
    return typeof d.usuario === 'string' &&
        typeof d.password === 'string' &&
        d.usuario.trim() !== '' &&
        d.password.trim() !== '';
}
function validateSignupData(data) {
    if (!data || typeof data !== 'object' || data === null)
        return false;
    const d = data;
    return typeof d.nombre === 'string' &&
        typeof d.usuario === 'string' &&
        typeof d.direccion === 'string' &&
        typeof d.telefono === 'string' &&
        typeof d.password === 'string' &&
        typeof d.confirmPassword === 'string' &&
        typeof d.rol === 'string' &&
        isValidUserRole(d.rol) &&
        d.nombre.trim() !== '' &&
        d.usuario.trim() !== '' &&
        d.direccion.trim() !== '' &&
        d.telefono.trim() !== '' &&
        d.password.length >= 6 &&
        d.password === d.confirmPassword;
}
//# sourceMappingURL=auth.types.js.map