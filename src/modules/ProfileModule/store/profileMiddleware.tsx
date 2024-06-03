import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Toast} from 'squashapps-react-native-uikit';
import {currentUser, userApi} from '../../../routes/apiRoutes';
import {GET_USER, PATCH_USER} from '../../../redux/actions';
import {User} from './profile.types';

export const getUserMiddleWare = createAsyncThunk(
  GET_USER,
  async (_a, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(currentUser);
      return data;
    } catch (error: any) {
      if (error.response?.data?.error?.message) {
        Toast.danger({message: error.response.data.error.message});
      }
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const patchUserMiddleWare = createAsyncThunk(
  PATCH_USER,
  async (
    {
      id,
      employeeId,
      name,
      type,
      dateOfBirth,
      email,
      dutyInTime,
      dutyOutTime,
      status,
      phone,
      createdAt,
      updatedAt,
      salt,
      additionalProp1,
      profileImageUrl,
    }: User,
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios.patch(userApi(id), {
        id,
        employeeId,
        name,
        type,
        dateOfBirth,
        email,
        dutyInTime,
        dutyOutTime,
        status,
        phone,
        createdAt,
        updatedAt,
        salt,
        additionalProp1,
        profileImageUrl,
      });
      return data;
    } catch (error: any) {
      if (error.response?.data?.error?.message) {
        Toast.danger({message: error.response.data.error.message});
      }
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
