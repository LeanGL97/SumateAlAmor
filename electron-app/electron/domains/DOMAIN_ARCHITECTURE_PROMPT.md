# PROMPT PARA CURSOR: Arquitectura de Dominios Mejorada - {DOMAIN_NAME}

Refactoriza completamente el dominio {DOMAIN_NAME} siguiendo la arquitectura mejorada actual del proyecto. Esta refactorización debe implementar manejo de errores personalizados, validación detallada, contenedores simplificados y separación clara de responsabilidades.

## 1. 🔧 ESTRUCTURA DEL DOMINIO {DOMAIN_NAME}

### 📁 1.1 {DOMAIN_NAME}Controller
Crea una carpeta: {DOMAIN_NAME}/{DOMAIN_NAME}Controller

Dentro de ella:
- Crea el archivo `{DOMAIN_NAME}.controller.ts` que registre los endpoints IPC usando métodos estáticos
- Crea la subcarpeta `{DOMAIN_NAME}Handlers` dentro de `{DOMAIN_NAME}Controller`:
  - Crea un archivo para cada operación: `create.handler.ts`, `get-all.handler.ts`, `get-by-id.handler.ts`, `update.handler.ts`, `delete.handler.ts`, etc.
  - Cada handler debe exportar una clase con un método `handle()` que reciba solo los datos (sin el evento IPC)
  - Los handlers deben ser llamados desde `{DOMAIN_NAME}.controller.ts`

### 📁 1.2 {DOMAIN_NAME}Types
Crea una carpeta: {DOMAIN_NAME}/{DOMAIN_NAME}Types

Divide los tipos en los siguientes módulos:
- `dtos.ts` → define interfaces para los datos de entrada/salida, como `Create{DOMAIN_NAME}DTO`, `Update{DOMAIN_NAME}DTO`, `{DOMAIN_NAME}ResponseDTO`, etc.
- `constants.ts` → define `{DOMAIN_NAME}_ENDPOINTS`, `{DOMAIN_NAME}_ERROR_MESSAGES`, y demás constantes
- `validation.ts` → define funciones de validación que devuelvan `{ isValid: boolean, errors: Record<string, string> }`
- `errors.ts` → define clases de error personalizadas que extiendan de una clase base
- `types.ts` → define tipos puros no DTOs si es necesario

### 📁 1.3 {DOMAIN_NAME}Service
Crea una carpeta: {DOMAIN_NAME}/{DOMAIN_NAME}Service

Dentro:
- Divide la lógica en varios archivos:
  - `Services/create.service.ts` → lógica completa de creación
  - `Services/get-all.service.ts` → lógica completa de lectura múltiple
  - `Services/get-by-id.service.ts` → lógica completa de lectura individual
  - `Services/update.service.ts` → lógica completa de actualización
  - `Services/delete.service.ts` → lógica completa de eliminación
  - `{DOMAIN_NAME}.service.ts` → archivo central que orqueste los servicios individuales
  - `{DOMAIN_NAME}.utils.ts` → utilidades del dominio (hash, uuid, etc.)

### 📁 1.4 {DOMAIN_NAME}Repository
Crea una carpeta: {DOMAIN_NAME}/{DOMAIN_NAME}Repository

Dentro:
- `{DOMAIN_NAME}.repository.interface.ts` → interfaz del repositorio
- `{DOMAIN_NAME}.sqlite.repository.ts` → implementación concreta para SQLite
- `index.ts` → reexportaciones

## 2. 🧾 TIPADO COMPLETO Y DTOs MEJORADOS
- Tipa todas las variables, funciones, parámetros, y retornos en todo el módulo {DOMAIN_NAME}
- Usa `interface` para objetos de datos estructurados, y `type` para tipos derivados o utilitarios
- Todos los DTOs deben seguir la convención de nombres: `Create{DOMAIN_NAME}DTO`, `Update{DOMAIN_NAME}DTO`, `{DOMAIN_NAME}ResponseDTO`, etc.
- **NUEVO**: Crea `{DOMAIN_NAME}ToCreateDTO` para datos de persistencia (sin campos de validación como `password`, `confirmPassword`)
- Los validadores deben trabajar con los DTOs correspondientes y devolver errores detallados

## 3. 🧠 SEPARACIÓN DE RESPONSABILIDADES (SoC)

