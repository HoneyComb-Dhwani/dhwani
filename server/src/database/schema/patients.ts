import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulidType } from "../types";
import { ulid } from "ulid";
import { addresses } from "./addresses";
import { users } from "./users";

export const genderEnums = pgEnum("genderEnum", ["Male", "Female", "Other"])
export const patients = pgTable("patients", {
    id: ulidType("id", {
        primaryKey: true,
        default: ulid
    }).primaryKey(),
    userId: ulidType("user_id", {
        primaryKey: false,
        default: ulid,
        foreignKey: true
    }).references(() => users.id),
    firstName: text("first_name").notNull(),
    middleName: text("middle_name"),
    lastName: text("last_name").notNull(),
    email: text("email").notNull().unique(),
    phoneNumber: text("phone_number").notNull(),
    dateOfBirth: timestamp("date_of_birth").notNull(),
    gender: genderEnums("gender").notNull(),
    addressId: ulidType("address_id", {
        primaryKey: false,
        default: ulid,
        foreignKey: true
    }).references(() => addresses.id),
    emergencyContactName: text("emergency_contact_name").notNull(),
    emergencyContactPhone: text("emergency_contact_phone").notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull().default(false),
})