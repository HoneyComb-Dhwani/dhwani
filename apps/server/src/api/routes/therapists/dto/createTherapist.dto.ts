import { createULIDSchema } from 'src/api/utils';
import { z } from 'zod';

export const CreateTherapistSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  userCode: z.string(),
  address: z.object({
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.string(),
  }),
  hospitalId: createULIDSchema(),
});

export type CreateTherapistDto = z.infer<typeof CreateTherapistSchema>;
