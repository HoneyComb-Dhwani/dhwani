import { db } from '../db';
import { consultations, therapists, patients, hospitals, addresses } from '../schema';
import { and, eq, sql } from 'drizzle-orm';
import type { CreateConsultationDto } from 'src/api/routes/consultations/dto';
import type { Consultation, NewAddress } from '../types';
import type { ULID } from 'ulid';

export class ConsultationsRepository {
  async createConsultation(
    userId: ULID,
    consultationData: CreateConsultationDto,
  ): Promise<Consultation | null> {
    const insertConsultation = await db.transaction(async (tx) => {
      const checkHospital = await tx
        .select()
        .from(hospitals)
        .where(eq(hospitals.id, consultationData.hospital.id));

      if (checkHospital.length === 0) {
        return null;
      }

      const [insertAddress] = await tx
        .insert(addresses)
        .values(consultationData.address as NewAddress)
        .returning();

      if (!insertAddress) {
        return null;
      }

      const patientData = {
        userId,
        addressId: insertAddress.id,
        hospitalId: consultationData.hospital.id,
        firstName: consultationData.details.firstName,
        lastName: consultationData.details.lastName,
        email: consultationData.details.email,
        phoneNumber: consultationData.details.phoneNumber || '',
        dateOfBirth: new Date(consultationData.details.dateOfBirth),
        gender: consultationData.details.gender as 'Male' | 'Female' | 'Other',
        emergencyContactName: consultationData.emergencyContactName,
        emergencyContactPhone: consultationData.emergencyContactPhone,
        middleName: consultationData.details.middleName,
      };

      const [insertPatient] = await tx.insert(patients).values(patientData).returning();

      if (!insertPatient) {
        return null;
      }

      const consultData = {
        patientId: insertPatient.id,
        status: 'pending',
      };

      const [insertConsultation] = await tx.insert(consultations).values(consultData).returning();

      if (!insertConsultation) {
        return null;
      }
    });

    return insertConsultation ?? null;
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

  async fetchConsultationsByHospitalId(hospitalId: ULID, limit: number, offset: number) {
    const result = db
      .select()
      .from(consultations)
      .where(and(eq(consultations.isDeleted, false), eq(therapists.hospitalId, hospitalId)))
      .limit(limit)
      .offset(offset);

    return result ?? null;
  }

  async fetchConsultationsByPatientId(patientId: ULID, limit: number, offset: number) {
    const result = db
      .select()
      .from(consultations)
      .where(and(eq(consultations.isDeleted, false), eq(consultations.patientId, patientId)))
      .limit(limit)
      .offset(offset);

    return result ?? null;
  }

  async fetchConsultationsByTherapistId(therapistId: ULID, limit: number, offset: number) {
    const result = db
      .select()
      .from(consultations)
      .where(and(eq(consultations.isDeleted, false), eq(consultations.therapistId, therapistId)))
      .limit(limit)
      .offset(offset);

    return result ?? null;
  }

  async fetchConsultationByPatientIdAndTherapistId(patientId: ULID, therapistId: ULID) {
    const [consultation] = await db
      .select()
      .from(consultations)
      .where(
        and(
          eq(consultations.isDeleted, false),
          eq(consultations.patientId, patientId),
          eq(consultations.therapistId, therapistId),
        ),
      );

    return consultation ?? null;
  }

  async fetchConsultationById(id: ULID) {
    const [consultation] = await db
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
