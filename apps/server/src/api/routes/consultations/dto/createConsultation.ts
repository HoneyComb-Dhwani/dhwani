import { createULIDSchema } from 'src/api/utils/ulid.utils';
import { z } from 'zod';

const addressSchema = z.object({
  houseNumber: z.string().optional(),
  blockNumber: z.string().optional(),
  street: z.string().optional(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
});

const CreateConsultationSchema = z.object({
  hospital: z.object({
    id: createULIDSchema(),
    name: z.string(),
    address: addressSchema,
    phoneNumber: z.string(),
    code: z.string(),
  }),
  details: z.object({
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
    email: z.string(),
    gender: z.string() as z.ZodType<'Male' | 'Female' | 'Other'>,
    phoneNumber: z.string().optional(),
    dateOfBirth: z.string(),
  }),
  address: addressSchema,
  emergencyContactName: z.string(),
  emergencyContactPhone: z.string(),
});

export type CreateConsultationDto = z.infer<typeof CreateConsultationSchema>;
