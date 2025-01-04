import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { ulidType } from '../types';
import { ULID, ulid } from 'ulid';
import { addresses } from './addresses';

export const hospitals = pgTable('hospitals', {
  id: ulidType('id')
    .primaryKey()
    .$defaultFn(() => ulid() as unknown as ULID),
  name: text('name').notNull(),
  addressId: ulidType('address_id', {
    primaryKey: false,
    default: ulid,
    foreignKey: true,
  }).references(() => addresses.id),
  email: text('email').notNull(),
  phoneNumber: text('phone_number').notNull(),
  code: text('code').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull().default(false),
});
