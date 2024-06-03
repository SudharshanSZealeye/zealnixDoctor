import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Toast} from 'squashapps-react-native-uikit';
import {RECENTAPPOINTMET, TODAYSAPPOINTMET} from '../../../redux/actions';
import {appointmentsListApi} from '../../../routes/apiRoutes';
import {urlEncode} from '../../../utils/helpers';

export const todaysappointmentMiddleWare = createAsyncThunk(
  TODAYSAPPOINTMET,
  async ({order, where, include}: any, {rejectWithValue}) => {
    const params = {
      order,
      where,
      include,
    };
    try {
      const {data} = await axios.get(
        `${appointmentsListApi}?filter=${urlEncode(params)}`,
      );
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

export const recentappointmentMiddleWare = createAsyncThunk(
  RECENTAPPOINTMET,
  async ({limit, order, where, include}: any, {rejectWithValue}) => {
    const params = {
      limit,
      order,
      where,
      include,
    };
    try {
      const {data} = await axios.get(
        `${appointmentsListApi}?filter=${urlEncode(params)}`,
      );
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
