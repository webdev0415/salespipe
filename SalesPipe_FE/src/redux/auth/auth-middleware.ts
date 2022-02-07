import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { ThunkAppDispatch } from '../store';
import { asyncSignupPrepare } from './auth-slice';
import { message } from 'antd';
import { ErrorModel } from 'models/ErrorModel';

export const authMiddleware: Middleware<void, RootState, ThunkAppDispatch> =
  (middlewareOptions) => (next) => async (action) => {
    const result = next(action);

    // CUSTOMERS
    if (asyncSignupPrepare.rejected.match(action)) {
      const error = action.payload as ErrorModel;

      if (error.statusCode === 400) {
        message.error(error.message);
      } else {
        message.error(`Failed to create a user!`);
      }
    }

    return result;
  };
