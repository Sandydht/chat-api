import { z, ZodType } from 'zod';
import { AddNewContactValidatorSchema } from '../models/contact-validator.models';

export const addNewContactSchema: ZodType<AddNewContactValidatorSchema> = z.object({
  member_id: z.string()
});
