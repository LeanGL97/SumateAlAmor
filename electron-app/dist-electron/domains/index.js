"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapBackend = bootstrapBackend;
const users_controller_js_1 = require("./users/users.controller.js");
const auth_controller_js_1 = require("./auth/auth.controller.js");
async function bootstrapBackend(ipc) {
    console.log('🚀 Iniciando bootstrap del backend...');
    // Aquí inicializas tus controladores (como NestJS lo haría)
    console.log('📋 Inicializando controlador de usuarios...');
    (0, users_controller_js_1.initUsuarioController)(ipc);
    console.log('✅ Controlador de usuarios inicializado');
    console.log('📋 Inicializando controlador de autenticación...');
    (0, auth_controller_js_1.initAuthController)(ipc);
    console.log('✅ Controlador de autenticación inicializado');
    console.log('🎉 Bootstrap del backend completado');
    // En el futuro puedes hacer: initPacienteController(ipc), etc.
}
//# sourceMappingURL=index.js.map