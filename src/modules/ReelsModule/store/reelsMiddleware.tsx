import {createAsyncThunk} from '@reduxjs/toolkit';
import {Toast} from 'squashapps-react-native-uikit';
import axios from 'axios';
import {
  feedsApi,
  feedsReactionsApi,
  feedsSavedApi,
  fileUploadApi,
} from '../../../routes/apiRoutes';
import {
  FEEDS_LIST,
  FEEDS_PROFILE_LIST,
  FILE_UPLOAD,
  FEEDS_REACTION,
  FEEDS_SAVED_LIST,
} from '../../../redux/actions';
import {FeedsPayload} from './reels.types';

export const fileUploadMiddleWare = createAsyncThunk(
  FILE_UPLOAD,
  async ({formData}: any, {rejectWithValue}) => {
    try {
      const {data} = await axios.post(fileUploadApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

export const feedsPostMiddleWare = createAsyncThunk(
  FILE_UPLOAD,
  async (
    {
      description,
      coverImageUrl,
      videoUrl,
    }: FeedsPayload,
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios.post(feedsApi, {
        description,
        coverImageUrl,
        videoUrl,
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

export const feedsListMiddleWare = createAsyncThunk(
  FEEDS_LIST,
  async (
    {
      include = ['createdBy'],
    }: {
      include?: string[];
    },
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios.get(feedsApi, {
        params: {
          filter: {
            include,
          },
        },
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

export const feedsProfileListMiddleWare = createAsyncThunk(
  FEEDS_PROFILE_LIST,
  async (
    {
      include = ['createdBy'],
      createdById,
    }: {
      include?: string[];
      createdById: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios.get(feedsApi, {
        params: {
          filter: {
            include,
            where: {
              createdById,
            },
          },
        },
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

export const feedsReactionsMiddleWare = createAsyncThunk(
  FEEDS_REACTION,
  async (
    {
      feedId,
      type = 'like',
    }: {
      feedId: string;
      type: 'like' | 'unlike' | 'saved' | 'unsaved';
    },
    {rejectWithValue},
  ) => {
    try {
      const {data} = await axios.post(feedsReactionsApi, {
        type,
        feedId,
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

export const feedsSavedMiddleWare = createAsyncThunk(
  FEEDS_SAVED_LIST,
  async (_a, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(feedsSavedApi);
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
