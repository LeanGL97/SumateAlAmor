import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const distDir = path.join(process.cwd(), 'dist-electron');
const tsconfigPath = path.join(process.cwd(), 'tsconfig.electron.json');

async function build() {
  try {
    console.log('🚀 [BUILD] Iniciando compilación de Electron...');

    // 1. Limpiar el directorio de salida
    console.log('🧹 [BUILD] Limpiando archivos de compilación antiguos...');
    await fs.rm(distDir, { recursive: true, force: true });
    console.log('✅ [BUILD] Limpieza completada.');

    // 2. Compilar TypeScript
    console.log('📦 [BUILD] Compilando TypeScript...');
    const { stdout, stderr } = await execPromise(`tsc -p "${tsconfigPath}"`);
    if (stderr) {
      console.error('❌ [BUILD] Error de compilación de TypeScript:', stderr);
      throw new Error('Falló la compilación de tsc');
    }
    console.log(stdout);
    console.log('✅ [BUILD] Compilación completada.');

    // 3. Renombrar archivos de salida
    console.log('✏️ [BUILD] Renombrando archivos a .cjs...');
    const mainJsPath = path.join(distDir, 'main.js');
    const mainCjsPath = path.join(distDir, 'main.cjs');
    const preloadJsPath = path.join(distDir, 'preload.js');
    const preloadCjsPath = path.join(distDir, 'preload.cjs');

    await fs.rename(mainJsPath, mainCjsPath);
    await fs.rename(preloadJsPath, preloadCjsPath);
    console.log('✅ [BUILD] Renombrado completado.');
    
    console.log('🎉 [BUILD] Compilación de Electron finalizada con éxito!');

  } catch (error) {
    console.error('🔥 [BUILD] La compilación ha fallado:', error);
    process.exit(1); // Salir con un código de error para detener cualquier proceso posterior
  }
}

build(); 