import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulidType } from "../types";
import { ULID, ulid } from "ulid";
import { consultations } from "./consultations";
import { patients } from "./patients";
import { therapists } from "./therapists";

export const sessions = pgTable("sessions", {
    id: ulidType("id").primaryKey().$defaultFn(() => ulid() as unknown as ULID),
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