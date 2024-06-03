import {createSlice} from '@reduxjs/toolkit';
import {
  feedsListMiddleWare,
  feedsProfileListMiddleWare,
  feedsSavedMiddleWare,
} from './reelsMiddleware';
import {FeedListReducerState} from './reels.types';

const feedListInitialState: FeedListReducerState = {
  isLoading: false,
  error: '',
  data: [],
};

const feedListReducer = createSlice({
  name: 'feed_list',
  initialState: feedListInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(feedsListMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(feedsListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(feedsListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const feedsProfileListInitialState: FeedListReducerState = {
  isLoading: false,
  error: '',
  data: [],
};

const feedsProfileListReducer = createSlice({
  name: 'feedsProfileList_list',
  initialState: feedsProfileListInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(feedsProfileListMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(feedsProfileListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(feedsProfileListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const feedsSavedInitialState: FeedListReducerState = {
  isLoading: false,
  error: '',
  data: [],
};

const feedsSavedReducer = createSlice({
  name: 'feedsSaved',
  initialState: feedsSavedInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(feedsSavedMiddleWare.pending, state => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(feedsSavedMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(feedsSavedMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const feedListReducers = feedListReducer.reducer;
export const feedsProfileListReducers = feedsProfileListReducer.reducer;
export const feedsSavedReducers = feedsSavedReducer.reducer;
