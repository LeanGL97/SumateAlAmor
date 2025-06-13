import { useEffect, useState } from 'react'

type Usuario = {
  id: number
  nombre: string
  usuario: string
  correo?: string
  telefono: string
  direccion: string
  rol: 'Administrador' | 'ServicioSocial' | 'Albergue'
}

export default function TestAPI() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (window.api?.getUsuarios) {
      window.api
        .getUsuarios()
        .then((data) => {
          console.log("Usuarios recibidos:", data)
          setUsuarios(data)
        })
        .catch((err) => {
          console.error('Error obteniendo usuarios:', err)
        })
        .finally(() => setLoading(false))
    } else {
      console.warn("window.api.getUsuarios no está definido");
      setLoading(false); // Evita quedar en loading infinito si hay error
    }
  }, []);



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Usuarios (API Test)</h1>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : usuarios.length === 0 ? (
        <p>No hay usuarios en la base de datos.</p>
      ) : (
        <ul className="space-y-4">
          {usuarios.map((usuario) => (
            <li key={usuario.id} className="border p-4 rounded shadow bg-white">
              <p><strong>Nombre:</strong> {usuario.nombre}</p>
              <p><strong>Usuario:</strong> {usuario.usuario}</p>
              <p><strong>Correo:</strong> {usuario.correo}</p>
              <p><strong>Teléfono:</strong> {usuario.telefono}</p>
              <p><strong>Dirección:</strong> {usuario.direccion}</p>
              <p><strong>Rol:</strong> {usuario.rol}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
