import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Toast } from 'squashapps-react-native-uikit';
import { branchApi, loginApi, signupApi } from '../../../routes/apiRoutes';
import { BRANCHLIST, LOGIN, SIGNUP } from '../../../redux/actions';
import { BranchListPayload, SignUpPayload } from './login.types';

export const loginMiddleWare = createAsyncThunk(
  LOGIN,
  async (
    {
      email = 'default@example.com', 
      password = 'defaultPassword', 
      type = 'defaultType'
    }: { email: string; password: string; type: string },
    { rejectWithValue },
  ) => {
    delete axios.defaults.headers.common['Authorization'];
    try {
      const { data } = await axios.post(loginApi, { email, password, type });
      return data;
    } catch (error: any) {
      if (error.response?.data?.error?.message) {
        Toast.danger({ message: error.response.data.error.message });
      }
      return rejectWithValue(error.message);
    }
  },
);

export const signupMiddleWare = createAsyncThunk(
  SIGNUP,
  async (
    {
      name,
      email = 'default@example.com',
      password = 'defaultPassword',
      branchId,
      phone,
      type = 'doctor',
      dateOfBirth = '2023-06-05T06:13:52.266Z',
      dutyInTime = 0,
      dutyOutTime = 0,
      status = 'active',
      hospitalId = '6450eab2c9980f24b5af7d7b',
      departmentId = '64a522e45b1a2d22852fefb9',
      designationId = '64a522f35b1a2d22852fefba',
      additionalProp1 = {},
    }: SignUpPayload,
    { rejectWithValue },
  ) => {
    delete axios.defaults.headers.common['Authorization'];
    try {
      const { data } = await axios.post(signupApi, {
        name,
        type,
        dateOfBirth,
        email,
        password,
        dutyInTime,
        dutyOutTime,
        status,
        phone,
        hospitalId,
        branchId,
        departmentId,
        designationId,
        additionalProp1,
      });
      return data;
    } catch (error: any) {
      if (error.response?.data?.error?.message) {
        Toast.danger({ message: error.response.data.error.message });
      }
      return rejectWithValue(error.message);
    }
  },
);

export const branchListMiddleWare = createAsyncThunk(
  BRANCHLIST,
  async (
    {
      offset = 0,
      limit = 100,
      skip = 0,
      hospitalId,
      id = true,
      branchID = true,
      name = true,
      address = true,
      pinCode = true,
      city = true,
      state = true,
      country = true,
      status = true,
      email = true,
      phone = true,
      isMainBranch = true,
      hospitalIdBool = true,
      createdBy = true,
      createdAt = true,
      updatedAt = true,
    }: BranchListPayload,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(branchApi, {
        params: {
          filter: {
            offset,
            limit,
            skip,
            where: {
              hospitalId,
            },
            fields: {
              id,
              branchID,
              name,
              address,
              pinCode,
              city,
              state,
              country,
              status,
              email,
              phone,
              isMainBranch,
              hospitalId: hospitalIdBool,
              createdBy,
              createdAt,
              updatedAt,
            },
          },
        },
      });
      return data;
    } catch (error: any) {
      if (error.response?.data?.error?.message) {
        Toast.danger({ message: error.response.data.error.message });
      }
      return rejectWithValue(error.message);
    }
  },
);
