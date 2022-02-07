export interface NewContractModel {
  hirer?: string;
  hiree: string;
  hirerEmail?: string;
  hireeEmail: string;
  terms?: unknown[];
  startDate?: Date;
  endDate?: Date;
}
