import { ErrorModel } from './ErrorModel';
import { RootState } from 'redux/rootReducer';

export interface AsyncThunkOptions {
  state: RootState;
  rejectWithValue: ErrorModel;
}
