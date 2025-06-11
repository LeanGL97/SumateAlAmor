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

const PruebasBack = () => {
  const [responses, setResponses] = useState<EndpointResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
          {/* Aquí se pueden agregar más endpoints en el futuro */}
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