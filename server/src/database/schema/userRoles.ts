import { boolean, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { ulidType } from '../types';
import { ULID, ulid } from 'ulid';
import { users } from './users';
import { roles } from './roles';

export const userRoles = pgTable('userRoles', {
  id: ulidType('id')
    .primaryKey()
    .$defaultFn(() => ulid() as unknown as ULID),
  userId: ulidType('user_id', {
    primaryKey: false,
    default: ulid,
    foreignKey: true,
  }).references(() => users.id),
  roleId: ulidType('role_id', {
    primaryKey: false,
    default: ulid,
    foreignKey: true,
  }).references(() => roles.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull().default(false),
});
