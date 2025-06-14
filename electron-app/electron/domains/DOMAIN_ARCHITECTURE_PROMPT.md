# PROMPT PARA CURSOR: Refactorización completa del dominio {DOMAIN_NAME}

Refactoriza completamente el dominio {DOMAIN_NAME} de acuerdo con las siguientes instrucciones. Esta refactorización debe mantener el mismo comportamiento del sistema actual, pero aplicando una mejor arquitectura basada en separación de responsabilidades, tipado fuerte y modularidad.

## 1. 🔧 ESTRUCTURA DEL DOMINIO {DOMAIN_NAME}

### 📁 1.1 {DOMAIN_NAME}Controller
Crea una carpeta: {DOMAIN_NAME}/{DOMAIN_NAME}Controller

Dentro de ella:
- Crea el archivo {DOMAIN_NAME}.controller.ts que solo debe contener la función principal `init{DOMAIN_NAME}Controller`
- No debe tener lógica de los endpoints directamente
- Crea la subcarpeta {DOMAIN_NAME}Handlers dentro de {DOMAIN_NAME}Controller:
  - Crea un archivo para cada operación CRUD: `create.handler.ts`, `read.handler.ts`, `update.handler.ts`, `delete.handler.ts`
  - Cada handler debe exportar una clase que maneje esa operación específica
  - Los handlers deben ser llamados desde {DOMAIN_NAME}.controller.ts

### 📁 1.2 {DOMAIN_NAME}Types
Crea una carpeta: {DOMAIN_NAME}/{DOMAIN_NAME}Types

Divide los tipos en los siguientes módulos:
- `dtos.ts` → define interfaces para los datos de entrada/salida, como Create{DOMAIN_NAME}DTO, Update{DOMAIN_NAME}DTO, etc.
- `constants.ts` → define {DOMAIN_NAME}_ENDPOINTS, {DOMAIN_NAME}_STATUS, y demás constantes
- `validation.ts` → define validateCreate{DOMAIN_NAME}Data, validateUpdate{DOMAIN_NAME}Data, etc.
- `types.ts` → define tipos puros no DTOs si es necesario

### 📁 1.3 {DOMAIN_NAME}Service
Crea una carpeta: {DOMAIN_NAME}/{DOMAIN_NAME}Service

Dentro:
- Divide la lógica en varios archivos:
  - `create.service.ts` → lógica completa de creación
  - `read.service.ts` → lógica completa de lectura
  - `update.service.ts` → lógica completa de actualización
  - `delete.service.ts` → lógica completa de eliminación
  - `{DOMAIN_NAME}.service.ts` → archivo central que importe y exponga las funciones
- Elimina del controlador cualquier validación o lógica que pueda estar aquí

### 📁 1.4 {DOMAIN_NAME}Repository
Crea una carpeta: {DOMAIN_NAME}/{DOMAIN_NAME}Repository

Dentro:
- `{DOMAIN_NAME}.repository.interface.ts` → interfaz del repositorio
- `{DOMAIN_NAME}.sqlite.repository.ts` → implementación concreta para SQLite
- `index.ts` → reexportaciones

## 2. 🧾 TIPADO COMPLETO
- Tipa todas las variables, funciones, parámetros, y retornos en todo el módulo {DOMAIN_NAME}
- Usa `interface` para objetos de datos estructurados, y `type` para tipos derivados o utilitarios
- Todos los DTOs deben seguir la convención de nombres: Create{DOMAIN_NAME}DTO, Update{DOMAIN_NAME}DTO, {DOMAIN_NAME}ResponseDTO, etc.
- Los validadores deben trabajar con los DTOs correspondientes

## 3. 🧠 SEPARACIÓN DE RESPONSABILIDADES (SoC)

### Controlador ({DOMAIN_NAME}.controller.ts)
- Solo debe recibir las peticiones desde ipc, pasar los datos al handler correspondiente, y retornar la respuesta
- No debe tener validaciones ni lógica de negocio

### Handlers ({DOMAIN_NAME}Handlers)
- Reciben la solicitud desde el controlador, llaman a los servicios, y retornan el resultado
- No deben tener lógica compleja ni validaciones, solo orquestación

### Servicios ({DOMAIN_NAME}Service)
- Toda la lógica de negocio va aquí: validaciones, persistencia, transformaciones, etc.
- Maneja y devuelve errores formateados

### Repositorio ({DOMAIN_NAME}Repository)
- Toda la lógica de persistencia y acceso a datos
- Implementa la interfaz del repositorio

## 4. 💉 INYECCIÓN DE DEPENDENCIAS
- Implementa inyección de dependencias en todo el módulo
- Evita instanciaciones directas dentro de handlers o controladores
- Crea un archivo `{DOMAIN_NAME}.container.ts` para registrar y resolver dependencias
- Los handlers y controladores reciben las dependencias mediante el contenedor

## 5. ✅ INTEGRACIÓN Y FUNCIONALIDAD
- Todos los módulos deben seguir funcionando exactamente igual en cuanto a lógica
- Debe mantenerse el funcionamiento correcto de los ipc.handle('{DOMAIN_NAME}:create'), ipc.handle('{DOMAIN_NAME}:read'), etc.
- Asegúrate de importar/exportar correctamente entre los módulos
- Usa los {DOMAIN_NAME}_ENDPOINTS.CREATE, {DOMAIN_NAME}_ENDPOINTS.READ, etc. en vez de strings literales

