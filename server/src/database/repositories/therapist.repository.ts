import { db } from '../db';
import { therapists } from '../schema/therapists';
import { and, eq, sql } from 'drizzle-orm';
import type { NewTherapist, Therapist } from '../types';
import type { ULID } from 'ulid';

export class TherapistRepository {
  async insertTherapist(therapistData: NewTherapist): Promise<Therapist> {
    const [therapist] = await
    db.insert(therapists).values(therapistData).returning();
    return therapist;
    }
    async fetchAllTherapists(): Promise<Therapist[]> {
        return db.select().from(therapists).where(eq(therapists.isDeleted, false));
        }
    async fetchTherapistById(id: ULID): Promise<Therapist | null> {
        const [therapist] = await db
        .select()
        .from(therapists)
        .where(
            and(
                eq(therapists.id, id),
                eq(therapists.isDeleted, false)
            )
        );
        return therapist ?? null;
    }

    async fetchTherapistByHospitalId(hospitalId: ULID): Promise<Therapist | null> {
        const [therapist] = await db
        .select()
        .from(therapists)
        .where(
            and(
                eq(therapists.hospitalId, hospitalId),
                eq(therapists.isDeleted, false)
            )
        );
        return therapist ?? null;
    }

    async updateTherapist(id: ULID, updatedData: Partial<Omit<NewTherapist, 'id'>>): Promise<Therapist | null> {
        const [therapist] = await db
        .update(therapists)
        .set({
            ...updatedData,
            [therapists.updatedAt.name]: sql`NOW()`
        })
        .where(
            and(
                eq(therapists.id, id),
                eq(therapists.isDeleted, false)
            )
        )
        .returning();
        return therapist ?? null;
    }

    async deleteTherapist(id: ULID): Promise<boolean> {
        const result = await db
        .update(therapists)
        .set({
            [therapists.isDeleted.name]: true,
            [therapists.updatedAt.name]: sql`NOW()`
        })
        .where(
            and(
                eq(therapists.id, id),
                eq(therapists.isDeleted, false)
            )
        );
        return result.rowCount === 1;
    }
}

export const therapistRepository = new TherapistRepository();