import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulidType } from "../types";
import { ulid } from "ulid";

export const addresses = pgTable("addresses", {
    id: ulidType("id", {
        primaryKey: true,
        default: ulid
    }).primaryKey(),
    houseNumber: text("house_number"),
    blockNumber: text("block_number"),
    street: text("street"),
    city: text("city").notNull(),
    state: text("state").notNull(),
    postalCode: text("postal_code").notNull(),
    country: text("country").notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull().default(false)
})