### Controlador ({DOMAIN_NAME}.controller.ts)
- Solo debe registrar los endpoints IPC usando métodos estáticos
- No debe tener validaciones ni lógica de negocio
- Debe usar las constantes `{DOMAIN_NAME}_ENDPOINTS` para los nombres de endpoints

### Handlers ({DOMAIN_NAME}Handlers)
- Reciben la solicitud desde el controlador, llaman a los servicios, y retornan el resultado
- Método `handle()` debe recibir solo los datos (sin el evento IPC)
- No deben tener lógica compleja ni validaciones, solo orquestación

### Servicios ({DOMAIN_NAME}Service)
- Toda la lógica de negocio va aquí: validaciones, persistencia, transformaciones, etc.
- **NUEVO**: Manejo de errores personalizados con captura de excepciones específicas
- **NUEVO**: Validación detallada con errores por campo
- Devuelven respuestas estructuradas con `success`, `message`, `data` y opcionalmente `errors`

### Repositorio ({DOMAIN_NAME}Repository)
- Toda la lógica de persistencia y acceso a datos
- **NUEVO**: Lanza errores personalizados en lugar de devolver `null` o `boolean`
- Implementa la interfaz del repositorio

## 4. 💉 INYECCIÓN DE DEPENDENCIAS SIMPLIFICADA
- **NUEVO**: Implementa contenedores simplificados sin patrón Singleton
- Crea un archivo `{DOMAIN_NAME}.container.ts` que exporte una instancia única directamente
- Los handlers y controladores reciben las dependencias mediante el contenedor
- Evita instanciaciones directas dentro de handlers o controladores

## 5. 🚨 MANEJO DE ERRORES PERSONALIZADOS

### 5.1 Clases de Error Personalizadas
Crea en `{DOMAIN_NAME}Types/errors.ts`:
```typescript
export class {DOMAIN_NAME}Error extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class {DOMAIN_NAME}NotFoundError extends {DOMAIN_NAME}Error {
  constructor(message = 'El {DOMAIN_NAME} no fue encontrado.') {
    super(message);
  }
}

export class Duplicate{DOMAIN_NAME}Error extends {DOMAIN_NAME}Error {
  constructor(message = 'Ya existe un {DOMAIN_NAME} con esos datos.') {
    super(message);
  }
}
```

### 5.2 Repositorio con Errores Personalizados
```typescript
export class {DOMAIN_NAME}SQLiteRepository implements I{DOMAIN_NAME}Repository {
  async findById(id: string): Promise<{DOMAIN_NAME}> {
    const {DOMAIN_NAME} = await db.get<{DOMAIN_NAME}>('SELECT * FROM {DOMAIN_NAME}s WHERE id = ?', [id]);
    if (!{DOMAIN_NAME}) {
      throw new {DOMAIN_NAME}NotFoundError(`{DOMAIN_NAME} con id '${id}' no encontrado.`);
    }
    return {DOMAIN_NAME};
  }

  async create({DOMAIN_NAME}Data: {DOMAIN_NAME}ToCreateDTO): Promise<{DOMAIN_NAME}> {
    try {
      // lógica de creación
    } catch (err: any) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        throw new Duplicate{DOMAIN_NAME}Error(`Ya existe un {DOMAIN_NAME} con esos datos.`);
      }
      throw err;
    }
  }
}
```

### 5.3 Servicios con Manejo de Errores
```typescript
export class Create{DOMAIN_NAME}Service {
  async create(data: unknown): Promise<{ success: boolean; message: string; {DOMAIN_NAME}?: {DOMAIN_NAME}ResponseDTO; errors?: Record<string, string> }> {
    const validation = validateCreate{DOMAIN_NAME}Data(data);
    if (!validation.isValid) {
      return { success: false, message: '{DOMAIN_NAME}_ERROR_MESSAGES.INVALID_DATA', errors: validation.errors };
    }
    
    try {
      const {DOMAIN_NAME} = await this.{DOMAIN_NAME}Repository.create(data as Create{DOMAIN_NAME}DTO);
      return { success: true, message: '{DOMAIN_NAME}_ERROR_MESSAGES.SUCCESSFUL_CREATE', {DOMAIN_NAME} };
    } catch (error) {
      if (error instanceof Duplicate{DOMAIN_NAME}Error) {
        return { success: false, message: error.message, errors: { general: error.message } };
      }
      console.error('Error in Create{DOMAIN_NAME}Service:', error);
      return { success: false, message: '{DOMAIN_NAME}_ERROR_MESSAGES.INTERNAL_SERVER_ERROR' };
    }
  }
}
```

