import { ErrorModel } from './ErrorModel';
import { HTTPStatusCodes } from 'common/enums/HTTPStatusCode';

export interface SignupPrepareModel {
  userId: string;
}

export interface SetPassword {
  access_token: string;
}
export interface SignupPrepareConfirmModel {
  email: string;
  code: string;
}
export interface Login {
  access_token: string;
  roles: string[];
  email: string;
}
