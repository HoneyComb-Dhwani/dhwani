import { boolean, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { ulidType } from '../types';
import { ULID, ulid } from 'ulid';

export const roleEnums = pgEnum('roleEnums', ['USER', 'THERAPIST', 'SUPERVISOR', 'ADMIN']);

export const users = pgTable('users', {
  id: ulidType('id')
    .primaryKey()
    .$defaultFn(() => ulid() as unknown as ULID),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  hashPassword: text('hash_password').notNull(),
  role: roleEnums('role').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull().default(false),
});
