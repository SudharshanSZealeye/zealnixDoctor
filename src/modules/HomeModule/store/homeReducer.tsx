import {createSlice} from '@reduxjs/toolkit';
import {TodayAppointmentReducerState} from './home.types';
import {
  recentappointmentMiddleWare,
  todaysappointmentMiddleWare,
} from './homeMiddleware';

const todaysappointmentInitialState: TodayAppointmentReducerState = {
  isLoading: false,
  error: '',
  appointment: [
    {
      id: '',
      type: '',
      hospitalId: '',
      branchId: '',
      patientId: '',
      doctorId: '',
      appointmentStart: '',
      appointmentEnd: '',
      appointmentDate:'',
      patientContact: '',
      patientEmail: '',
      title: '',
      notes: '',
      createdAt: '',
      updatedAt: '',
      patient: {
        id: '',
        name: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        weightInKg: 0,
        heightInCm: 0,
        bloodGroup: '',
        phone: '',
        maritalStatus: '',
        address: '',
        pinCode: '',
        city: '',
        state: '',
        country: '',
        profilePicUrl: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelationship: '',
        takingMedicationsCurrently: false,
        currentMedicationsDescription: '',
        reasonForVisit: '',
        drugAllergies: '',
        illnessHistory: null,
        surgeryHistory: null,
        exerciseHabit: '',
        dietStyle: '',
        alcoholConsumption: '',
        caffeineConsumption: '',
        smokingHabit: '',
        medicalHistoryComments: '',
        status: '',
        hospitalId: '',
        branchId: '',
      },
      doctor: {
        id: '',
        employeeId: '',
        name: '',
        type: '',
        dateOfBirth: '',
        email: '',
        dutyInTime: 0,
        dutyOutTime: 0,
        status: '',
        phone: '',
        hospitalId: '',
        branchId: '',
        departmentId: '',
        createdBy: '',
        createdAt: '',
        updatedAt: '',
        salt: '',
        additionalProp1: {},
      },appointmentSchedule:{
        id: '',
        appointmentRangeStart: 0,
        appointmentRangeEnd: 0,
        regularSlot: 0,
        prioritySlot: 0,
        videoSlot: 0,
        maxSlots: 0,
        createdAt: '',
        updatedAt: '',
        createdById: '',
        updatedById: '',
        hospitalId: '',
        branchId: ''
      }
    },
  ],
};

const todaysAppointmentReducer = createSlice({
  name: 'todaysappointment',
  initialState: todaysappointmentInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(todaysappointmentMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(todaysappointmentMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appointment = action.payload;
    });
    builder.addCase(todaysappointmentMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const recentappointmentInitialState: TodayAppointmentReducerState = {
  isLoading: false,
  error: '',
  appointment: [
    {
      id: '',
      type: '',
      hospitalId: '',
      branchId: '',
      patientId: '',
      doctorId: '',
      appointmentDate:'',
      appointmentStart: '',
      appointmentEnd: '',
      patientContact: '',
      patientEmail: '',
      title: '',
      notes: '',
      createdAt: '',
      updatedAt: '',
      patient: {
        id: '',
        name: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        weightInKg: 0,
        heightInCm: 0,
        bloodGroup: '',
        phone: '',
        maritalStatus: '',
        address: '',
        pinCode: '',
        city: '',
        state: '',
        country: '',
        profilePicUrl: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelationship: '',
        takingMedicationsCurrently: false,
        currentMedicationsDescription: '',
        reasonForVisit: '',
        drugAllergies: '',
        illnessHistory: null,
        surgeryHistory: null,
        exerciseHabit: '',
        dietStyle: '',
        alcoholConsumption: '',
        caffeineConsumption: '',
        smokingHabit: '',
        medicalHistoryComments: '',
        status: '',
        hospitalId: '',
        branchId: '',
      },
      doctor: {
        id: '',
        employeeId: '',
        name: '',
        type: '',
        dateOfBirth: '',
        email: '',
        dutyInTime: 0,
        dutyOutTime: 0,
        status: '',
        phone: '',
        hospitalId: '',
        branchId: '',
        departmentId: '',
        createdBy: '',
        createdAt: '',
        updatedAt: '',
        salt: '',
        additionalProp1: {},
      },appointmentSchedule:{
        id: '',
        appointmentRangeStart: 0,
        appointmentRangeEnd: 0,
        regularSlot: 0,
        prioritySlot: 0,
        videoSlot: 0,
        maxSlots: 0,
        createdAt: '',
        updatedAt: '',
        createdById: '',
        updatedById: '',
        hospitalId: '',
        branchId: ''
      }
    },
  ],
};

const recentAppointmentReducer = createSlice({
  name: 'recentappointment',
  initialState: recentappointmentInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(recentappointmentMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(recentappointmentMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appointment = action.payload;
    });
    builder.addCase(recentappointmentMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const todaysAppointmentReducers = todaysAppointmentReducer.reducer;
export const recentAppointmentReducers = recentAppointmentReducer.reducer;
