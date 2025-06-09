import { Link } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
    const role = "administrador"; // Cambiar luego por el valor real

    function handleLogout(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <nav>
            <div className="px-2 bg-quinto">
                <div className="flex items-center justify-between w-full mx-auto">
                    <div>
                        <img src="/logo1.png" alt="Logo" className="rounded-md w-28" />
                    </div>
                    <div className="flex items-center gap-32 mx-auto text-lg font-bold">
                        <Link to="/home" className="hover:text-secundario">Inicio</Link>
                        <Link to="/alumnos" className="hover:text-secundario">Alumnos</Link>
                        <Link to="/pacientes" className="hover:text-secundario">Pacientes</Link>
                        <Link to="/gyp" className="hover:text-secundario">Gastos y Productos</Link>

                        {/* Solo si es admin */}
                        {role === "administrador" && (
                            <Link to="/adminDashboard" className="hover:text-secundario">
                                Mi Perfil
                            </Link>
                        )}

                        <Button type="button" className="hover:text-quinto" onClick={handleLogout}>
                            Cerrar sesión
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