## 6. 📁 ESTRUCTURA DE ARCHIVOS ESPERADA

```
{DOMAIN_NAME}/
├── {DOMAIN_NAME}Controller/
│   ├── {DOMAIN_NAME}Handlers/
│   │   ├── create.handler.ts
│   │   ├── read.handler.ts
│   │   ├── update.handler.ts
│   │   └── delete.handler.ts
│   ├── {DOMAIN_NAME}.controller.ts
│   └── index.ts
├── {DOMAIN_NAME}Types/
│   ├── dtos.ts
│   ├── constants.ts
│   ├── validation.ts
│   ├── types.ts (opcional)
│   └── index.ts
├── {DOMAIN_NAME}Service/
│   ├── create.service.ts
│   ├── read.service.ts
│   ├── update.service.ts
│   ├── delete.service.ts
│   ├── {DOMAIN_NAME}.service.ts
│   └── index.ts
├── {DOMAIN_NAME}Repository/
│   ├── {DOMAIN_NAME}.repository.interface.ts
│   ├── {DOMAIN_NAME}.sqlite.repository.ts
│   └── index.ts
├── {DOMAIN_NAME}.container.ts
└── index.ts
```

## 7. 🧪 EJEMPLO DE RESULTADO ESPERADO

### {DOMAIN_NAME}.controller.ts
```typescript
import { ipcMain } from 'electron';
import { {DOMAIN_NAME}Container } from '../{DOMAIN_NAME}.container.js';
import { {DOMAIN_NAME}_ENDPOINTS } from '../{DOMAIN_NAME}Types/constants';

export function init{DOMAIN_NAME}Controller(ipc = ipcMain) {
  const container = {DOMAIN_NAME}Container.getInstance();
  const createHandler = container.getCreateHandler();
  const readHandler = container.getReadHandler();
  const updateHandler = container.getUpdateHandler();
  const deleteHandler = container.getDeleteHandler();

  ipc.handle({DOMAIN_NAME}_ENDPOINTS.CREATE, (event, data) => createHandler.handleCreate(event, data));
  ipc.handle({DOMAIN_NAME}_ENDPOINTS.READ, (event, data) => readHandler.handleRead(event, data));
  ipc.handle({DOMAIN_NAME}_ENDPOINTS.UPDATE, (event, data) => updateHandler.handleUpdate(event, data));
  ipc.handle({DOMAIN_NAME}_ENDPOINTS.DELETE, (event, data) => deleteHandler.handleDelete(event, data));
}
```

### create.handler.ts (solo orquestación)
```typescript
import { {DOMAIN_NAME}Service } from '../../{DOMAIN_NAME}Service/{DOMAIN_NAME}.service';
import { Create{DOMAIN_NAME}DTO } from '../../{DOMAIN_NAME}Types/dtos';

export class CreateHandler {
  constructor(private {DOMAIN_NAME}Service: {DOMAIN_NAME}Service) {}

  async handleCreate(event: Electron.IpcMainInvokeEvent, data: unknown) {
    return this.{DOMAIN_NAME}Service.create(data as Create{DOMAIN_NAME}DTO);
  }
}
```

### create.service.ts (lógica completa)
```typescript
import { validateCreate{DOMAIN_NAME}Data } from '../../{DOMAIN_NAME}Types/validation';
import { Create{DOMAIN_NAME}DTO, {DOMAIN_NAME}ResponseDTO } from '../../{DOMAIN_NAME}Types/dtos';

export class CreateService {
  constructor(private {DOMAIN_NAME}Repository: I{DOMAIN_NAME}Repository) {}

  async create(data: Create{DOMAIN_NAME}DTO): Promise<{DOMAIN_NAME}ResponseDTO> {
    if (!validateCreate{DOMAIN_NAME}Data(data)) {
      return { success: false, message: 'Datos inválidos' };
    }
    // lógica de creación aquí...
  }
}
```

## 8. 🎯 NOTAS FINALES
- Mantén los imports organizados con index.ts para exportar módulos desde cada carpeta
- Añade comentarios mínimos y útiles donde sea necesario
- Verifica que no haya duplicación innecesaria
- Los nombres de carpetas/archivos deben seguir una convención consistente (camelCase para funciones, PascalCase para tipos/DTOs)
- Implementa manejo de errores robusto en cada capa
- Asegúrate de que todas las dependencias estén correctamente inyectadas

## 9. 🔄 REEMPLAZOS NECESARIOS
Reemplaza todas las ocurrencias de `{DOMAIN_NAME}` con el nombre real del dominio (ej: "pacientes", "usuarios", "reportes", etc.)

## 10. 🧪 TESTING RECOMENDACIONES
- Crea tests unitarios para cada servicio
- Crea tests de integración para los handlers
- Mockea las dependencias del repositorio en los tests
- Verifica que todos los endpoints funcionen correctamente después de la refactorización 