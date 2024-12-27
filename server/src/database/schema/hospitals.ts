import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulidType } from "../types";
import { ulid } from "ulid";
import { addresses } from "./addresses";

export const hospitals = pgTable("hospitals", {
    id: ulidType("id", {
        primaryKey: true,
        default: ulid
    }).primaryKey(),
    name: text("name").notNull(),
    addressId: ulidType("address_id", {
        primaryKey: false,
        default: ulid,
        foreignKey: true
    }).references(() => addresses.id),
    phoneNumber: integer("phone_number").notNull(),
    code: text("code").notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull().default(false)
})