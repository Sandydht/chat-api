import { z, ZodType } from 'zod';
import {
  RegisterUserValidatorSchema,
  LoginUserValidatorSchema
} from '../models/auth-validator.models';

export const registerUserSchema: ZodType<RegisterUserValidatorSchema> = z.object({
  name: z.string(),
  phone_number: z.string(),
  password: z.string()
});

export const loginUserSchema: ZodType<LoginUserValidatorSchema> = z.object({
  phone_number: z.string(),
  password: z.string()
});