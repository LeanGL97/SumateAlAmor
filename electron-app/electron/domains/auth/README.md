# Módulo de Autenticación (Auth)

Este módulo proporciona funcionalidades de autenticación para la aplicación Electron con una estructura tipo "Nest-like".

## Estructura del Módulo

```
auth/
├── auth.model.ts      # Definición de interfaces y tipos
├── auth.service.ts    # Lógica de negocio para autenticación
├── auth.controller.ts # Controladores IPC para comunicación
└── README.md         # Esta documentación
```

## Componentes

### auth.model.ts
Define las interfaces y tipos utilizados en el módulo:

- `UserRole`: Enum con roles disponibles (Administrador, ServicioSocial, Albergue)
- `Usuario`: Interfaz principal del usuario
- `LoginRequest`: Datos para inicio de sesión
- `SignupRequest`: Datos para registro de usuario
- `AuthResponse`: Respuesta de las operaciones de autenticación

### auth.service.ts
Contiene la lógica de negocio:

- **login()**: Valida credenciales y retorna información del usuario
- **signup()**: Registra nuevos usuarios con validaciones completas
- **Funciones auxiliares**: Hashing de contraseñas, generación de UUIDs

### auth.controller.ts
Define los endpoints IPC:

- `auth:login`: Endpoint para inicio de sesión
- `auth:signup`: Endpoint para registro de usuarios

## Uso desde el Frontend

### Importar el servicio
```typescript
import { AuthService, LoginData, SignupData } from '../services/authService';
```

### Inicio de sesión
```typescript
const loginData: LoginData = {
  usuario: 'admin',
  password: '123456'
};

const response = await AuthService.login(loginData);
if (response.success) {
  console.log('Usuario logueado:', response.user);
} else {
  console.error('Error:', response.message);
}
```

### Registro de usuario
```typescript
const signupData: SignupData = {
  nombre: 'Juan Pérez',
  correo: 'juan@example.com',
  usuario: 'juanperez',
  direccion: 'Calle Principal 123',
  telefono: '123456789',
  password: '123456',
  rol: 'Administrador',
  confirmPassword: '123456'
};

const response = await AuthService.signup(signupData);
if (response.success) {
  console.log('Usuario registrado:', response.user);
} else {
  console.error('Error:', response.message);
}
```

## Validaciones Implementadas

### Login
- Usuario y contraseña requeridos
- Verificación de existencia del usuario
- Verificación de contraseña hasheada

### Signup
- Todos los campos obligatorios completados
- Contraseñas coinciden
- Contraseña mínima 6 caracteres
- Usuario único en la base de datos
- Rol válido (Administrador, ServicioSocial, Albergue)

## Seguridad

- **Hashing de contraseñas**: Utiliza PBKDF2 con salt para hashear contraseñas
- **UUIDs**: Identificadores únicos para usuarios
- **Validación de entrada**: Validación completa de datos de entrada
- **Manejo de errores**: Respuestas consistentes y seguras

## Base de Datos

El módulo utiliza la tabla `usuario` con la siguiente estructura:

```sql
CREATE TABLE usuario (
  id TEXT PRIMARY KEY,                    -- UUID
  nombre TEXT NOT NULL,                   -- Nombre completo
  usuario TEXT NOT NULL UNIQUE,           -- Usuario único
  correo TEXT,                            -- Email opcional
  telefono TEXT NOT NULL,                 -- Teléfono
  direccion TEXT NOT NULL,                -- Dirección
  password TEXT NOT NULL,                 -- Contraseña hasheada
  rol TEXT CHECK (rol IN ('Administrador', 'ServicioSocial', 'Albergue')) NOT NULL
);
```

## Integración

El módulo se integra automáticamente en el sistema a través de:

1. **domains/index.ts**: Registra el controlador de auth
2. **preload.ts**: Expone métodos al frontend
3. **types/electron.d.ts**: Define tipos TypeScript para el frontend

## Próximos Pasos

- Implementar JWT para sesiones
- Agregar middleware de autenticación
- Implementar refresh tokens
- Agregar logging de auditoría
- Implementar recuperación de contraseña 