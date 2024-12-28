import { db } from '../db';
import { consultations, therapists, patients } from '../schema';
import { and, eq, sql } from 'drizzle-orm';
import type { Consultation, NewConsultation } from '../types';
import type { ULID } from 'ulid';

export class ConsultationsRepository {
  async createConsultation(
    consultationData: NewConsultation,
  ): Promise<Consultation> {
    const [consultation] = await db
      .insert(consultations)
      .values(consultationData)
      .returning();
    return consultation;
  }

  async fetchAllConsultations(limit: number, offset: number) {
    const result = db
      .select()
      .from(consultations)
      .where(eq(consultations.isDeleted, false))
      .limit(limit)
      .offset(offset);

    return result ?? null;
  }

  async fetchConsultationsByHospitalId(
    hospitalId: ULID,
    limit: number,
    offset: number,
  ) {
    const result = db
      .select()
      .from(consultations)
      .where(
        and(
          eq(consultations.isDeleted, false),
          eq(therapists.hospitalId, hospitalId),
        ),
      )
      .limit(limit)
      .offset(offset);

    return result ?? null;
  }

  async fetchConsultationsByPatientId(
    patientId: ULID,
    limit: number,
    offset: number,
  ) {
    const result = db
      .select()
      .from(consultations)
      .where(
        and(
          eq(consultations.isDeleted, false),
          eq(consultations.patientId, patientId),
        ),
      )
      .limit(limit)
      .offset(offset);

    return result ?? null;
  }

  async fetchConsultationsByTherapistId(
    therapistId: ULID,
    limit: number,
    offset: number,
  ) {
    const result = db
      .select()
      .from(consultations)
      .where(
        and(
          eq(consultations.isDeleted, false),
          eq(consultations.therapistId, therapistId),
        ),
      )
      .limit(limit)
      .offset(offset);

    return result ?? null;
  }

  async fetchConsultationById(id: ULID) {
    const consultation = await db
      .select({
        id: consultations.id,
        patientId: consultations.patientId,
        patientFirstName: patients.firstName,
        patientMiddleName: patients.middleName,
        patientLastName: patients.lastName,
        patientEmail: patients.email,
        therapistId: consultations.therapistId,
        therapistFirstName: therapists.firstName,
        therapistMiddleName: therapists.middleName,
        therapistLastName: therapists.lastName,
        therapistEmail: therapists.email,
        createdAt: consultations.createdAt,
        updatedAt: consultations.updatedAt,
        deletedAt: consultations.deletedAt,
        isDeleted: consultations.isDeleted,
      })
      .from(consultations)
      .leftJoin(therapists, eq(consultations.therapistId, therapists.id))
      .leftJoin(patients, eq(consultations.patientId, patients.id))
      .where(and(eq(consultations.id, id), eq(consultations.isDeleted, false)));

    return consultation ?? null;
  }

  async updateConsultation(
    id: ULID,
    updatedData: Partial<Omit<Consultation, 'id'>>,
  ): Promise<Consultation | null> {
    const [consultation] = await db
      .update(consultations)
      .set({
        ...updatedData,
        [consultations.updatedAt.name]: sql`NOW()`,
      })
      .where(and(eq(consultations.id, id), eq(consultations.isDeleted, false)))
      .returning();
    return consultation ?? null;
  }

  async deleteConsultation(id: ULID): Promise<boolean> {
    const result = await db
      .update(consultations)
      .set({
        [consultations.isDeleted.name]: true,
        [consultations.deletedAt.name]: sql`NOW()`,
      })
      .where(eq(consultations.id, id));
    return result.rowCount === 1;
  }
}

export const consultationsRepository = new ConsultationsRepository();
