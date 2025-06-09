import { useState } from 'react'
import './index.css' // Asegurate que importás el CSS donde está tailwind (index.css, no App.css)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="h-screen bg-terciario flex flex-col gap-4 justify-center items-center">
        <h1 className="text-white text-3xl font-bold ">Sumate al Amor</h1>
        <h1 className="primario">Título con Poppins y color primario</h1>
        <p className="secundario">Texto con Nunito y color secundario</p>
      </div>
    </>
  )
}

export default App

