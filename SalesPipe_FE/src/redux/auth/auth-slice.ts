import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncThunkOptions } from 'models/AsyncThunkOptions';
import { AuthenticationService } from 'services/AuthenticationService';
import { SetPassword, SignupPrepareModel } from 'models/SignupPrepareModel';
import { AuthStateModel } from 'models/AuthStateModel';
import { message } from 'antd';
import { Roles } from 'app/App';

export const TOKEN_KEY = process.env.TOKEN_KEY || 'SalesPipeTokenKey';
export const TOKEN_ROLES = process.env.TOKEN_KEY || 'SalesPipeRoles';
export const TOKEN_EMAIL = process.env.TOKEN_KEY || 'SalesPipeEmail';

export enum AuthLoadingId {
  SIGNUP_PREPARE = 'SIGNUP_PREPARE',
  SIGNUP_PREPARE_CONFIRM = 'SIGNUP_PREPARE_CONFIRM',
  SET_PASSWORD = 'SET_PASSWORD',
  SIGN_IN = 'SIGN_IN',
  GET_ME = 'GET_ME'
}

interface SignupPrepareParams {
  email: string;
}

interface GetMe {
  response: any;
}

interface SignupPrepareConfirmParams {
  email: string;
  code: string;
}
interface SetPasswordParams {
  email: string;
  password: string;
}
interface SignupPreparePayload {
  data: SignupPrepareModel | null;
}

interface SignupPrepareConfirmPayload {
  data: SignupPrepareModel | null;
}

interface SetPasswordPayload {
  data: SetPassword | null;
}

const initialState: AuthStateModel = {
  type: null,
  username: null,
  email: localStorage.getItem(TOKEN_EMAIL) || null,
  firstName: null,
  lastName: null,
  isActive: null,
  id: null,
  loading: [],
  prepareSuccess: false,
  prepareConfirmSuccess: false,
  setPwdSuccess: false,
  roles: localStorage.getItem(TOKEN_ROLES)?.split(',') || []
};

export const asyncSignupPrepare = createAsyncThunk<
  SignupPreparePayload,
  SignupPrepareParams,
  AsyncThunkOptions
>('auth/asyncSignupPrepare', async (params, thunkOptions) => {
  const { rejectWithValue } = thunkOptions;
  const { email } = params;

  const response = await AuthenticationService.signupPrepare(email);

  if (response.error !== null) {
    return rejectWithValue(response.error.errorMessage);
  }

  return response;
});

export const asyncSignupPrepareConfirm = createAsyncThunk<
  SignupPrepareConfirmPayload,
  SignupPrepareConfirmParams,
  AsyncThunkOptions
>('auth/asyncSignupPrepareConfirm', async (params, thunkOptions) => {
  const { rejectWithValue } = thunkOptions;
  const { email, code } = params;
  const userParam = {
    email,
    code
  };
  const response = await AuthenticationService.signupPrepareConfirm(userParam);

  if (response.error !== null) {
    return rejectWithValue(response.error.errorMessage);
  }

  return response;
});

export const asyncSetPassword = createAsyncThunk<
  SetPasswordPayload,
  SetPasswordParams,
  AsyncThunkOptions
>('auth/asyncSetPassword', async (params, thunkOptions) => {
  const { rejectWithValue } = thunkOptions;
  const { email, password } = params;
  const userParam = {
    email,
    password
  };
  // let response: any;
  const response = await AuthenticationService.setPassword(userParam);

  if (response.data) {
    localStorage.setItem(TOKEN_KEY, response.data.access_token);
    localStorage.setItem(TOKEN_EMAIL, userParam.email);
  }
  if (response.error !== null) {
    return rejectWithValue(response.error.errorMessage);
  }

  return response;
});

export const asyncLogin = createAsyncThunk<
  SetPasswordPayload,
  SetPasswordParams,
  AsyncThunkOptions
