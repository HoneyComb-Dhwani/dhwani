import type { ULID } from 'ulid';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '../db';
import { addresses, hospitals, patients, users } from '../schema';
import type { NewPatient, Patient } from '../types';

export class PatientsRepository {
  async insertPatient(patientDetails: NewPatient): Promise<Patient> {
    const [newPatient] = await db
      .insert(patients)
      .values(patientDetails)
      .returning();

    return newPatient;
  }

  async fetchAllPatients(limit: number, offset: number) {
    const patientsList = await db
      .select({
        id: patients.id,
        hospitalId: patients.hospitalId,
        hospitalName: hospitals.name,
        userId: patients.userId,
        userName: users.name,
        details: {
          firstName: patients.firstName,
          middleName: patients.middleName,
          lastName: patients.lastName,
          email: patients.email,
          phoneNumber: patients.phoneNumber,
          dateOfBirth: patients.dateOfBirth,
        },
        address: {
          id: addresses.id,
          houseNumber: addresses.houseNumber,
          blockNumber: addresses.blockNumber,
          street: addresses.street,
          city: addresses.city,
          state: addresses.state,
          country: addresses.country,
          postalCode: addresses.postalCode,
        },
        emergencyContactName: patients.emergencyContactName,
        emergencyContactPhone: patients.emergencyContactPhone,
        createdAt: patients.createdAt
      })
      .from(patients)
      .leftJoin(hospitals, eq(patients.hospitalId, hospitals.id))
      .leftJoin(users, eq(patients.userId, users.id))
      .leftJoin(addresses, eq(patients.addressId, addresses.id))
      .where(eq(patients.isDeleted, false))
      .limit(limit)
      .offset(offset);

    if (patientsList.length === 0) {
      return null;
    }

    return patientsList ?? null;
  }

  async fetchPatientById(id: ULID) {
    const [patient] = await db
      .select({
        id: patients.id,
        hospitalId: patients.hospitalId,
        hospitalName: hospitals.name,
        userId: patients.userId,
        userName: users.name,
        details: {
          firstName: patients.firstName,
          middleName: patients.middleName,
          lastName: patients.lastName,
          email: patients.email,
          phoneNumber: patients.phoneNumber,
          dateOfBirth: patients.dateOfBirth,
        },
        address: {
          id: addresses.id,
          houseNumber: addresses.houseNumber,
          blockNumber: addresses.blockNumber,
          street: addresses.street,
          city: addresses.city,
          state: addresses.state,
          country: addresses.country,
          postalCode: addresses.postalCode,
        },
      })
      .from(patients)
      .leftJoin(hospitals, eq(patients.hospitalId, hospitals.id))
      .leftJoin(users, eq(patients.userId, users.id))
      .leftJoin(addresses, eq(patients.addressId, addresses.id))
      .where(and(eq(patients.id, id), eq(patients.isDeleted, false)));

    return patient ?? null;
  }

  async fetchPatientByUserId(userId: ULID) {
    const [patient] = await db
      .select({
        id: patients.id,
        hospitalId: patients.hospitalId,
        hospitalName: hospitals.name,
        userId: patients.userId,
        userName: users.name,
        details: {
          firstName: patients.firstName,
          middleName: patients.middleName,
          lastName: patients.lastName,
          email: patients.email,
          phoneNumber: patients.phoneNumber,
          dateOfBirth: patients.dateOfBirth,
        },
        address: {
          id: addresses.id,
          houseNumber: addresses.houseNumber,
          blockNumber: addresses.blockNumber,
          street: addresses.street,
          city: addresses.city,
          state: addresses.state,
          country: addresses.country,
          postalCode: addresses.postalCode,
        },
      })
      .from(patients)
      .leftJoin(hospitals, eq(patients.hospitalId, hospitals.id))
      .leftJoin(users, eq(patients.userId, users.id))
      .leftJoin(addresses, eq(patients.addressId, addresses.id))
      .where(and(eq(patients.userId, userId), eq(patients.isDeleted, false)));

    return patient ?? null;
  }

  async fetchPatientsByHospital(
    hospitalId: ULID,
    limit: number,
    offset: number,
  ) {
    const patientsList = await db
      .select()
      .from(patients)
      .where(
        and(eq(patients.hospitalId, hospitalId), eq(patients.isDeleted, false)),
      )
      .limit(limit)
      .offset(offset);

    return patientsList ?? [];
  }

  async updatePatient(
    id: ULID,
    updatedData: Partial<Omit<Patient, 'id'>>,
  ): Promise<Patient | null> {
    const [updatedPatient] = await db
      .update(patients)
      .set({
        ...updatedData,
        [patients.updatedAt.name]: sql`NOW()`,
      })
      .where(and(eq(patients.id, id), eq(patients.isDeleted, false)))
      .returning();

    return updatedPatient ?? null;
  }

  async deletePatient(id: ULID): Promise<boolean> {
    const result = await db
      .update(patients)
      .set({
        [patients.isDeleted.name]: true,
        [patients.deletedAt.name]: sql`NOW()`,
      })
      .where(eq(patients.id, id));

    return result.rowCount === 1;
  }
}

export const patientsRepository = new PatientsRepository();
