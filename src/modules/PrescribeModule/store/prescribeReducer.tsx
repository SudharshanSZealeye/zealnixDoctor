import {createSlice} from '@reduxjs/toolkit';
import {
  MedicinesListReducerState,
  PostPrescriptionReducerState,
  PrescriptionsListReducerState,
  GetMedicineReducerState,
  DeletePrescriptionReducerState,
} from './prescribe.types';
import {
  medicinesListMiddleWare,
  postPresciptionMiddleWare,
  prescriptionsListMiddleWare,
  getMedicineMiddleWare,
  deletePrescriptionMiddleWare,
  patchPresciptionMiddleWare,
} from './prescribeMiddleware';

const medicinesListInitialState: MedicinesListReducerState = {
  isLoading: false,
  error: '',
  data: [],
};

const medicinesListReducer = createSlice({
  name: 'medicinesList',
  initialState: medicinesListInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(medicinesListMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(medicinesListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(medicinesListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const prescriptionsListInitialState: PrescriptionsListReducerState = {
  isLoading: false,
  error: '',
  data: [
    {
      quantity: 0,
      id: '',
      dosageTimes: [''],
      dosage: '',
      autoReorder: false,
      appointmentId: '',
      medicineId: '',
      medicine: {
        id: '',
        image: '',
        drugId: '',
        name: '',
        manufacturer: '',
        totalStock: 0,
      },
    },
  ],
};

const prescriptionsListReducer = createSlice({
  name: 'prescriptionsList',
  initialState: prescriptionsListInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(prescriptionsListMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(prescriptionsListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(prescriptionsListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const postPrescriptionInitialState: PostPrescriptionReducerState = {
  isLoading: false,
  error: '',
  data: {
    quantity: 0,
    id: '',
    dosageTimes: [''],
    dosage: '',
    autoReorder: false,
    appointmentId: '',
    medicineId: '',
  },
};

const postPrescriptionsReducer = createSlice({
  name: 'postPrescription',
  initialState: postPrescriptionInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postPresciptionMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(postPresciptionMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(postPresciptionMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});
const patchPrescriptionInitialState: PostPrescriptionReducerState = {
  isLoading: false,
  error: '',
  data: {
    quantity: 0,
    id: '',
    dosageTimes: [''],
    dosage: '',
    autoReorder: false,
    appointmentId: '',
    medicineId: '',
  },
};

const patchPrescriptionsReducer = createSlice({
  name: 'patchPrescription',
  initialState: patchPrescriptionInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(patchPresciptionMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(patchPresciptionMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(patchPresciptionMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const getMedicineInitialState: GetMedicineReducerState = {
  isLoading: false,
  error: '',
  data: {
    image: '',
    drugId: '',
    name: '',
    manufacturer: '',
    totalStock: 0,
    id: '',
  },
};

const getMedicineReducer = createSlice({
  name: 'getMedicineDetails',
  initialState: getMedicineInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMedicineMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getMedicineMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getMedicineMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});
const deletePrescriptionInitialState: DeletePrescriptionReducerState = {
  isLoading: false,
  error: '',
  data: '',
};

const deletePrescriptionReducer = createSlice({
  name: 'deletePrescription',
  initialState: deletePrescriptionInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(deletePrescriptionMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(deletePrescriptionMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(deletePrescriptionMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const patchPrescriptionsReducers = patchPrescriptionsReducer.reducer;
export const postPrescriptionsReducers = postPrescriptionsReducer.reducer;
export const medicinesListReducers = medicinesListReducer.reducer;
export const prescriptionsListReducers = prescriptionsListReducer.reducer;
export const getMedicineReducers = getMedicineReducer.reducer;
export const deletePrescriptionReducers = deletePrescriptionReducer.reducer;
