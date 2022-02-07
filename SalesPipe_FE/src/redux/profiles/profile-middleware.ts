import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { ThunkAppDispatch } from '../store';
import { asyncCreateSDRProfile } from './profile-slice';
import { message } from 'antd';
import { ErrorModel } from 'models/ErrorModel';

export const profileMiddleware: Middleware<void, RootState, ThunkAppDispatch> =
  (middlewareOptions) => (next) => async (action) => {
    const result = next(action);

    // CUSTOMERS
    if (asyncCreateSDRProfile.rejected.match(action)) {
      const error = action.payload as ErrorModel;

      if (error.statusCode === 400) {
        message.error(error.message);
      } else {
        message.error(`Failed to create a user!`);
      }
    }

    return result;
  };
