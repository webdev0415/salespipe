import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'redux/auth/auth-slice';
import { profileReducer } from 'redux/profiles/profile-slice';

const reducers = {
  auth: authReducer,
  profile: profileReducer
};

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
