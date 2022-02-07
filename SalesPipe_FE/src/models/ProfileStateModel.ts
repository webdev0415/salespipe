import { ProfleLoadingId } from 'redux/profiles/profile-slice';

export interface ProfileStateModel {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  linkedIn: string | null;
  phone: string | null;
  countryId: string | null;
  headline: string | null;
  rate: number | null;
  bio: string | null;
  workHistory: string | null;
  loading: ProfleLoadingId[];
  createSDRProfileSuccess?: boolean;
}
