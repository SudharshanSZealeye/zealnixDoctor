import {createSlice} from '@reduxjs/toolkit';
import {UserReducerState} from './profile.types';
import {getUserMiddleWare, patchUserMiddleWare} from './profileMiddleware';

const userInitialState: UserReducerState = {
  isLoading: false,
  error: '',
  data: {
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
    createdAt: '',
    additionalProp1: {},
    hospitalId: '',
    branchId: '',
    departmentId: '',
    designationId: '',
    createdBy: '',
    branch: {
      id: '',
      branchID: '',
      name: '',
      address: '',
      pinCode: '',
      city: '',
      state: '',
      country: '',
      status: '',
      email: '',
      phone: '',
      isMainBranch: false,
      hospitalId: '',
      createdAt: '',
      updatedAt: ''
    },
    profileImageUrl: ''
  },
};

const profileReducer = createSlice({
  name: 'profile',
  initialState: userInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getUserMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getUserMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const patchUserInitialState: UserReducerState = {
  isLoading: false,
  error: '',
  data: {
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
    createdAt: '',
    additionalProp1: {},
    hospitalId: '',
    branchId: '',
    departmentId: '',
    designationId: '',
    createdBy: '',
    profileImageUrl: '',
  },
};

const patchProfileReducer = createSlice({
  name: 'pacthProfile',
  initialState: patchUserInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(patchUserMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(patchUserMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(patchUserMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const profileReducers = profileReducer.reducer;
export const patchProfileReducers = patchProfileReducer.reducer;
