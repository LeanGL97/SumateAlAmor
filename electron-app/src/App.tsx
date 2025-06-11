import './index.css' // Asegurate que importás el CSS donde está tailwind (index.css, no App.css)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Alumnos from './pages/Alumnos'
import Pacientes from './pages/Pacientes'
import GastosYProductos from './pages/GastosYProductos'
import AdminDashboard from './pages/AdminDashboard'
import Landing from './pages/Landing'
import { Toaster } from 'sonner'
import PruebasBack from './pages/PruebasBack'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-terciario">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/alumnos" element={<Alumnos />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/gyp" element={<GastosYProductos />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/pruebas-back" element={<PruebasBack />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position='top-right' richColors />
      </div>
    </Router>
  )
}

export default App

