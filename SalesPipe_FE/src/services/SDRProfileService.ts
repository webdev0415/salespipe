import { DTOModel } from 'models/DTOModel';
import { SDRProfileModel } from 'models/SDRProfileModel';
import api from 'services/api';
const createMySDRProfile = async (
  data: SDRProfileModel
): Promise<DTOModel<SDRProfileModel | null>> => {
  return await api.post('/user-profiles/my', data);
};

const createSDRProfile = async (
  data: SDRProfileModel
): Promise<DTOModel<SDRProfileModel | null>> => {
  return await api.post('/user-profiles/admin', data);
};

const updateSDRProfile = async (
  user: SDRProfileModel
): Promise<DTOModel<any>> => {
  return await api.patch(`/user-profiles/${user.id}`, user);
};

const getAllSDRProfilesAvailable = async (
  filters?: any
): Promise<DTOModel<SDRProfileModel[]>> => {
  return (await api.get('/user-profiles/available', { params: filters })).data;
};

const getAllSDRProfilesVerified = async (
  filters?: any
): Promise<DTOModel<SDRProfileModel[]>> => {
  return (await api.get('/user-profiles/verified', { params: filters })).data;
};

const updateSDRProfilesVerified = async (
  userId: string,
  isVerified: boolean
): Promise<DTOModel<any>> => {
  return await api.post('/user-profiles/verified', { isVerified, userId });
};

const getSDRProfileByUserId = async (
  userId: string
): Promise<DTOModel<SDRProfileModel>> => {
  return await api.get(`/user-profiles/user/${userId}`);
};

const getMySDRProfile = async (): Promise<DTOModel<SDRProfileModel>> => {
  return await api.get(`/user-profiles/my`);
};

export const SDRProfileService = {
  createMySDRProfile,
  createSDRProfile,
  updateSDRProfile,
  getAllSDRProfilesVerified,
  getAllSDRProfilesAvailable,
  updateSDRProfilesVerified,
  getSDRProfileByUserId,
  getMySDRProfile
};
