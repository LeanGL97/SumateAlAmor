import { useState } from 'react';

interface Usuario {
  id: number;
  nombre: string;
  // Agrega más campos según la estructura de tus usuarios
}

interface EndpointResponse {
  endpoint: string;
  timestamp: string;
  data: any;
  error: string | null;
}

interface LoginData {
  usuario: string;
  password: string;
}

interface SignupData {
  nombre: string;
  correo?: string;
  usuario: string;
  direccion: string;
  telefono: string;
  password: string;
  rol: 'Administrador' | 'ServicioSocial' | 'Albergue';
  confirmPassword: string;
}

const PruebasBack = () => {
  const [responses, setResponses] = useState<EndpointResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Auth form states
  const [loginData, setLoginData] = useState<LoginData>({
    usuario: '',
    password: ''
  });
  
  const [signupData, setSignupData] = useState<SignupData>({
    nombre: '',
    correo: '',
    usuario: '',
    direccion: '',
    telefono: '',
    password: '',
    rol: 'Administrador',
    confirmPassword: ''
  });

  const handleEndpointCall = async (endpoint: string) => {
    setIsLoading(true);
    try {
      if (!window.api?.[endpoint]) {
        console.warn(`La API de Electron no está disponible para el endpoint: ${endpoint}`);
        setResponses(prev => [...prev, {
          endpoint,
          timestamp: new Date().toISOString(),
          data: null,
          error: `Endpoint no disponible: ${endpoint}`
        }]);
        return;
      }

      const data = await window.api[endpoint]();
      console.log(`Respuesta de ${endpoint}:`, data);
      
      setResponses(prev => [...prev, {
        endpoint,
        timestamp: new Date().toISOString(),
        data,
        error: null
      }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error(`Error en ${endpoint}:`, errorMessage);
      
      setResponses(prev => [...prev, {
        endpoint,
        timestamp: new Date().toISOString(),
        data: null,
        error: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (!window.api?.login) {
        setResponses(prev => [...prev, {
          endpoint: 'auth:login',
          timestamp: new Date().toISOString(),
          data: null,
          error: 'Endpoint de login no disponible'
        }]);
        return;
      }

      const data = await window.api.login(loginData);
      console.log('Respuesta de login:', data);
      
      setResponses(prev => [...prev, {
        endpoint: 'auth:login',
        timestamp: new Date().toISOString(),
        data,
        error: null
      }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error en login:', errorMessage);
      
      setResponses(prev => [...prev, {
        endpoint: 'auth:login',
        timestamp: new Date().toISOString(),
        data: null,
        error: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      if (!window.api?.signup) {
        setResponses(prev => [...prev, {
          endpoint: 'auth:signup',
          timestamp: new Date().toISOString(),
          data: null,
          error: 'Endpoint de signup no disponible'
        }]);
        return;
      }

      const data = await window.api.signup(signupData);
      console.log('Respuesta de signup:', data);
      
      setResponses(prev => [...prev, {
        endpoint: 'auth:signup',
        timestamp: new Date().toISOString(),
        data,
        error: null
      }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error en signup:', errorMessage);
      
      setResponses(prev => [...prev, {
        endpoint: 'auth:signup',
        timestamp: new Date().toISOString(),
        data: null,
        error: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponse = (response: EndpointResponse) => {
    if (response.error) {
      return (
        <div className="text-red-600">
          Error: {response.error}
        </div>
      );
    }

    if (response.endpoint === 'getUsuarios') {
      const usuarios = response.data as Usuario[];
      return (
        <div className="space-y-2">
          <h3 className="font-semibold">Usuarios encontrados: {usuarios.length}</h3>
          <ul className="space-y-1">
            {usuarios.map((usuario) => (
              <li key={usuario.id} className="border-b pb-1">
                {usuario.nombre}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (response.endpoint === 'auth:login' || response.endpoint === 'auth:signup') {
      const authResponse = response.data;
      return (
        <div className="space-y-2">
          <div className={`font-semibold ${authResponse.success ? 'text-green-600' : 'text-red-600'}`}>
            {authResponse.success ? '✅ Éxito' : '❌ Error'}
          </div>
          <div className="text-gray-700">{authResponse.message}</div>
          {authResponse.user && (
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="font-medium">Usuario:</h4>
              <pre className="text-sm mt-1">
                {JSON.stringify(authResponse.user, null, 2)}
              </pre>
            </div>
          )}
        </div>
      );
    }

    // Formato genérico para otros endpoints
    return (
      <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
        {JSON.stringify(response.data, null, 2)}
      </pre>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Pruebas de Backend</h1>
      
      {/* Panel de Endpoints */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Endpoints Disponibles</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleEndpointCall('getUsuarios')}
              disabled={isLoading}
              className={`px-4 py-2 rounded ${
                isLoading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isLoading ? 'Cargando...' : 'Obtener Usuarios'}
            </button>
            <span className="text-sm text-gray-600">GET /usuarios</span>
          </div>
        </div>
      </div>

      {/* Panel de Autenticación */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Autenticación</h2>
        
        {/* Login Form */}
        <div className="mb-6 p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-3">Login</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={loginData.usuario}
                onChange={(e) => setLoginData({...loginData, usuario: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese usuario"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese contraseña"
              />
            </div>
          </div>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`px-4 py-2 rounded ${
              isLoading 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isLoading ? 'Procesando...' : 'Iniciar Sesión'}
          </button>
        </div>

        {/* Signup Form */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-3">Registro</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                value={signupData.nombre}
                onChange={(e) => setSignupData({...signupData, nombre: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo
              </label>
              <input
                type="email"
                value={signupData.correo}
                onChange={(e) => setSignupData({...signupData, correo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario *
              </label>
              <input
                type="text"
                value={signupData.usuario}
                onChange={(e) => setSignupData({...signupData, usuario: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre de usuario"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono *
              </label>
              <input
                type="text"
                value={signupData.telefono}
                onChange={(e) => setSignupData({...signupData, telefono: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123456789"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección *
              </label>
              <input
                type="text"
                value={signupData.direccion}
                onChange={(e) => setSignupData({...signupData, direccion: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dirección completa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña *
              </label>
              <input
                type="password"
                value={signupData.password}
                onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña *
              </label>
              <input
                type="password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Repita la contraseña"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol *
              </label>
              <select
                value={signupData.rol}
                onChange={(e) => setSignupData({...signupData, rol: e.target.value as 'Administrador' | 'ServicioSocial' | 'Albergue'})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Administrador">Administrador</option>
                <option value="ServicioSocial">Servicio Social</option>
                <option value="Albergue">Albergue</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSignup}
            disabled={isLoading}
            className={`px-4 py-2 rounded ${
              isLoading 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {isLoading ? 'Procesando...' : 'Registrar Usuario'}
          </button>
        </div>
      </div>

      {/* Panel de Respuestas */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Respuestas</h2>
        {responses.length === 0 ? (
          <p className="text-gray-500">No hay respuestas aún. Prueba algún endpoint.</p>
        ) : (
          <div className="space-y-6">
            {responses.map((response, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{response.endpoint}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(response.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                {formatResponse(response)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PruebasBack; 