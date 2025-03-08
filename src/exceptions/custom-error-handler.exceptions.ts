import { Response } from 'express';
import { ZodError } from "zod";
import ClientError from './commons/ClientError';
import { ErrorHandlerResponse, ErrorMessages } from '../models/custom-error-handler.models';
import { ERROR_HANDLER } from '../constants/error-handler.constants';

export const errorHandler = (res: Response, error: any): Response => {
  if (error instanceof ZodError) {
    const zodError = zodErrorHandlerResponse(error);
    return res.status(400).json(zodError);
  } else if (error instanceof ClientError) {
    return res.status(400).json({
      status: 'Error',
      message: error.message
    })
  } else if (error.name == ERROR_HANDLER.VALIDATION_ERROR) {
    const mongooseValidationError = mongooseValidationErrorHandlerResponse(error);
    return res.status(400).json(mongooseValidationError);
  } else {
    const internalServerError = internalServerErrorHandlerResponse(error);
    return res.status(500).json(internalServerError)
  }
};

const mongooseValidationErrorHandlerResponse = (error: any): ErrorHandlerResponse => {
  const errorMessages = Object.values(error?.errors).map((e: any) => ({
    field: e.path,
    message: e.message,
  }));

  return {
    status: 'Error',
    errors: errorMessages
  };
};

const zodErrorHandlerResponse = (error: ZodError): ErrorHandlerResponse => {
  const errorMessages: ErrorMessages[] = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message
  }));

  return {
    status: 'Error', 
    errors: errorMessages
  };
};

const internalServerErrorHandlerResponse = (error: Error): ErrorHandlerResponse => {
  return {
    status: 'Error',
    message: 'Internal server error!'
  };
}