>('auth/asyncLogin', async (params, thunkOptions) => {
  const { rejectWithValue } = thunkOptions;
  const { email, password } = params;
  const userParam = {
    email,
    password
  };
  // let response: any;
  const response = await AuthenticationService.login(userParam);

  if (response.data) {
    localStorage.setItem(TOKEN_KEY, response.data.access_token);
    localStorage.setItem(TOKEN_ROLES, response.data.roles.join(','));
    localStorage.setItem(TOKEN_EMAIL, response.data.email);

    message.success('Sign in successful');
  }
  if (response.error !== null) {
    message.error('Sign in error');

    return rejectWithValue(response.error.errorMessage);
  }

  return response;
});

export const asyncGetMe = createAsyncThunk<
  SetPasswordPayload,
  GetMe,
  AsyncThunkOptions
>('auth/getMe', async (params, thunkOptions) => {
  const { rejectWithValue } = thunkOptions;
  const { response } = params;

  if (response.data) {
    localStorage.setItem(TOKEN_KEY, response.data.access_token);
    localStorage.setItem(TOKEN_ROLES, response.data.roles.join(','));
    localStorage.setItem(TOKEN_EMAIL, response.data.email);
  }
  if (response.error !== null) {
    return rejectWithValue(response.error.errorMessage);
  }

  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // SIGNUP PREPARE
    builder.addCase(asyncSignupPrepare.fulfilled, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== AuthLoadingId.SIGNUP_PREPARE
      );
      state.prepareSuccess = true;
    });
    builder.addCase(asyncSignupPrepare.pending, (state) => {
      state.loading.push(AuthLoadingId.SIGNUP_PREPARE);
    });
    builder.addCase(asyncSignupPrepare.rejected, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== AuthLoadingId.SIGNUP_PREPARE
      );
    });

    //SIGNUP PREPARE CONFIRM
    builder.addCase(asyncSignupPrepareConfirm.fulfilled, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== AuthLoadingId.SIGNUP_PREPARE_CONFIRM
      );
      state.prepareConfirmSuccess = true;
    });
    builder.addCase(asyncSignupPrepareConfirm.pending, (state) => {
      state.loading.push(AuthLoadingId.SIGNUP_PREPARE_CONFIRM);
    });
    builder.addCase(asyncSignupPrepareConfirm.rejected, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== AuthLoadingId.SIGNUP_PREPARE_CONFIRM
      );
    });

    //SET PASSWORD
    builder.addCase(asyncSetPassword.fulfilled, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== AuthLoadingId.SET_PASSWORD
      );
      state.setPwdSuccess = true;
      state.email = localStorage.getItem(TOKEN_EMAIL);
      state.roles = [Roles.NOROLE];
    });
    builder.addCase(asyncSetPassword.pending, (state) => {
      state.loading.push(AuthLoadingId.SET_PASSWORD);
    });
    builder.addCase(asyncSetPassword.rejected, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== AuthLoadingId.SET_PASSWORD
      );
    });

    //Login
    builder.addCase(asyncLogin.fulfilled, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== AuthLoadingId.SIGN_IN
      );
      state.loginSuccess = true;
      state.email = localStorage.getItem(TOKEN_EMAIL);
      state.roles = localStorage.getItem(TOKEN_ROLES)?.split(',') || [
        Roles.NOROLE
      ];
    });
    builder.addCase(asyncLogin.rejected, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== AuthLoadingId.SIGN_IN
      );
      state.loginSuccess = false;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_ROLES);
      localStorage.removeItem(TOKEN_EMAIL);
    });

    //GetMe
    builder.addCase(asyncGetMe.fulfilled, (state) => {
      state.loading = state.loading.filter((id) => id !== AuthLoadingId.GET_ME);
      state.loginSuccess = true;
      state.email = localStorage.getItem(TOKEN_EMAIL);
      state.roles = localStorage.getItem(TOKEN_ROLES)?.split(',') || [
        Roles.NOROLE
      ];
    });
    builder.addCase(asyncGetMe.rejected, (state) => {
      state.loading = state.loading.filter((id) => id !== AuthLoadingId.GET_ME);
      state.loginSuccess = false;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_ROLES);
      localStorage.removeItem(TOKEN_EMAIL);
    });
  }
});

export const authReducer = authSlice.reducer;
