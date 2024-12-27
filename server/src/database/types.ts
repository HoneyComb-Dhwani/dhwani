import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { customType } from "drizzle-orm/pg-core";
import type { ULID } from "ulid";
import { users } from "./schema/users";
import { addresses } from "./schema/addresses";
import { consultations } from "./schema/consultations";
import { hospitals } from "./schema/hospitals";
import { patients } from "./schema/patients";
import { roles } from "./schema/roles";
import { sessions } from "./schema/sessions";
import { supervisors } from "./schema/supervisors";
import { therapists } from "./schema/therapists";
import { userRoles } from "./schema/userRoles";

export const ulidType = customType<{
    data: ULID;
    notNull: true;
    default: true;
}>({
    dataType() {
        return 'char(26)';
    },
});

export type Address = InferSelectModel<typeof addresses>
export type NewAddress = InferInsertModel<typeof addresses>

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

export type Role = InferSelectModel<typeof roles>
export type NewRole = InferInsertModel<typeof roles>

export type UserRole = InferSelectModel<typeof userRoles>
export type NewUserRole = InferInsertModel<typeof userRoles>

export type Hospital = InferSelectModel<typeof hospitals>
export type NewHospital = InferInsertModel<typeof hospitals>

export type Patient = InferSelectModel<typeof patients>
export type NewPatient = InferInsertModel<typeof patients>

export type Therapist = InferSelectModel<typeof therapists>
export type NewTherapist = InferInsertModel<typeof therapists>

export type Supervisor = InferSelectModel<typeof supervisors>
export type NewSupervisor = InferInsertModel<typeof supervisors>

export type Consultation = InferSelectModel<typeof consultations>
export type NewConsultation = InferInsertModel<typeof consultations>

export type Session = InferSelectModel<typeof sessions>
export type NewSession = InferInsertModel<typeof sessions>

