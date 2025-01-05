import { boolean, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { ulidType } from '../types';
import { ULID, ulid } from 'ulid';
import { patients } from './patients';
import { therapists } from './therapists';

export const statusEnums = pgEnum('status', ['pending', 'completed', 'cancelled']);

export const consultations = pgTable('consultations', {
  id: ulidType('id')
    .primaryKey()
    .$defaultFn(() => ulid() as unknown as ULID),
  patientId: ulidType('patient_id', { foreignKey: true }).references(() => patients.id),
  therapistId: ulidType('therapist_id', { foreignKey: true })
    .references(() => therapists.id)
    .default(null),
  status: statusEnums('status').notNull().default('pending'),
  diagnosis: text('diagnosis'),
  treatmentPlan: text('treatment_plan'),
  finalReportUrl: text('final_report_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').notNull().default(false),
});
