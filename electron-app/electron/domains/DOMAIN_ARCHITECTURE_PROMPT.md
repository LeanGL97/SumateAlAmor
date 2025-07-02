# PROMPT PARA CURSOR: Arquitectura de Dominios Mejorada - {DOMAIN_NAME}

Refactoriza completamente el dominio {DOMAIN_NAME} siguiendo la arquitectura mejorada actual del proyecto. Esta refactorización debe implementar manejo de errores personalizados, validación detallada, contenedores simplificados y separación clara de responsabilidades.

## 1. 🔧 ESTRUCTURA DEL DOMINIO {DOMAIN_NAME}

### 📁 1.1 {DOMAIN_NAME}Controller
Crea una carpeta: {DOMAIN_NAME}/{DOMAIN_NAME}Controller

Dentro de ella:
- Crea el archivo `{DOMAIN_NAME}.controller.ts` que contenga:
  - **Clase {DOMAIN_NAME}Controller** con métodos estáticos para cada operación
  - **Función init{DOMAIN_NAME}Controller()** para registrar endpoints IPC
  - Crea la subcarpeta `{DOMAIN_NAME}Handlers` dentro de `{DOMAIN_NAME}Controller`:
    - Crea un archivo para cada operación: `create.handler.ts`, `get-all.handler.ts`, `get-by-id.handler.ts`, `update.handler.ts`, `delete.handler.ts`, etc.
    - Cada handler debe exportar una clase con métodos específicos como `handleCreate()`, `handleGetAll()`, etc.
    - Los handlers deben ser llamados desde los métodos estáticos de `{DOMAIN_NAME}.controller.ts`

### 📁 1.2 {DOMAIN_NAME}Types
Crea una carpeta: {DOMAIN_NAME}/{DOMAIN_NAME}Types

Divide los tipos en los siguientes módulos:
- `dtos.ts` → define interfaces para los datos de entrada/salida, como `Create{DOMAIN_NAME}DTO`, `Update{DOMAIN_NAME}DTO`, `{DOMAIN_NAME}ResponseDTO`, `{DOMAIN_NAME}ResponseWrapperDTO`, etc.
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
- **NUEVO**: Crea `{DOMAIN_NAME}ResponseWrapperDTO` para respuestas consistentes con `success`, `message`, `data` y `errors`
- Los validadores deben trabajar con los DTOs correspondientes y devolver errores detallados

## 3. 🧠 SEPARACIÓN DE RESPONSABILIDADES (SoC)

### Controlador ({DOMAIN_NAME}.controller.ts)
- **NUEVO**: Implementa métodos estáticos para cada operación (create, getAll, getById, etc.)
- **NUEVO**: Incluye función `init{DOMAIN_NAME}Controller()` para registrar endpoints IPC
- Solo debe registrar los endpoints IPC y delegar a los handlers
- No debe tener validaciones ni lógica de negocio
- Debe usar las constantes `{DOMAIN_NAME}_ENDPOINTS` para los nombres de endpoints

### Handlers ({DOMAIN_NAME}Handlers)
- Reciben la solicitud desde el controlador, llaman a los servicios, y retornan el resultado
- **NUEVO**: Métodos específicos como `handleCreate()`, `handleGetAll()`, etc. (no genérico `handle()`)
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

## 5. 🏗️ INFRAESTRUCTURA SEPARADA
- **NUEVO**: El archivo `main/backend.ts` maneja la inicialización de todos los dominios
- **NUEVO**: Cada dominio debe exportar su función `init{DOMAIN_NAME}Controller()`
- **NUEVO**: El bootstrap no debe preocuparse de cómo se registran los endpoints de cada módulo
- **NUEVO**: Separación clara entre infraestructura (Electron) y lógica de dominio

## 6. 🚨 MANEJO DE ERRORES PERSONALIZADOS

### 6.1 Clases de Error Personalizadas
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

### 6.2 Repositorio con Errores Personalizados
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

### 6.3 Servicios con Manejo de Errores
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

## 7. ✅ VALIDACIÓN DETALLADA

### 7.1 Funciones de Validación
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

