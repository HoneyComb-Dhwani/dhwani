import {
    customType,
    pgTable,
    text,
    boolean,
    timestamp,
    pgEnum,
    integer,
} from 'drizzle-orm/pg-core';
import { type ULID, ulid } from 'ulid';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

const ulidType = customType<{
    data: ULID;
    notNull: true;
    default: true;
}>({
    dataType() {
        return 'char(26)';
    },
});

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

export const roleEnums = pgEnum("roleEnums", ["user", "therapist", "supervisor", "admin"])
export const roles = pgTable("roles", {
    id: ulidType("id", {
        primaryKey: true,
        default: ulid
    }),
    type: roleEnums("type").notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull().default(false),
})

export const userRoles = pgTable("userRoles", {
    id: ulidType("id", {
        primaryKey: true,
        default: ulid
    }),
    userId: ulidType("user_id", {
        primaryKey: false,
        default: ulid,
        foreignKey: true
    }).references(() => users.id),
    roleId: ulidType("role_id", {
        primaryKey: false,
        default: ulid,
        foreignKey: true
    }).references(() => roles.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull().default(false),
})

export const addresses = pgTable("addresses", {
    id: ulidType("id", {
        primaryKey: true,
        default: ulid
    }),
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

export const hospitals = pgTable("hospitals", {
    id: ulidType("id", {
        primaryKey: true,
        default: ulid
    }),
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

export const supervisors = pgTable("patients", {
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

export const therapists = pgTable("patients", {
    id: ulidType("id", {
        primaryKey: true,
        default: ulid
    }),
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

export const genderEnums = pgEnum("genderEnum", ["Male", "Female", "Other"])
export const patients = pgTable("patients", {
    id: ulidType("id", {
        primaryKey: true,
        default: ulid
    }),
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

export const consultations = pgTable("patients", {
    id: ulidType("id", {
        primaryKey: true,
        default: ulid
    }),
    patientId: ulidType("patient_id", { foreignKey: true }).references(() => patients.id),
    therapistId: ulidType("therapist_id", { foreignKey: true }).references(() => therapists.id),
    diagnosis: text("diagnosis").notNull(),
    treatmentPlan: text("treatment_plan").notNull(),
    finalReportUrl: text("final_report_url"),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull().default(false),
})

export const sessions = pgTable("patients", {
    id: ulidType("id", {
        primaryKey: true,
        default: ulid
    }),
    patientId: ulidType("patient_id", { foreignKey: true }).references(() => patients.id),
    therapistId: ulidType("therapist_id", { foreignKey: true }).references(() => therapists.id),
    consultationId: ulidType("consultation_id", { foreignKey: true }).references(() => consultations.id),
    therapistNotes: text("therapist_notes"),
    documentUrl: text("document_url"),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').notNull().default(false),
})

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
