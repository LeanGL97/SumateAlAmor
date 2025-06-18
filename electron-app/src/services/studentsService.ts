import studentsMock from "@/mocks/studientsMocks";
import { StudentType } from "@/types/types";

export const getAllStudents = (): StudentType[] => {
  try {
    return studentsMock;

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
    console.error("Error getting students:", error);
    throw error;
  }
};
