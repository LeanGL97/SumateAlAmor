import CardSection from "../components/CardSection";

type Rol = "Administrador" | "ServicioSocial" | "Albergue";
type Section = "alumnos" | "pacientes" | "gyp";

const accessMap: Record<Rol, Section[]> = {
    Administrador: ["alumnos", "pacientes", "gyp"],
    ServicioSocial: ["alumnos"],
    Albergue: ["pacientes", "gyp"],
};

function hasAccessToSection(rol: Rol, section: Section): boolean {
    return accessMap[rol].includes(section);
}


const Home = () => {
    const userRol = "Albergue"; // Simulación, luego lo vas a traer del contexto

    return (
        <div>

            <div className="flex items-center justify-between p-4 my-auto gap-8">
                <CardSection
                    title="Alumnos"
                    features={[
                        { text: "Acceder a los alumnos", link: "/alumnos" },
                        { text: "Registrar un nuevo alumno", link: "/alumnos" },
                        { text: "Finalizar un servicio social", link: "/alumnos" }
                    ]}
                    imageUrl="/alumnos.jpg"
                    linkTo="/alumnos"
                    hasAccess={hasAccessToSection(userRol, "alumnos")}
                />

                <CardSection
                    title="Pacientes"
                    features={[
                        { text: "Acceder al listado de todos los pacientes.", link: "/pacientes" },
                        { text: "Buscar pacientes por nombre.", link: "/pacientes" },
                        { text: "Registrar un nuevo paciente.", link: "/pacientes" }
                    ]}
                    imageUrl="/pacientes.jpg"
                    linkTo="/pacientes"
                    hasAccess={hasAccessToSection(userRol, "pacientes")}
                />

                <CardSection
                    title="Gastos y Productos"
                    features={[
                        { text: "Acceder a gastos totales.", link: "/gyp" },
                        { text: "Registrar un producto.", link: "/gyp" },
                        { text: "Registrar una factura.", link: "/gyp" }
                    ]} imageUrl="/gyp.jpg"
                    linkTo="/gyp"
                    hasAccess={hasAccessToSection(userRol, "gyp")}
                />
            </div>
            <img src="/logo2.png" alt="logo" className="mx-auto w-72 p-4" />
        </div>
    );
};

export default Home;