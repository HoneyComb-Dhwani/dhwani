import { z } from 'zod';
import type { ULID } from 'ulid';
import { createULIDSchema } from 'src/api/utils/ulid.utils';

const WorkLoginSchema = z.object({
  credentials: z.string(),
  password: z.string(),
});

export const WorkerInfoSchema = z.object({
  id: createULIDSchema(),
  userId: createULIDSchema(),
  userCode: z.string(),
  hospitalId: createULIDSchema(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  isDeleted: z.boolean(),
  hospitalName: z.string(),
  hospitalCode: z.string(),
  userEmail: z.string().email(),
  userRole: z.string(),
  userHashPassword: z.string(),
});

export type WorkLoginDto = z.infer<typeof WorkLoginSchema>;
export type WorkerInfo = z.infer<typeof WorkerInfoSchema>;
