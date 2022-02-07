import { CompanyProfileModel } from 'models/CompanyProfileModel';
import { DTOModel } from 'models/DTOModel';
import api from 'services/api';
const createCompanyProfile = async (
  data: CompanyProfileModel
): Promise<DTOModel<CompanyProfileModel | null>> => {
  return (await api.post('company-profiles/my', data)).data;
};

export const CompanyProfileService = {
  createCompanyProfile
};
