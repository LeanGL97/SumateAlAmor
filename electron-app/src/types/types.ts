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
  ActivitiesStartTime?: Date;
  ActivitiesEndTime?: Date;
  donationDate?: Date;
  donationAmount?: number;
  documents?: DocumentType[];
  // image?: string | null
};

// Paciente

export enum GenderEnum {
  male = "Hombre",
  female = "Mujer",
}

export enum PatientStatusEnum {
  active = "Activo",
  suspended = "Suspendido",
  inactive = "Inactivo",
  remission = "Remisión",
  deceased = "Fallecido",
  uniqueSupport = "Único Apoyo",
}

export enum DiagnosisEnum {
  leucemia = "Leucemia",
  linfoma = "Linfoma",
  otro = "Otro", // Deja el campo abierto para personalización
}

export type PatientType = {
  id: string;
  fileNumber: string;
  fullName: string;
  gender: GenderEnum;
  birthDate?: Date;
  age?: number;
  state?: string;
  city?: string;
  address?: string;
  phone?: string;
  hospital?: HospitalType;
  diagnosis?: DiagnosisEnum;
  diagnosisNotes?: string;
  contact1Name?: string;
  contact1Relation?: string;
  contact1Phone?: string;
  contact2Name?: string;
  contact2Relation?: string;
  contact2Phone?: string;
  status: PatientStatusEnum;
  registrationDate?: Date;
  family?: FamilyMemberType[];
  documents?: DocumentType[];
  receipts?: ReceiptType[];
  totalInvested?: number;
};

// Familiar

export enum FamilyRelationEnum {
  mother = "Madre",
  father = "Padre",
  sibling = "Hermano/a",
  grandparent = "Abuelo/a",
  uncle = "Tío/tía",
  other = "Otro",
}

export type FamilyMemberType = {
  id: string;
  patient: PatientType;
  name: string;
  relation: FamilyRelationEnum;
  birthDate: Date;
  age?: number;
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
  receiptDate?: Date;
  provider?: string;
  sections: ReceiptSectionType[];
  totalPrice: number;
  notes?: string;
};

// Seccion

export type ReceiptSectionType = {
  id: string;
  quantity: number;
  product: ProductType;
  unitPrice: number;
  totalPrice: number;
};

// Producto

export enum ProductCategoryEnum {
  medicine = "Medicamento",
  studies = "Estudios",
  hospital = "Hospital",
  funeral = "Funeral",
  transplant = "Trasplante",
  other = "Otro",
}

export type ProductType = {
  id: string;
  name: string;
  category: ProductCategoryEnum;
  sections?: ReceiptSectionType[];
};
