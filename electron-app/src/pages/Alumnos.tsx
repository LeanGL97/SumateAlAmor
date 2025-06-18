import Button from "@/components/Button";
import { getAllStudents } from "@/services/studentsService";
import { StudentType } from "@/types/types";
import { Link } from "react-router-dom";

const Alumnos = () => {
  const students = getAllStudents();

  return (
    <div className="p-[2%] flex flex-col h-screen bg-secundario">
      <h1 className="text-4xl font-bold m-4 text-white">Alumnos</h1>
      <span className="text-lg">Filtro de busqueda</span>
      <div className="flex flex-col mt-4 space-y-3">
        {students.map((student: StudentType) => {
          return (
            <div
              className="w-full flex p-2 h-28 bg-terciario rounded-lg hover:border-[3px] border-[#1A2238]"
              key={student.id}
            >
              <div className="flex flex-1 flex-col mr-2 text-center">
                <div className="h-1/2 grid grid-cols-4 place-items-center">
                  <span>
                    Alumno: <span className="font-bold">{student.fullName}</span>
                  </span>
                  <span>
                    Escuela: <span className="font-bold"> {student.school} </span>
                  </span>
                  <span>
                    Matricula: <span className="font-bold">{student.enrollmentNumber}</span>
                  </span>
                  <span>
                    Estado: <span className="font-bold text-red-600">- MIRAR LUEGO -</span>
                  </span>
                </div>
                <div className="h-1/2 grid grid-cols-4 place-items-center">
                  <span>
                    Servicio Social: <span className="font-bold"> {student.serviceType} </span>
                  </span>
                  <span>
                    Fecha de inicio:{" "}
                    <span className="font-bold">{student.serviceStartDate.toString().split('GMT')[0]}</span>
                  </span>
                  <span>
                    Fecha de finalizacion:{" "}
                    <span className="font-bold">{student.serviceEndDate?.toString().split('GMT')[0] || "Donativo Único"}</span>
                  </span>
                  <div className="h-full w-full flex items-center justify-center">
                    <Link to={`/alumnos/${student.id}`} className="h-full w-full">
                    <Button className="h-12 w-4/5 hover:text-terciario">Ver Alumno</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alumnos;
