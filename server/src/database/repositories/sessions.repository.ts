import { db } from '../db';
import { sessions, therapists, patients } from '../schema';
import { and, eq, sql } from 'drizzle-orm';
import type { Session } from '../types';
import { ULID } from 'ulid';


export class SessionRepository {

    async createSession(sessionData: Session): Promise<Session> {
        const [session] = await db.insert(sessions).values(sessionData).returning();
        return session;
    }

    async fetchAllSessions() {
        const result = db
        .select()
        .from(sessions)
        .leftJoin(therapists, eq(sessions.therapistId, therapists.id))
        .leftJoin(patients, eq(sessions.patientId, patients.id))
        .where(eq(sessions.isDeleted, false))
        .execute();
        return result ?? null;
    }
    
    async fetchSessionById(id: ULID) {
        const result = db
        .select()
        .from(sessions)
        .leftJoin(therapists, eq(sessions.therapistId, therapists.id))
        .leftJoin(patients, eq(sessions.patientId, patients.id))
        .where(
            and(
                eq(sessions.id, id),
                eq(sessions.isDeleted, false)
            )
        )
        .execute();
        return result ?? null;    
    }

    async updateSession(id: ULID, updatedData: Partial<Omit<Session, 'id'>>): Promise<Session | null> {
        const [session] = await db
            .update(sessions)
            .set({
                ...updatedData,
                [sessions.updatedAt.name]: sql`NOW()`
            })
            .where(
                and(
                    eq(sessions.id, id),
                    eq(sessions.isDeleted, false)
                )
            )
            .returning();
        return session ?? null;
    }

    async deleteSession(id: ULID): Promise<boolean> {
        const result = await db
            .update(sessions)
            .set({
                [sessions.isDeleted.name]: true,
                [sessions.deletedAt.name]: sql`NOW()`
            })
            .where(
                eq(sessions.id, id)
            );
        return result.rowCount === 1;
    }
}

export const sessionRepository = new SessionRepository();