import patientsMock from "@/mocks/patientsMock";
import { PatientType } from "@/types/types";

export const getAllPatients = (): PatientType[] => {
  try {
    return patientsMock;

    // const response = await fetch("https://tu-api/GetAllStudents", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    // });

    // if (!response.ok) {
    //   throw new Error("Error en login");
    // }

    // const data = await response.json();
    // console.log(data);

    // return data;
  } catch (error) {
    console.error("Error getting patients:", error);
    throw error;
  }
};
