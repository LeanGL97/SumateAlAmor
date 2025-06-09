"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapBackend = bootstrapBackend;
const users_controller_js_1 = require("./users/users.controller.js");
async function bootstrapBackend(ipc) {
    // Aquí inicializas tus controladores (como NestJS lo haría)
    (0, users_controller_js_1.initUsuarioController)(ipc);
    // En el futuro puedes hacer: initPacienteController(ipc), etc.
}
//# sourceMappingURL=index.js.map