## 6. ✅ VALIDACIÓN DETALLADA

### 6.1 Funciones de Validación
```typescript
export function validateCreate{DOMAIN_NAME}Data(data: unknown): { isValid: boolean, errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!data || typeof data !== 'object' || data === null) {
    errors.general = 'Datos de creación inválidos.';
    return { isValid: false, errors };
  }

  const d = data as Create{DOMAIN_NAME}DTO;

  if (!d.name || d.name.trim() === '') {
    errors.name = 'El nombre es requerido.';
  }
  // más validaciones...
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validate{DOMAIN_NAME}Id(id: unknown): { isValid: boolean, errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!id || typeof id !== 'string' || id.trim() === '') {
    errors.id = 'El ID es requerido.';
  } else if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    errors.id = 'El ID debe ser un UUID válido.';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
```

### 6.2 Constantes de Error
```typescript
export const {DOMAIN_NAME}_ERROR_MESSAGES = {
  INVALID_DATA: 'Datos inválidos.',
  {DOMAIN_NAME}_NOT_FOUND: '{DOMAIN_NAME} no encontrado.',
  DUPLICATE_{DOMAIN_NAME}: 'Ya existe un {DOMAIN_NAME} con esos datos.',
  SUCCESSFUL_CREATE: '{DOMAIN_NAME} creado exitosamente.',
  SUCCESSFUL_UPDATE: '{DOMAIN_NAME} actualizado exitosamente.',
  SUCCESSFUL_DELETE: '{DOMAIN_NAME} eliminado exitosamente.',
  INTERNAL_SERVER_ERROR: 'Error interno del servidor.'
} as const;
```

## 7. 🔄 USO COMPARTIDO DE REPOSITORIOS ENTRE DOMINIOS
**REGLAS IMPORTANTES PARA ENTIDADES COMPARTIDAS:**

### 7.1 Principio DRY (Don't Repeat Yourself)
- **NUNCA** dupliques lógica de persistencia para la misma entidad en múltiples dominios
- Si una entidad (ej: User) es usada por múltiples dominios (auth, users), centraliza su repositorio en UN SOLO lugar

### 7.2 Dominio Propietario
- El dominio que "posee" la entidad debe tener el repositorio principal
- Otros dominios deben consumir ese repositorio por inyección de dependencias

### 7.3 Ejemplo: User Entity
```
✅ CORRECTO:
- users/UserRepository/ → Repositorio principal de User
- auth/AuthService/ → Consume UserRepository por inyección
- auth NO tiene AuthRepository para User

❌ INCORRECTO:
- users/UserRepository/ → Repositorio de User
- auth/AuthRepository/ → Repositorio duplicado de User
```

## 8. 📁 ESTRUCTURA DE ARCHIVOS ESPERADA

```
{DOMAIN_NAME}/
├── {DOMAIN_NAME}Controller/
│   ├── {DOMAIN_NAME}Handlers/
│   │   ├── create.handler.ts
│   │   ├── get-all.handler.ts
│   │   ├── get-by-id.handler.ts
│   │   ├── update.handler.ts
│   │   ├── delete.handler.ts
│   │   └── index.ts
│   ├── {DOMAIN_NAME}.controller.ts
│   └── index.ts
├── {DOMAIN_NAME}Types/
│   ├── dtos.ts
│   ├── constants.ts
│   ├── validation.ts
│   ├── errors.ts
│   ├── types.ts (opcional)
│   └── index.ts
├── {DOMAIN_NAME}Service/
│   ├── Services/
│   │   ├── create.service.ts
│   │   ├── get-all.service.ts
│   │   ├── get-by-id.service.ts
│   │   ├── update.service.ts
│   │   ├── delete.service.ts
│   │   └── index.ts
│   ├── {DOMAIN_NAME}.service.ts
│   ├── {DOMAIN_NAME}.utils.ts
│   └── index.ts
├── {DOMAIN_NAME}Repository/
│   ├── {DOMAIN_NAME}.repository.interface.ts
│   ├── {DOMAIN_NAME}.sqlite.repository.ts
│   └── index.ts
├── {DOMAIN_NAME}.container.ts
└── index.ts
```

