export interface ErrorHandlerResponse {
  status: string;
  message?: string;
  errors?: ErrorMessages[];
}

export interface ErrorMessages {
  field: string;
  message: string;
}