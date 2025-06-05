import { Link } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
    const role = "administrador"; // Cambiar luego por el valor real

    function handleLogout(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <nav>
            <div className="bg-quinto px-2">
                <div className="flex justify-between mx-auto items-center w-full">
                    <div>
                        <img src="/logo1.png" alt="Logo" className="w-28 rounded-md" />
                    </div>
                    <div className="flex items-center mx-auto gap-32 text-lg font-bold">
                        <Link to="/" className="hover:text-cuarto">Inicio</Link>
                        <Link to="/alumnos" className="hover:text-cuarto">Alumnos</Link>
                        <Link to="/pacientes" className="hover:text-cuarto">Pacientes</Link>
                        <Link to="/gyp" className="hover:text-cuarto">Gastos y Productos</Link>

                        {/* Solo si es admin */}
                        {role === "administrador" && (
                            <Link to="/adminDashboard" className="hover:text-cuarto">
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
