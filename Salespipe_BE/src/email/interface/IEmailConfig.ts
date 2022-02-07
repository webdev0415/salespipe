export interface IEmailConfig {
  apiKey: string;
  defaultSender: string;
  salesPipeEmail: string;
  templates: {
    forgotPasswordRequestId: string;
    changePasswordRequestId: string;
    changedPasswordId: string;
    signupEmailPrepareId: string;
    signupEmailConfirmId: string;
    createdAccountId: string;
    verifiedAccountId: string;
    newContract: string;
  };
}
