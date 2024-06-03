import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Toast} from 'squashapps-react-native-uikit';
import {
  PRESCRIPTIONS_LIST,
  MEDICINES_LIST,
  POST_PRESCRIPTION,
  MEDICINES_DETAILS,
  DELETE_PRESCRIPTION,
  PATCH_PRESCRIPTION,
} from '../../../redux/actions';
import {
  prescriptionsListApi,
  medicinesListApi,
  medicineDetailsApi,
  prescrtionDeleteApi,
} from '../../../routes/apiRoutes';
import {
  PatchPresciptionList,
  PostPresciptionData,
  PresciptionPayload,
} from './prescribe.types';
import {urlEncode} from '../../../utils/helpers';

export const prescriptionsListMiddleWare = createAsyncThunk(
  PRESCRIPTIONS_LIST,
  async (
    {
      offset = 0,
      limit = 100,
      skip = 0,
      order,
      where,
      quantity = true,
      id = true,
      dosageTimes = true,
      dosage = true,
      autoReorder = true,
      appointmentId = true,
      medicineId = true,
      include = [
        {
          relation: 'medicine',
        },
      ],
    }: PresciptionPayload,
    {rejectWithValue},
  ) => {
    const params = {
      offset,
      limit,
      skip,
      order,
      where,
      fields: {
        quantity,
        id,
        dosageTimes,
        dosage,
        autoReorder,
        appointmentId,
        medicineId,
      },
      include,
    };

    try {
      const {data} = await axios.get(
        `${prescriptionsListApi}?filter=${urlEncode(params)}`,
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

export const medicinesListMiddleWare = createAsyncThunk(
  MEDICINES_LIST,
  async (_a, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(medicinesListApi);
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

export const postPresciptionMiddleWare = createAsyncThunk(
  POST_PRESCRIPTION,
  async (
    {
      quantity,
      dosageTimes,
      dosage,
      autoReorder,
      appointmentId,
      medicineId,
    }: PostPresciptionData,
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios.post(prescriptionsListApi, {
        quantity,
        dosageTimes,
        dosage,
        autoReorder,
        appointmentId,
        medicineId,
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
export const patchPresciptionMiddleWare = createAsyncThunk(
  PATCH_PRESCRIPTION,
  async (
    {
      quantity,
      dosageTimes,
      dosage,
      id,
      autoReorder,
      appointmentId,
      medicineId,
    }: PatchPresciptionList,
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios.patch(prescrtionDeleteApi(id), {
        quantity,
        dosageTimes,
        dosage,
        autoReorder,
        appointmentId,
        medicineId,
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

export const getMedicineMiddleWare = createAsyncThunk(
  MEDICINES_DETAILS,
  async ({medicineId}: any, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(medicineDetailsApi(medicineId));
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

export const deletePrescriptionMiddleWare = createAsyncThunk(
  DELETE_PRESCRIPTION,
  async ({prescriptionId}: any, {rejectWithValue}) => {
    try {
      const {data} = await axios.delete(prescrtionDeleteApi(prescriptionId));
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
