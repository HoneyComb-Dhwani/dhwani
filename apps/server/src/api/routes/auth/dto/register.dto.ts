import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters'),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
