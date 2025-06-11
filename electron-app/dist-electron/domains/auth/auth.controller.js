"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAuthController = initAuthController;
const auth_service_js_1 = require("./auth.service.js");
const auth_types_js_1 = require("./auth.types.js");
function initAuthController(ipc) {
    console.log('🔐 Inicializando controlador de autenticación...');
    const authService = new auth_service_js_1.AuthService();
    console.log('✅ Servicio de autenticación creado');
    // Login endpoint
    ipc.handle('auth:login', async (event, loginData) => {
        console.log('📥 Login endpoint llamado con datos:', loginData);
        // Validate input data
        if (!(0, auth_types_js_1.validateLoginData)(loginData)) {
            console.log('❌ Datos de login inválidos');
            return {
                success: false,
                message: 'Datos de login inválidos'
            };
        }
        try {
            console.log('Login attempt for user:', loginData.usuario);
            const result = await authService.login(loginData);
            console.log('Login result:', result.success ? 'Success' : 'Failed');
            return result;
        }
        catch (error) {
            console.error('Error in auth:login handler:', error);
            return {
                success: false,
                message: 'Error interno del servidor'
            };
        }
    });
    // Signup endpoint
    ipc.handle('auth:signup', async (event, signupData) => {
        console.log('📥 Signup endpoint llamado con datos:', signupData);
        // Validate input data
        if (!(0, auth_types_js_1.validateSignupData)(signupData)) {
            console.log('❌ Datos de signup inválidos');
            return {
                success: false,
                message: 'Datos de registro inválidos'
            };
        }
        try {
            console.log('Signup attempt for user:', signupData.usuario);
            const result = await authService.signup(signupData);
            console.log('Signup result:', result.success ? 'Success' : 'Failed');
            return result;
        }
        catch (error) {
            console.error('Error in auth:signup handler:', error);
            return {
                success: false,
                message: 'Error interno del servidor'
            };
        }
    });
    console.log('✅ Endpoints de autenticación registrados: auth:login, auth:signup');
}
//# sourceMappingURL=auth.controller.js.map