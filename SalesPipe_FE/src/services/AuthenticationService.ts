import { AxiosResponse } from 'axios';
import { DTOModel } from 'models/DTOModel';
import {
  Login,
  SetPassword,
  SignupPrepareConfirmModel
} from 'models/SignupPrepareModel';
import { SignupPrepareModel } from 'models/SignupPrepareModel';
import { SetPasswordModel } from 'models/SetPasswordModel';
import api from './api';
const TOKEN_KEY = process.env.TOKEN_KEY || 'SalesPipeTokenKey';

const signupPrepare = async (
  email: string
): Promise<DTOModel<SignupPrepareModel | null>> => {
  const response: DTOModel<SignupPrepareModel | null> = {
    data: null,
    error: null,
    status: null
  };

  try {
    const resp: AxiosResponse<{ data: null; totalCount: number } | null> =
      await api.post('/auth/signup/email-prepare', { email });

    response.status = resp.status;
    response.totalCount = resp.data?.totalCount;
  } catch (err: any) {
    console.log(err);
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status
    };
  }

  // return response;
  return response;
};

const signupPrepareConfirm = async (
  userParam: SignupPrepareConfirmModel
): Promise<DTOModel<SignupPrepareModel | null>> => {
  const response: DTOModel<SignupPrepareModel | null> = {
    data: null,
    error: null,
    status: null
  };

  try {
    const resp: AxiosResponse<{ data: null; totalCount: number } | null> =
      await api.post('/auth/signup/email-confirm', userParam);

    response.status = resp.status;
    response.totalCount = resp.data?.totalCount;
  } catch (err: any) {
    console.log(err);
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status
    };
  }

  // return response;
  return response;
};

const setPassword = async (
  userParam: SetPasswordModel
): Promise<DTOModel<SetPassword | null>> => {
  const response: DTOModel<SetPassword | null> = {
    data: null,
    error: null,
    status: null
  };

  try {
    const resp: AxiosResponse<SetPassword> = await api.post(
      'auth/set-password',
      userParam
    );

    response.status = resp.status;
    response.data = resp.data;
  } catch (err: any) {
    console.log(err);
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status
    };
  }

  return response;
};

const login = async (
  userParam: SetPasswordModel
): Promise<DTOModel<Login | null>> => {
  const response: DTOModel<Login | null> = {
    data: null,
    error: null,
    status: null
  };

  try {
    const resp: AxiosResponse<Login> = await api.post('auth/login', userParam);

    if (resp) {
      localStorage.setItem(TOKEN_KEY, resp.data.access_token);
    }

    response.status = resp.status;
    response.data = resp.data;
  } catch (err: any) {
    console.log(err);
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status
    };
  }

  return response;
};

const getMe = async (): Promise<DTOModel<Login | null>> => {
  const response: DTOModel<Login | null> = {
    data: null,
    error: null,
    status: null
  };

  try {
    const resp: AxiosResponse<Login> = await api.get('auth/me');

    if (resp) {
      localStorage.setItem(TOKEN_KEY, resp.data.access_token);
      localStorage.setItem(TOKEN_KEY, resp.data.email);
      localStorage.setItem(TOKEN_KEY, resp.data.roles.join(','));
    }

    response.status = resp.status;
    response.data = resp.data;
  } catch (err: any) {
    console.log(err);
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status
    };
  }

  return response;
};

const resetPassword = async (email: string) => {
  return await api.post('/auth/forgot-password-request', { email });
};

const forgotPasswordChange = async (
  email: string,
  password: string,
  code: string
) => {
  const response: any = {};

  try {
    const resp = await api.post('/auth/forgot-password-change', {
      email,
      password,
      code
    });

    response.status = resp.status;
    response.data = resp.data;
  } catch (err: any) {
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status
    };
  }

  return response;
};

const changePassword = async (dto: any) => {
  const response: any = {};

  try {
    const resp = await api.post('/auth/change-password', dto);

    response.status = resp.status;
    response.data = resp.data;
  } catch (err: any) {
    response.error = {
      errorMessage: err.response.data,
      status: err.response.status
    };
  }

  return response;
};

export const AuthenticationService = {
  login,
  signupPrepare,
  signupPrepareConfirm,
  setPassword,
  getMe,
  resetPassword,
  forgotPasswordChange,
  changePassword
};
