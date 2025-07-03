// Usuario

export enum UserRoleEnum {
  ADMINISTRADOR = "Administrador",
  SERVICIO_SOCIAL = "Servicio Social",
  ALBERGUE = "Albergue",
}

export type UserType = {
  id: string;
  fullName: string;
  searchName?: string; // sin tildes ni mayusculas
  mail?: string;
  userName: string;
  address: string;
  phone: string;
  passwordHash: string;
  confirmPassword?: string; // Solo en formularios
  role: UserRoleEnum;
};

// Alumno

export enum SocialServiceTypeEnum {
  PRESENCIAL = "Presencial",
  CALENDARIO = "Calendario",
  DONATIVO = "Donativo",
}

export enum ServiceDurationEnum {
  CUATRO_MESES = "Cuatro Meses",
  SEIS_MESES = "Seis Meses",
}

export enum ServiceStatusEnum {
  ACTIVO = "Activo",
  INACTIVO = "Inactivo",
  COMPLETADO = "Completado",
}

export type StudentType = {
  id: string;
  fullName: string;
  searchName?: string;
  personalPhone?: string;
  firstGuardianName: string;
  firstGuardianRelation: string;
  firstGuardianPhone: string;
  secoundGuardianName?: string;
  secoundGuardianRelation?: string;
  secoundGuardianPhone?: string;
  school: string;
  career: string;
  enrollmentNumber: string;
  schoolContactName: string;
  schoolContactPosition: string;
  schoolContactPhone: string;
  schoolDirectorName?: string;
  letterReceiverName: string;
  letterReceiverPosition: string;
  serviceType: SocialServiceTypeEnum;
  calendar?: CalendarType;
  tasksDescription?: string;
  serviceStartDate: Date;
  serviceDuration: ServiceDurationEnum;
  serviceEndDate?: Date;
  serviceStatus: ServiceStatusEnum;
  ActivitiesStartTime?: Date;
  ActivitiesEndTime?: Date;
  donationDate?: Date;
  donationAmount?: number;
  documents?: DocumentType[];
};

// Paciente

export enum GenderEnum {
  HOMBRE = "Hombre",
  MUJER = "Mujer",
}

export enum PatientStatusEnum {
  ACTIVO = "Activo",
  SUSPENDIDO = "Suspendido",
  REMISION = "Remisión",
  FALLECIDO = "Fallecido",
  UNICO_APOYO = "Único Apoyo",
}

export enum DiagnosisEnum {
  LEUCEMIA = "Leucemia",
  LINFOMA = "Linfoma",
  OTRO = "Otro",
}

export type PatientType = {
  id: string;
  fileNumber: string;
  fullName: string;
  gender: GenderEnum;
  birthdate?: Date;
  age?: number;
  state?: string;
  city?: string;
  address?: string;
  phone?: string;
  hospital?: HospitalType;
  diagnosis?: DiagnosisEnum;
  diagnosisNotes?: string;
  firstContactName?: string;
  firstContactRelation?: string;
  firstContactPhone?: string;
  secoundContactName?: string;
  secoundContactRelation?: string;
  secoundContactPhone?: string;
  status: PatientStatusEnum;
  registrationDate?: Date;
  family?: FamilyMemberType[];
  documents?: DocumentType[];
  receipts?: ReceiptType[];
  totalInvested?: number;
};

// Familiar

export enum FamilyRelationEnum {
  MADRE = "Madre",
  PADRE = "Padre",
  HERMANO = "Hermano",
  ABUELO = "Abuelo",
  TIO = "Tío",
  OTRO = "Otro",
}

export type FamilyMemberType = {
  id: string;
  patient: PatientType;
  name: string;
  relation: FamilyRelationEnum;
  birthdate: Date;
  age: number;
  gender: GenderEnum;
  education?: string;
  occupation?: string;
  maritalStatus?: string;
};

// Escuela

export type SchoolType = {
  id: string;
  name: string;
  notes?: string;
  students: StudentType[];
};

// Hospital

export type HospitalType = {
  id: string;
  name: string;
  notes?: string;
  patients?: PatientType[];
};

// Documento

export type DocumentType = {
  id: string;
  file: File;
  notes?: string;
  student?: StudentType | null;
  patient?: PatientType | null;
};

// Calendario

export enum CalendarStatusEnum {
  PENDIENTE = "Pendiente",
  COMPLETADO = "Completado",
}

export type CalendarType = {
  id: string;
  student: StudentType | string | null;
  year: number;
  serviceDuration: ServiceDurationEnum;
  months: CalendarMonthType[];
  status: CalendarStatusEnum;
};

// Recuadro de Mes

export type CalendarMonthType = {
  id: string;
  calendar: CalendarType;
  monthName: string;
  status: CalendarStatusEnum;
  activitiesDescription: string;
};

// Recibo

export type ReceiptType = {
  id: string;
  patient: PatientType;
  date?: Date;
  provider?: string; // no se ve en el front
  sections: ReceiptSectionType[];
  totalAmount: number;
  notes?: string;
};

// Seccion

export type ReceiptSectionType = {
  id: string;
  quantity: number;
  product: ProductType;
  receipt: ReceiptType;
  unitPrice: number;
  totalPrice: number;
};

// Producto

export enum ProductCategoryEnum {
  MEDICAMENTO = "Medicamento",
  ESTUDIOS = "Estudios",
  HOSPITAL = "Hospital",
  FUNERAL = "Funeral",
  TRASPLANTE = "Trasplante",
  OTRO = "Otro",
}

export type ProductType = {
  id: string;
  name: string;
  category: ProductCategoryEnum;
  sections?: ReceiptSectionType[];
};
