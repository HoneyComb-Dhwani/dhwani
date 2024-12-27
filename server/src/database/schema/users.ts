import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulidType } from "../types";
import { ulid } from "ulid";

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
    isDeleted: boolean('is_deleted').notNull().default(false)
});