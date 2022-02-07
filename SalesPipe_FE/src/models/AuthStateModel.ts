import { AuthLoadingId } from 'redux/auth/auth-slice';

export interface AuthStateModel {
  type: string | null;
  username: string | null;
  email: string | null;
  roles: string[] | null;
  firstName: string | null;
  lastName: string | null;
  isActive: boolean | null;
  id: string | null;
  loading: AuthLoadingId[];
  prepareSuccess?: boolean;
  prepareConfirmSuccess?: boolean;
  setPwdSuccess?: boolean;
  loginSuccess?: boolean;
}
