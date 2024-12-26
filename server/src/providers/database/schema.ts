import {
  customType,
  pgTable,
  text,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { type ULID, ulid } from 'ulid';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

const ulidType = customType<{
  data: ULID;
  notNull: true;
  default: true;
}>({
  dataType() {
    return 'char(26)';
  },
});

export const users = pgTable('users', {
  id: ulidType('id', {
    primaryKey: true,
    default: ulid,
  }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  hashPassword: text('hash_password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull().default(false),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;