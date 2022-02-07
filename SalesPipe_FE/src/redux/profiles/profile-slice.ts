import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncThunkOptions } from 'models/AsyncThunkOptions';
import { ProfileStateModel } from 'models/ProfileStateModel';
import { SDRProfileModel } from 'models/SDRProfileModel';
import { SDRProfileService } from 'services/SDRProfileService';

export enum ProfleLoadingId {
  CREATE_PROFILE = 'CREATE_PROFILE'
}

export interface CreateSDRProfileParams {
  data: SDRProfileModel;
  afterSucces: (userId: string) => void;
}

export interface CreateSDRProfilePayload {
  data: SDRProfileModel | null;
}
const initialState: ProfileStateModel = {
  email: null,
  firstName: null,
  lastName: null,
  linkedIn: null,
  phone: null,
  countryId: null,
  headline: null,
  rate: null,
  bio: null,
  workHistory: null,
  loading: [],
  createSDRProfileSuccess: false
};

export const asyncCreateSDRProfile = createAsyncThunk<
  CreateSDRProfilePayload,
  CreateSDRProfileParams,
  AsyncThunkOptions
>('profile/asyncCreateSDRProfile', async (params, thunkOptions) => {
  const { rejectWithValue } = thunkOptions;
  const { data, afterSucces } = params;

  // let response: any;
  const response = await SDRProfileService.createMySDRProfile(data);

  if (response.error) {
    return rejectWithValue(response.error.errorMessage);
  }

  if (response.data) {
    afterSucces(response.data.userId);
  }

  return {
    data: response.data
  };
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Create Profile
    builder.addCase(asyncCreateSDRProfile.fulfilled, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== ProfleLoadingId.CREATE_PROFILE
      );
      state.createSDRProfileSuccess = true;
    });
    builder.addCase(asyncCreateSDRProfile.pending, (state) => {
      state.loading.push(ProfleLoadingId.CREATE_PROFILE);
    });
    builder.addCase(asyncCreateSDRProfile.rejected, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== ProfleLoadingId.CREATE_PROFILE
      );
    });
  }
});

export const profileReducer = profileSlice.reducer;
