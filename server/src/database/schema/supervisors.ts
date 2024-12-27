import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulidType } from "../types";
import { ulid } from "ulid";
import { hospitals } from "./hospitals";
import { users } from "./users";

export const supervisors = pgTable("supervisors", {
    id: ulidType("id", {
        primaryKey: true,
        default: ulid
    }),
    userId: ulidType("user_id", {
        primaryKey: false,
        default: ulid,
        foreignKey: true
    }).references(() => users.id),
    userCode: text("user_code").notNull().default("supervisor"),
    hospitalId: ulidType("hospital_id", {
        primaryKey: false,
        default: ulid,
        foreignKey: true
    }).references(() => hospitals.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull().default(false),
})