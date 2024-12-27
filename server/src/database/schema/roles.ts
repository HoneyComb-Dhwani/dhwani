import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulidType } from "../types";
import { ULID, ulid } from "ulid";

export const roleEnums = pgEnum("roleEnums", ["user", "therapist", "supervisor", "admin"])
export const roles = pgTable("roles", {
    id: ulidType("id").primaryKey().$defaultFn(() => ulid() as unknown as ULID),
    type: roleEnums("type").notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull().default(false),
})