## 9. 🧪 EJEMPLO DE RESULTADO ESPERADO

### {DOMAIN_NAME}.controller.ts
```typescript
import { IpcMainInvokeEvent } from 'electron';
import { Create{DOMAIN_NAME}DTO, Update{DOMAIN_NAME}DTO, {DOMAIN_NAME}ResponseDTO } from '../{DOMAIN_NAME}Types/dtos.js';
import { {DOMAIN_NAME}Container } from '../{DOMAIN_NAME}.container.js';

export class {DOMAIN_NAME}Controller {
  static async create(
    _event: IpcMainInvokeEvent,
    data: Create{DOMAIN_NAME}DTO,
  ): Promise<{DOMAIN_NAME}ResponseDTO> {
    const handler = {DOMAIN_NAME}Container.getCreateHandler();
    return handler.handle(data);
  }

  static async getById(
    _event: IpcMainInvokeEvent,
    id: string,
  ): Promise<{DOMAIN_NAME}ResponseDTO> {
    const handler = {DOMAIN_NAME}Container.getGetByIdHandler();
    return handler.handle(id);
  }

  // más métodos...
}
```

### {DOMAIN_NAME}.container.ts
```typescript
import { Create{DOMAIN_NAME}Service } from './{DOMAIN_NAME}Service/Services/create.service.js';
import { Get{DOMAIN_NAME}ByIdService } from './{DOMAIN_NAME}Service/Services/get-by-id.service.js';
import { CreateHandler } from './{DOMAIN_NAME}Controller/{DOMAIN_NAME}Handlers/create.handler.js';
import { GetByIdHandler } from './{DOMAIN_NAME}Controller/{DOMAIN_NAME}Handlers/get-by-id.handler.js';
import { I{DOMAIN_NAME}Repository } from './{DOMAIN_NAME}Repository/{DOMAIN_NAME}.repository.interface.js';
import { {DOMAIN_NAME}SQLiteRepository } from './{DOMAIN_NAME}Repository/{DOMAIN_NAME}.sqlite.repository.js';

class {DOMAIN_NAME}Container {
  private {DOMAIN_NAME}Repository!: I{DOMAIN_NAME}Repository;
  private create{DOMAIN_NAME}Service!: Create{DOMAIN_NAME}Service;
  private get{DOMAIN_NAME}ByIdService!: Get{DOMAIN_NAME}ByIdService;
  private createHandler!: CreateHandler;
  private getByIdHandler!: GetByIdHandler;

  constructor() {
    this.initializeDependencies();
  }

  private initializeDependencies(): void {
    this.{DOMAIN_NAME}Repository = new {DOMAIN_NAME}SQLiteRepository();
    this.create{DOMAIN_NAME}Service = new Create{DOMAIN_NAME}Service(this.{DOMAIN_NAME}Repository);
    this.get{DOMAIN_NAME}ByIdService = new Get{DOMAIN_NAME}ByIdService(this.{DOMAIN_NAME}Repository);
    this.createHandler = new CreateHandler(this.create{DOMAIN_NAME}Service);
    this.getByIdHandler = new GetByIdHandler(this.get{DOMAIN_NAME}ByIdService);
  }

  public getCreateHandler(): CreateHandler {
    return this.createHandler;
  }

  public getGetByIdHandler(): GetByIdHandler {
    return this.getByIdHandler;
  }
}

// Create and export a single instance
export const {DOMAIN_NAME}Container = new {DOMAIN_NAME}Container();
```

### create.handler.ts
```typescript
import { Create{DOMAIN_NAME}Service } from '../../{DOMAIN_NAME}Service/Services/create.service.js';
import { Create{DOMAIN_NAME}DTO, {DOMAIN_NAME}ResponseDTO } from '../../{DOMAIN_NAME}Types/dtos.js';

export class CreateHandler {
  constructor(private create{DOMAIN_NAME}Service: Create{DOMAIN_NAME}Service) {}

  async handle(data: unknown): Promise<{DOMAIN_NAME}ResponseDTO> {
    return this.create{DOMAIN_NAME}Service.create(data);
  }
}
```

