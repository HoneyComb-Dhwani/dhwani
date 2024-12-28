import { db } from '../db';
import { therapists, hospitals, users } from '../schema/';
import { and, eq, sql } from 'drizzle-orm';
import type { NewTherapist, Therapist } from '../types';
import type { ULID } from 'ulid';

export class TherapistRepository {
  async insertTherapist(therapistData: NewTherapist): Promise<Therapist> {
    const [therapist] = await db
      .insert(therapists)
      .values(therapistData)
      .returning();
    return therapist;
  }

  async fetchAllTherapists(): Promise<Therapist[]> {
    return db.select().from(therapists).where(eq(therapists.isDeleted, false));
  }

  async fetchTherapistById(id: ULID): Promise<Therapist | null> {
    const [therapist] = await db
      .select()
      .from(therapists)
      .where(and(eq(therapists.id, id), eq(therapists.isDeleted, false)));
    return therapist ?? null;
  }

  async fetchTherapistByHospitalId(
    hospitalId: ULID,
  ): Promise<Therapist | null> {
    const [therapist] = await db
      .select()
      .from(therapists)
      .where(
        and(
          eq(therapists.hospitalId, hospitalId),
          eq(therapists.isDeleted, false),
        ),
      );
    return therapist ?? null;
  }

  async fetchTherapistByUserAndHospitalCode(
    userCode: string,
    hospitalCode: string,
  ) {
    const [therapist] = await db
      .select({
        id: therapists.id,
        userId: therapists.userId,
        userCode: therapists.userCode,
        hospitalId: therapists.hospitalId,
        createdAt: therapists.createdAt,
        updatedAt: therapists.updatedAt,
        deletedAt: therapists.deletedAt,
        isDeleted: therapists.isDeleted,
        hospitalName: hospitals.name,
        hospitalCode: hospitals.code,
        userEmail: users.email,
        userRole: users.role,
        userHashPassword: users.hashPassword,
      })
      .from(therapists)
      .innerJoin(hospitals, eq(therapists.hospitalId, hospitals.id))
      .innerJoin(users, eq(therapists.userId, users.id))
      .where(
        and(
          eq(therapists.userCode, userCode),
          eq(hospitals.code, hospitalCode),
          eq(therapists.isDeleted, false),
        ),
      )
      .limit(1);

    return therapist ?? null;
  }

  async updateTherapist(
    id: ULID,
    updatedData: Partial<Omit<NewTherapist, 'id'>>,
  ): Promise<Therapist | null> {
    const [therapist] = await db
      .update(therapists)
      .set({
        ...updatedData,
        [therapists.updatedAt.name]: sql`NOW()`,
      })
      .where(and(eq(therapists.id, id), eq(therapists.isDeleted, false)))
      .returning();
    return therapist ?? null;
  }

  async deleteTherapist(id: ULID): Promise<boolean> {
    const result = await db
      .update(therapists)
      .set({
        [therapists.isDeleted.name]: true,
        [therapists.updatedAt.name]: sql`NOW()`,
      })
      .where(and(eq(therapists.id, id), eq(therapists.isDeleted, false)));
    return result.rowCount === 1;
  }
}

export const therapistRepository = new TherapistRepository();
