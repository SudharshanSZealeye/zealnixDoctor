import {AppointmentScheduleType, Doctor, Patient} from '../../AppointmentModule/store/appointment.types';

export interface TodayAppointmentReducerState {
  isLoading: boolean;
  error: string;
  appointment: TodaysAppointmentList[];
}

export interface TodaysAppointmentList {
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
  appointmentDate:string;
  title: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  patient: Patient;
  doctor: Doctor;
  appointmentSchedule:AppointmentScheduleType;
}
