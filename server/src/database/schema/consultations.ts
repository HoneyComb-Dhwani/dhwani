import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { ulidType } from "../types";
import { ulid } from "ulid";
import { patients } from "./patients";
import { therapists } from "./therapists";

export const consultations = pgTable("consultations", {
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