### 7.2 Constantes de Error
```typescript
export const {DOMAIN_NAME}_ERROR_MESSAGES = {
  INVALID_DATA: 'Datos inválidos.',
  NOT_FOUND: '{DOMAIN_NAME} no encontrado.',
  DUPLICATE: 'Ya existe un {DOMAIN_NAME} con esos datos.',
  SUCCESSFUL_CREATE: '{DOMAIN_NAME} creado exitosamente.',
  SUCCESSFUL_UPDATE: '{DOMAIN_NAME} actualizado exitosamente.',
  SUCCESSFUL_DELETE: '{DOMAIN_NAME} eliminado exitosamente.',
  INTERNAL_SERVER_ERROR: 'Error interno del servidor.'
} as const;
```

## 8. 📋 EJEMPLO DE IMPLEMENTACIÓN

### 8.1 Controlador con Métodos Estáticos
```typescript
export class {DOMAIN_NAME}Controller {
  static async create(
    _event: IpcMainInvokeEvent,
    data: Create{DOMAIN_NAME}DTO,
  ): Promise<{DOMAIN_NAME}ResponseWrapperDTO> {
    const handler = {DOMAIN_NAME}Container.getCreateHandler();
    return handler.handleCreate(_event, data);
  }

  static async getAll(
    _event: IpcMainInvokeEvent,
  ): Promise<{DOMAIN_NAME}sListResponseWrapperDTO> {
    const handler = {DOMAIN_NAME}Container.getGetAllHandler();
    return handler.handleGetAll(_event);
  }
}

export function init{DOMAIN_NAME}Controller(ipc: typeof ipcMain = ipcMain) {
  console.log('🔧 Inicializando controlador de {DOMAIN_NAME}...');
  
  ipc.handle({DOMAIN_NAME}_ENDPOINTS.CREATE, {DOMAIN_NAME}Controller.create);
  ipc.handle({DOMAIN_NAME}_ENDPOINTS.GET_ALL, {DOMAIN_NAME}Controller.getAll);
  
  console.log('✅ Endpoints de {DOMAIN_NAME} registrados:', Object.values({DOMAIN_NAME}_ENDPOINTS));
}
```

### 8.2 DTOs Consistentes
```typescript
export interface {DOMAIN_NAME}ResponseWrapperDTO {
  success: boolean;
  message?: string;
  {DOMAIN_NAME}?: {DOMAIN_NAME}ResponseDTO;
  errors?: Record<string, string>;
}

export interface {DOMAIN_NAME}sListResponseWrapperDTO {
  success: boolean;
  message?: string;
  {DOMAIN_NAME}s?: {DOMAIN_NAME}ResponseDTO[];
  errors?: Record<string, string>;
}
```

### 8.3 Backend Infrastructure
```typescript
// main/backend.ts
export async function bootstrapBackend(ipc: typeof ipcMain) {
  console.log('🚀 Iniciando backend...');
  
  initAuthController(ipc);
  init{DOMAIN_NAME}Controller(ipc);
  
  console.log('🎉 Backend iniciado correctamente.');
}
```

## 9. 🎯 BENEFICIOS DE LA ARQUITECTURA

### 9.1 Mejor Separación de Lógica vs Wiring
- Controladores con métodos estáticos para operaciones
- Funciones init separadas para registro de endpoints
- Infraestructura separada en carpeta `main/`

### 9.2 Más Fácil de Testear
- Métodos estáticos sin estado
- Dependencias inyectadas via contenedor
- Separación clara de responsabilidades

### 9.3 Menor Acoplamiento a Electron
- Controladores no dependen directamente de IPC
- Handlers reciben datos, no eventos
- Infraestructura aislada

### 9.4 Más Legible en Proyectos Medianos/Grandes
- Estructura consistente entre dominios
- Nomenclatura clara y predecible
- Separación de concerns bien definida

## 10. 🔄 MIGRACIÓN DE DOMINIOS EXISTENTES

Para migrar dominios existentes:
1. Refactorizar controladores para usar métodos estáticos
2. Agregar funciones `init{DOMAIN_NAME}Controller()`
3. Actualizar tipos de respuesta para usar wrappers
4. Mover bootstrap a `main/backend.ts`
5. Actualizar imports en `main.ts`

Esta arquitectura proporciona una base sólida y escalable para el crecimiento del proyecto, manteniendo la consistencia y facilitando el mantenimiento. 