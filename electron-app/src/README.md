# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Cambios en la Estructura del Frontend (Vite + Electron)

## 📦 Instalación de dependencias

- **Todas las dependencias del proyecto (frontend y backend) deben instalarse desde la raíz del proyecto.**
- El archivo `src/package.json` solo existe para que Vite y el frontend funcionen correctamente con módulos ESM.  
  **No debes instalar dependencias dentro de `src/`.**
- Siempre usa:
  ```bash
  npm install
  ```
  desde la raíz del proyecto.

---

## ¿Por qué se hicieron estos cambios?

El proyecto utiliza tanto Electron (para el backend de escritorio) como Vite/React (para el frontend). Cada uno de estos entornos tiene diferentes necesidades técnicas sobre cómo manejar los módulos de JavaScript:

- **Electron** (el backend de escritorio) funciona mejor con el sistema de módulos clásico de Node.js, llamado **CommonJS**.
- **Vite/React** (el frontend) y sus plugins modernos, como Tailwind, requieren el sistema de módulos moderno de JavaScript, llamado **ES Modules (ESM)**.

Antes, todo el proyecto estaba configurado como ESM, lo que causaba errores en Electron. Al cambiarlo a CommonJS, el frontend dejó de funcionar correctamente. Por eso, fue necesario separar claramente ambos entornos.

---

## ¿Qué cambios se hicieron?

### 1. Separación de contextos de módulos
- Se eliminó la línea `"type": "module"` del `package.json` principal del proyecto. Esto permite que Electron y Node.js traten los archivos como CommonJS por defecto, evitando errores de compatibilidad.
- Se creó un nuevo archivo `package.json` dentro de la carpeta `src/` (donde está el frontend) con el contenido:
  ```json
  {
    "type": "module"
  }
  ```
  Esto le indica a Vite y a los plugins modernos que pueden usar la sintaxis de módulos ESM.

### 2. Reubicación de la configuración de Vite
- El archivo `vite.config.ts` se movió de la raíz del proyecto a la carpeta `src/`.
- Los scripts de build y dev en el `package.json` principal se actualizaron para que usen la nueva ubicación de la configuración de Vite.

### 3. Ajustes en la salida del build
- Se ajustó la configuración de Vite para que siga generando los archivos de producción en la carpeta correcta, aunque la configuración esté en `src/`.

---

## Explicación técnica (resumida)
- **Electron** ahora usa CommonJS, lo que evita errores como `exports is not defined in ES module scope`.
- **Vite/React** sigue usando ESM, lo que permite que plugins modernos como Tailwind funcionen correctamente.
- Los scripts de build y dev se adaptaron para que cada entorno use su propio sistema de módulos sin interferir con el otro.

---

## Explicación para no técnicos
- Antes, el backend y el frontend "hablaban diferentes idiomas" y eso causaba errores.
- Ahora, cada uno puede usar el idioma que le corresponde: Electron usa el clásico y Vite/React el moderno.
- Esto hace que la app funcione bien y que los plugins modernos del frontend no den problemas.
- Si necesitas agregar o modificar configuraciones de Vite, ahora debes hacerlo en `src/vite.config.ts`.

---

## Resumen
- **Electron** (backend de escritorio): usa módulos clásicos (CommonJS).
- **Vite/React** (frontend): usa módulos modernos (ESM).
- Cada entorno tiene su propia configuración y no se interfieren.
- Esto soluciona los errores de compatibilidad y permite que el desarrollo sea más fluido para todos los miembros del equipo.

Si tienes dudas, puedes preguntar a cualquier miembro del equipo técnico o revisar este README para entender la estructura y el motivo de los cambios.

