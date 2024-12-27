import {db} from '../db';
import {consultations} from '../schema/consultations';
import {and, eq, sql} from 'drizzle-orm';
import type {Consultation} from '../types';
import {ULID} from 'ulid';

export class ConsultationsRepository {
    async createConsultation(consultationData: Consultation): Promise<Consultation> {
        const [consultation] = await db.insert(consultations).values(consultationData).returning();
        return consultation;
    }

    async fetchAllConsultations(): Promise<Consultation[]> {
        return db.select().from(consultations).where(eq(consultations.isDeleted, false));
    }

    async fetchConsultationById(id: ULID): Promise<Consultation | null> {
        const [consultation] = await db
            .select()
            .from(consultations)
            .where(
                and(
                    eq(consultations.id, id),
                    eq(consultations.isDeleted, false)
                )
            );
        return consultation ?? null;
    }

    async updateConsultation(id: ULID, updatedData: Partial<Omit<Consultation, 'id'>>): Promise<Consultation | null> {
        const [consultation] = await db
            .update(consultations)
            .set({
                ...updatedData,
                [consultations.updatedAt.name]: sql`NOW()`
            })
            .where(
                and(
                    eq(consultations.id, id),
                    eq(consultations.isDeleted, false)
                )
            )
            .returning();
        return consultation ?? null;
    }

    async deleteConsultation(id: ULID): Promise<boolean> {
        const result = await db
            .update(consultations)
            .set({
                [consultations.isDeleted.name]: true,
                [consultations.deletedAt.name]: sql`NOW()`
            })
            .where(
                eq(consultations.id, id)
            );
        return result.rowCount === 1;
    }
}

export const consultationsRepository = new ConsultationsRepository();