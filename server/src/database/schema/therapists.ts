import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulidType } from "../types";
import { ULID, ulid } from "ulid";
import { users } from "./users";

export const therapists = pgTable("therapists", {
    id: ulidType("id").primaryKey().$defaultFn(() => ulid() as unknown as ULID),
    userId: ulidType("user_id", {
        primaryKey: false,
        default: ulid,
        foreignKey: true
    }).references(() => users.id),
    userCode: text("user_code").notNull(),
    hospitalId: ulidType("hospital_id", {
        primaryKey: false,
        default: ulid,
        foreignKey: true
    }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull().default(false),
})