### create.service.ts
```typescript
import { I{DOMAIN_NAME}Repository } from '../../{DOMAIN_NAME}Repository/{DOMAIN_NAME}.repository.interface.js';
import { Create{DOMAIN_NAME}DTO, {DOMAIN_NAME}ResponseDTO, {DOMAIN_NAME}ToCreateDTO } from '../../{DOMAIN_NAME}Types/dtos.js';
import { {DOMAIN_NAME}_ERROR_MESSAGES } from '../../{DOMAIN_NAME}Types/constants.js';
import { validateCreate{DOMAIN_NAME}Data } from '../../{DOMAIN_NAME}Types/validation.js';
import { Duplicate{DOMAIN_NAME}Error } from '../../{DOMAIN_NAME}Types/errors.js';

export class Create{DOMAIN_NAME}Service {
  constructor(private {DOMAIN_NAME}Repository: I{DOMAIN_NAME}Repository) {}

  async create(data: unknown): Promise<{ success: boolean; message: string; {DOMAIN_NAME}?: {DOMAIN_NAME}ResponseDTO; errors?: Record<string, string> }> {
    const validation = validateCreate{DOMAIN_NAME}Data(data);
    if (!validation.isValid) {
      return { success: false, message: {DOMAIN_NAME}_ERROR_MESSAGES.INVALID_DATA, errors: validation.errors };
    }
    
    try {
      const {DOMAIN_NAME}ToCreate: {DOMAIN_NAME}ToCreateDTO = {
        // mapear datos...
      };
      
      const {DOMAIN_NAME} = await this.{DOMAIN_NAME}Repository.create({DOMAIN_NAME}ToCreate);
      
      const {DOMAIN_NAME}Response: {DOMAIN_NAME}ResponseDTO = {
        id: {DOMAIN_NAME}.id,
        // mapear otros campos...
      };
      
      return { success: true, message: {DOMAIN_NAME}_ERROR_MESSAGES.SUCCESSFUL_CREATE, {DOMAIN_NAME}: {DOMAIN_NAME}Response };
    } catch (error) {
      if (error instanceof Duplicate{DOMAIN_NAME}Error) {
        return { success: false, message: error.message, errors: { general: error.message } };
      }
      console.error('Error in Create{DOMAIN_NAME}Service:', error);
      return { success: false, message: {DOMAIN_NAME}_ERROR_MESSAGES.INTERNAL_SERVER_ERROR };
    }
  }
}
```

### {DOMAIN_NAME}.repository.interface.ts
```typescript
import { {DOMAIN_NAME}, Create{DOMAIN_NAME}DTO, Update{DOMAIN_NAME}DTO, {DOMAIN_NAME}ToCreateDTO } from '../{DOMAIN_NAME}Types/dtos.js';

export interface I{DOMAIN_NAME}Repository {
  findById(id: string): Promise<{DOMAIN_NAME}>;
  findAll(): Promise<{DOMAIN_NAME}[]>;
  create({DOMAIN_NAME}: {DOMAIN_NAME}ToCreateDTO): Promise<{DOMAIN_NAME}>;
  update(id: string, data: Update{DOMAIN_NAME}DTO): Promise<{DOMAIN_NAME}>;
  delete(id: string): Promise<void>;
}
```

