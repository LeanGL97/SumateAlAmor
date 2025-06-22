"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapBackend = bootstrapBackend;
const user_controller_js_1 = require("./users/UserController/user.controller.js");
const auth_controller_js_1 = require("./auth/AuthController/auth.controller.js");
const constants_js_1 = require("./auth/AuthTypes/constants.js");
async function bootstrapBackend(ipc) {
    console.log('🚀 Iniciando backend...');
    // Inicializa los controladores de dominio
    (0, user_controller_js_1.initUserController)(ipc);
    // Registra los endpoints de autenticación
    ipc.handle(constants_js_1.AUTH_ENDPOINTS.LOGIN, auth_controller_js_1.AuthController.login);
    ipc.handle(constants_js_1.AUTH_ENDPOINTS.SIGNUP, auth_controller_js_1.AuthController.signup);
    console.log('✅ Endpoints de autenticación registrados.');
    console.log('🎉 Backend iniciado correctamente.');
}
//# sourceMappingURL=index.js.map