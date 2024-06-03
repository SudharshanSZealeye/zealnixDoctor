import {BranchResponseProp} from '../../LoginModule/store/login.types';

export interface AppointmentsList {
  id: string;
  type: string;
  hospitalId: string;
  branchId: string;
  patientId: string;
  doctorId: string;
  appointmentStart: string;
  appointmentEnd: string;
  patientContact: string;
  patientEmail: string;
  title: string;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  hospital: Hospital;
  patient: Patient;
  doctor: Doctor;
  appointmentSchedule: AppointmentScheduleType;
}
export interface Hospital {
  id: string;
  name: string;
  profilePicUrl: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}
export interface Patient {
  id: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  weightInKg: number;
  heightInCm: number;
  bloodGroup: string;
  phone: string;
  maritalStatus: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  profilePicUrl: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  takingMedicationsCurrently: boolean;
  currentMedicationsDescription: string;
  reasonForVisit: string;
  drugAllergies: string;
  illnessHistory?: string[] | null;
  surgeryHistory?: string[] | null;
  exerciseHabit: string;
  dietStyle: string;
  alcoholConsumption: string;
  caffeineConsumption: string;
  smokingHabit: string;
  medicalHistoryComments: string;
  status: string;
  hospitalId: string;
  branchId: string;
}
export interface Doctor {
  id: string;
  employeeId: string;
  name: string;
  type: string;
  dateOfBirth: string;
  email: string;
  dutyInTime: number;
  dutyOutTime: number;
  status: string;
  phone: string;
  hospitalId: string;
  branchId: string;
  departmentId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  salt: string;
  additionalProp1: AdditionalProp1;
  branch?: BranchResponseProp;
}
export interface AdditionalProp1 {}

export interface AppointmentsReducerState {
  isLoading: boolean;
  error: string;
  data: AppointmentsList[];
}

export interface AppointmentDetails {
  id: string;
  type: string;
  hospitalId: string;
  branchId: string;
  patientId: string;
  doctorId: string;
  status: string;
  cancellation_reason?: string;
  appointmentDate: string;
  appointmentStart: string;
  appointmentEnd: string;
  patientContact: string;
  patientEmail: string;
  tokenId: string;
  bookedVia: string;
  title: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  hospital: Hospital;
  patient: Patient;
  doctor: Doctor;
  appointmentSchedule: AppointmentScheduleType;
}

export interface AppointmentDetailsReducerState {
  isLoading: boolean;
  error: string;
  data: AppointmentDetails;
}

export interface AppointmentPayload {
  appointmentDate: string;
  scope: Scope;
  order?: string;
}
export interface Scope {
  where: Where;
}
export interface Where {
  appointmentRangeStart: AppointmentRangeStart;
}
export interface AppointmentRangeStart {
  gte: string;
}

export interface AppointmentStart {
  gte?: string;
  between?: string[];
  lt?: string;
  lte?: string;
}

export interface IncludeEntity {
  relation: string;
  scope?: Scopes | null;
}
export interface Scopes {
  include?: IncludeEntity1[] | null;
}
export interface IncludeEntity1 {
  relation: string;
}

export interface OR {
  appointmentStart?: string;
  type?: string;
}
export interface AND {
  appointmentStart?: AppointmentStart;
  type?: string;
  or?: OR[];
}

export interface VitalPayload {
  where: {
    patientId?: string;
    appointmentId?: string;
  };
}
export interface Vital {
  temperature: number;
  id: string;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  bloodSugar: number;
  weight: number;
  height: number;
  appointmentId: string;
  patientId: string;
}
export interface VitalListReducerState {
  isLoading: boolean;
  error: string;
  data: Vital[];
}
export interface AppointmentPatchDetailsReducerState {
  isLoading: boolean;
  error: string;
  data: {};
}

export interface AppointmentTokensReducerState {
  isLoading: boolean;
  error: string;
  data: string;
}

export interface AppointmentScheduleType {
  id: string;
  appointmentRangeStart: number;
  appointmentRangeEnd: number;
  regularSlot: number;
  prioritySlot: number;
  videoSlot: number;
  maxSlots: number;
  createdAt: string;
  updatedAt: string;
  doctorIds?: string[] | null;
  createdById: string;
  updatedById: string;
  hospitalId: string;
  branchId: string;
}

export interface LabReoprtType {
  id: string;
  type: string;
  testDateAndTime: string;
  illness: string;
  reportFileUrl?: string[] | null;
  status: string;
  notes: string;
  patientId: string;
  labTechnicianId: string;
  headDoctorId: string;
  departmentId: string;
  labId: string;
  hospitalId: string;
  branchId: string;
  lab: LabType;
}

export interface LabReportReducerState {
  isLoading: boolean;
  error: string;
  data: LabReoprtType[];
}
export interface LabType {
  id: string;
  labID: string;
  name: string;
  status: string;
  departmentId: string;
  hospitalId: string;
  branchId: string;
  createdAt: string;
  updatedAt: string;
}