### {DOMAIN_NAME}.sqlite.repository.ts
```typescript
import { getDatabase } from '../../../db/database.js';
import { I{DOMAIN_NAME}Repository } from './{DOMAIN_NAME}.repository.interface.js';
import { {DOMAIN_NAME}, Create{DOMAIN_NAME}DTO, Update{DOMAIN_NAME}DTO, {DOMAIN_NAME}ToCreateDTO } from '../{DOMAIN_NAME}Types/dtos.js';
import { {DOMAIN_NAME}NotFoundError, Duplicate{DOMAIN_NAME}Error } from '../{DOMAIN_NAME}Types/errors.js';
import { v4 as uuidv4 } from 'uuid';

type SQLiteError = Error & {
  code: string;
};

export class {DOMAIN_NAME}SQLiteRepository implements I{DOMAIN_NAME}Repository {
  async findById(id: string): Promise<{DOMAIN_NAME}> {
    const db = await getDatabase();
    const {DOMAIN_NAME} = await db.get<{DOMAIN_NAME}>('SELECT * FROM {DOMAIN_NAME}s WHERE id = ? AND deleted IS NOT 1', [id]);
    if (!{DOMAIN_NAME}) {
      throw new {DOMAIN_NAME}NotFoundError(`{DOMAIN_NAME} con id '${id}' no encontrado.`);
    }
    return {DOMAIN_NAME};
  }

  async create({DOMAIN_NAME}Data: {DOMAIN_NAME}ToCreateDTO): Promise<{DOMAIN_NAME}> {
    const db = await getDatabase();
    const id = uuidv4();
    const new{DOMAIN_NAME}: {DOMAIN_NAME} = {
      id,
      ...{DOMAIN_NAME}Data,
      deleted: false
    };

    try {
      await db.run(
        `INSERT INTO {DOMAIN_NAME}s (id, name, ...) VALUES (?, ?, ...)`,
        [new{DOMAIN_NAME}.id, new{DOMAIN_NAME}.name, ...]
      );
      return new{DOMAIN_NAME};
    } catch (err) {
      const error = err as SQLiteError;
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new Duplicate{DOMAIN_NAME}Error(`Ya existe un {DOMAIN_NAME} con esos datos.`);
      }
      throw error;
    }
  }

  // más métodos...
}
```

## 10. 🔄 REGISTRO DE ENDPOINTS

### En domains/index.ts
```typescript
import { ipcMain } from 'electron';
import { initUserController } from './users/UserController/user.controller.js';
import { {DOMAIN_NAME}Controller } from './{DOMAIN_NAME}/{DOMAIN_NAME}Controller/{DOMAIN_NAME}.controller.js';
import { {DOMAIN_NAME}_ENDPOINTS } from './{DOMAIN_NAME}/{DOMAIN_NAME}Types/constants.js';

export async function bootstrapBackend(ipc: typeof ipcMain) {
  console.log('🚀 Iniciando backend...');
  
  // Inicializa los controladores de dominio
  initUserController(ipc);
  
  // Registra los endpoints de {DOMAIN_NAME}
  ipc.handle({DOMAIN_NAME}_ENDPOINTS.CREATE, {DOMAIN_NAME}Controller.create);
  ipc.handle({DOMAIN_NAME}_ENDPOINTS.GET_BY_ID, {DOMAIN_NAME}Controller.getById);
  ipc.handle({DOMAIN_NAME}_ENDPOINTS.GET_ALL, {DOMAIN_NAME}Controller.getAll);
  ipc.handle({DOMAIN_NAME}_ENDPOINTS.UPDATE, {DOMAIN_NAME}Controller.update);
  ipc.handle({DOMAIN_NAME}_ENDPOINTS.DELETE, {DOMAIN_NAME}Controller.delete);
  
  console.log('✅ Endpoints de {DOMAIN_NAME} registrados.');
  console.log('🎉 Backend iniciado correctamente.');
}
```

## 11. 🎯 NOTAS FINALES
- **Manejo de errores**: Implementa errores personalizados específicos para cada dominio
- **Validación**: Usa validación detallada con errores por campo
- **Contenedores**: Usa instancias únicas sin patrón Singleton
- **Tipado**: Mantén tipado fuerte en toda la aplicación
- **Separación**: Respeta la separación de responsabilidades
- **DRY**: No dupliques lógica entre dominios
- **Consistencia**: Sigue las convenciones de nombres establecidas
- **Testing**: Implementa tests unitarios para servicios y handlers

## 12. 🔄 REEMPLAZOS NECESARIOS
Reemplaza todas las ocurrencias de `{DOMAIN_NAME}` con el nombre real del dominio (ej: "pacientes", "productos", "reportes", etc.)

## 13. 🧪 TESTING RECOMENDACIONES
- Crea tests unitarios para cada servicio
- Crea tests de integración para los handlers
- Mockea las dependencias del repositorio en los tests
- Verifica que todos los endpoints funcionen correctamente después de la refactorización
- Prueba la integración entre dominios que comparten repositorios
- **NUEVO**: Prueba el manejo de errores personalizados
- **NUEVO**: Prueba la validación detallada con errores por campo 