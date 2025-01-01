import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { ulidType } from '../types';
import { ULID, ulid } from 'ulid';
import { users } from './users';
import { addresses } from './addresses';

export const therapists = pgTable('therapists', {
  id: ulidType('id')
    .primaryKey()
    .$defaultFn(() => ulid() as unknown as ULID),
  userId: ulidType('user_id', {
    primaryKey: false,
    default: ulid,
    foreignKey: true,
  }).references(() => users.id),
  firstName: text('first_name').notNull(),
  middleName: text('middle_name'),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phone_number').notNull(),
  addressId: ulidType('address_id', {
    primaryKey: false,
    default: ulid,
    foreignKey: true,
  })
    .notNull()
    .references(() => addresses.id),
  userCode: text('user_code').notNull(),
  hospitalId: ulidType('hospital_id', {
    primaryKey: false,
    default: ulid,
    foreignKey: true,
  }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull().default(false),
});
