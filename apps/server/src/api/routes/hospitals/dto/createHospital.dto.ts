import { z } from 'zod';

export const CreateHospitalSchema = z.object({
  name: z.string(),
  address: z.object({
    houseNumber: z.string().optional(),
    blockNumber: z.string().optional(),
    street: z.string().optional(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.string(),
  }),
  phoneNumber: z.string(),
  code: z.string(),
  email: z.string().email(),
});

export type CreateHospitalDto = z.infer<typeof CreateHospitalSchema>;
