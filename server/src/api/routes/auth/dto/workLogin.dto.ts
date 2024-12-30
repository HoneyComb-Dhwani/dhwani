import type { ULID } from 'ulid';

export type WorkLoginDto = {
  credentials: string;
  password: string;
};

export type WorkerInfo = {
  id: ULID;
  userId: ULID;
  userCode: string;
  hospitalId: ULID;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isDeleted: boolean;
  hospitalName: string;
  hospitalCode: string;
  userEmail: string;
  userRole: string;
  userHashPassword: string;
};
