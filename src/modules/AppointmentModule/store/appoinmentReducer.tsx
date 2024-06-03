import {createSlice} from '@reduxjs/toolkit';
import {
  AppointmentDetailsReducerState,
  AppointmentPatchDetailsReducerState,
  AppointmentsReducerState,
  VitalListReducerState,
  AppointmentTokensReducerState,
  LabReportReducerState,
} from './appointment.types';
import {
  appoinmentDetailsMiddleWare,
  appoinmentsListHistoryMiddleWare,
  appoinmentsListMiddleWare,
  getLabReportList,
  patchAppoinmentDetailsMiddleWare,
  patchVitalMiddleWare,
  postVitalMiddleWare,
  vitalListMiddleWare,
  tokenGenerateMiddleWare
} from './appoinmentMiddleware';

const appoinmentListInitialState: AppointmentsReducerState = {
  isLoading: false,
  error: '',
  data: [],
};

const appoinmentListReducer = createSlice({
  name: 'appoinmentList',
  initialState: appoinmentListInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(appoinmentsListMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(appoinmentsListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(appoinmentsListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const appoinmentListHistoryInitialState: AppointmentsReducerState = {
  isLoading: false,
  error: '',
  data: [],
};

const appoinmentListHistoryReducer = createSlice({
  name: 'appoinmentListHistory',
  initialState: appoinmentListHistoryInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(appoinmentsListHistoryMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      appoinmentsListHistoryMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(
      appoinmentsListHistoryMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});

const appoinmentDetailsInitialState: AppointmentDetailsReducerState = {
  isLoading: false,
  error: '',
  data: {
    id: '',
    type: '',
    hospitalId: '',
    branchId: '',
    patientId: '',
    doctorId: '',
    appointmentStart: '',
    appointmentDate: '',
    appointmentEnd: '',
    patientContact: '',
    patientEmail: '',
    title: '',
    status: '',
    notes: '',
    createdAt: '',
    updatedAt: '',
    hospital: {
      id: '',
      name: '',
      profilePicUrl: '',
      address: '',
      pinCode: '',
      city: '',
      state: '',
      country: '',
      email: '',
      phone: '',
      createdAt: '',
      updatedAt: '',
    },
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
      illnessHistory: [],
      surgeryHistory: [],
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
    },
    tokenId: '',
    bookedVia: '',
    appointmentSchedule: {
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
      branchId: '',
    },
  },
};

const appoinmentDetailsReducer = createSlice({
  name: 'appoinment_details',
  initialState: appoinmentDetailsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(appoinmentDetailsMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(appoinmentDetailsMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(appoinmentDetailsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const vitalListInitialState: VitalListReducerState = {
  isLoading: false,
  error: '',
  data: [
    {
      temperature: 0,
      id: '',
      systolicBloodPressure: 0,
      diastolicBloodPressure: 0,
      bloodSugar: 0,
      weight: 0,
      height: 0,
      appointmentId: '',
      patientId: '',
    },
  ],
};

const vitalListReducer = createSlice({
  name: 'vital_list',
  initialState: vitalListInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(vitalListMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(vitalListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(vitalListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const patchVitalReducerInitalState = {
  isLoading: false,
  error: '',
  data: [],
};
const patchVitalReducer = createSlice({
  name: 'patch_vital',
  initialState: patchVitalReducerInitalState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(patchVitalMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(patchVitalMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(patchVitalMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const postVitalReducerInitalState = {
  isLoading: false,
  error: '',
  data: [],
};
const postVitalReducer = createSlice({
  name: 'poat_vital',
  initialState: postVitalReducerInitalState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postVitalMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(postVitalMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(postVitalMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const patchAppoinmentDetailsInitialState: AppointmentPatchDetailsReducerState =
  {
    isLoading: false,
    error: '',
    data: {},
  };

const patchAppoinmentDetailsReducer = createSlice({
  name: 'patch_appoinment_details',
  initialState: patchAppoinmentDetailsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(patchAppoinmentDetailsMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      patchAppoinmentDetailsMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(
      patchAppoinmentDetailsMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});


const appoinmentTokenInitialState: AppointmentTokensReducerState = {
  isLoading: false,
  error: '',
  data: ''
};

const patchAppoinmentTokenReducer = createSlice({
  name: 'patch_appoinment_token',
  initialState: appoinmentTokenInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(tokenGenerateMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      tokenGenerateMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(
      tokenGenerateMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});


const labReportIniitalState: LabReportReducerState = {
  isLoading: false,
  error: '',
  data: [
    {
      id: '',
      type: '',
      testDateAndTime: '',
      illness: '',
      status: '',
      notes: '',
      patientId: '',
      labTechnicianId: '',
      headDoctorId: '',
      departmentId: '',
      labId: '',
      hospitalId: '',
      branchId: '',
      lab: {
        id: '',
        labID: '',
        name: '',
        status: '',
        departmentId: '',
        hospitalId: '',
        branchId: '',
        createdAt: '',
        updatedAt: '',
      },
    },
  ],
};

const labReportReducer = createSlice({
  name: 'labReportList',
  initialState: labReportIniitalState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLabReportList.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getLabReportList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getLabReportList.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const labReportReducers = labReportReducer.reducer;
export const patchVitalReducers = patchVitalReducer.reducer;
export const postVitalReducers = postVitalReducer.reducer;
export const vitalListReducers = vitalListReducer.reducer;
export const appoinmentListReducers = appoinmentListReducer.reducer;
export const patchAppoinmentDetailsReducers =
  patchAppoinmentDetailsReducer.reducer;
export const patchAppoinmentTokenReducers = patchAppoinmentTokenReducer.reducer;
export const appoinmentDetailsReducers = appoinmentDetailsReducer.reducer;
export const appoinmentListHistoryReducers =
  appoinmentListHistoryReducer.reducer;
