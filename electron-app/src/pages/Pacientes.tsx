import Button from "@/components/Button";
import { getAllPatients } from "@/services/patientService";
import { PatientType } from "@/types/types";
import { Link } from "react-router-dom";

const Pacientes = () => {
  const patients = getAllPatients();

  return (
    <div className="p-[2%] flex flex-col flex-grow bg-secundario">
      <h1 className="text-4xl font-bold m-4 text-white">Pacientes</h1>
      <span className="text-lg">Filtro de busqueda 👈</span>
      <div className="flex flex-col mt-4 space-y-3">
        {patients.map((patient: PatientType) => {
          return (
            <div
              className="w-full flex p-2.5 min-h-24 bg-terciario rounded-lg hover:border-[3px] border-[#1A2238]"
              key={patient.id}
            >
              <div className="flex flex-1 flex-col mr-2 text-center">
                <div className="h-1/2 grid grid-cols-2 place-items-center">
                  <span>
                    Alumno: <span className="font-bold">{patient.fullName}</span>
                  </span>
                  <span>
                    Escuela: <span className="font-bold"> {patient.status} </span>
                  </span>
                </div>
                <div className="h-1/2 grid grid-cols-2 place-items-center">
                  <span>
                    Genero: <span className="font-bold"> {patient.gender} </span>
                  </span>
                  <span>
                    Número de Expediente: <span className="font-bold"> {patient.fileNumber} </span>
                  </span>
                </div>
              </div>
              <div className="w-1/3 flex items-center justify-center">
                <Link to={`/alumnos/${patient.id}`} className="h-full w-full flex items-center justify-center">
                  <Button className="h-12 w-4/5 hover:text-terciario">Ver Paciente</Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pacientes;
