import { NewContractModel } from 'models/ContractModel';
import api from './api';

const hireSDR = async (model: NewContractModel): Promise<void> => {
  return await api.post(`/contracts`, model);
};

export const ContractService = {
  hireSDR
};
