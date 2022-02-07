export interface ErrorModel {
  statusCode?: number;
  message?: string | null;
  errorMessage?: string | null;
  status?: number;
  requestURL?: string;
  requestData?: unknown;
  errorId?: string;
  expandedError?: {
    message: string;
    errorType: string;
    errorCode: number;
  };
}
