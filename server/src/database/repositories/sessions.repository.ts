import { db } from '../db';
import { sessions, therapists, patients } from '../schema';
import { and, eq, sql } from 'drizzle-orm';
import type { NewSession, Session } from '../types';
import type { ULID } from 'ulid';

export class SessionRepository {
  async createSession(sessionData: NewSession): Promise<Session> {
    const [session] = await db.insert(sessions).values(sessionData).returning();
    return session;
  }

  async fetchAllSessions(limit: number, offset: number) {
    const result = await db
      .select()
      .from(sessions)
      .leftJoin(therapists, eq(sessions.therapistId, therapists.id))
      .leftJoin(patients, eq(sessions.patientId, patients.id))
      .where(eq(sessions.isDeleted, false))
      .limit(limit)
      .offset(offset);

    return result ?? null;
  }

  async fetchAllSessionsByPatientId(patientId: ULID, limit: number, offset: number) {
    const result = await db
      .select()
      .from(sessions)
      .leftJoin(therapists, eq(sessions.therapistId, therapists.id))
      .leftJoin(patients, eq(sessions.patientId, patients.id))
      .where(and(eq(sessions.patientId, patientId), eq(sessions.isDeleted, false)))
      .limit(limit)
      .offset(offset);
      
    return result ?? null;
  }

  async fetchAllSessionsByTherapistId(therapistId: ULID, limit: number, offset: number) {
    const result = await db
      .select()
      .from(sessions)
      .leftJoin(therapists, eq(sessions.therapistId, therapists.id))
      .leftJoin(patients, eq(sessions.patientId, patients.id))
      .where(and(eq(sessions.therapistId, therapistId), eq(sessions.isDeleted, false)))
      .limit(limit)
      .offset(offset);
      
    return result ?? null;
  }

  async fetchSessionById(id: ULID) {
    const result = await db
      .select()
      .from(sessions)
      .leftJoin(therapists, eq(sessions.therapistId, therapists.id))
      .leftJoin(patients, eq(sessions.patientId, patients.id))
      .where(and(eq(sessions.id, id), eq(sessions.isDeleted, false)))

    return result ?? null;
  }

  async updateSession(
    id: ULID,
    updatedData: Partial<Omit<Session, 'id'>>,
  ): Promise<Session | null> {
    const [session] = await db
      .update(sessions)
      .set({
        ...updatedData,
        [sessions.updatedAt.name]: sql`NOW()`,
      })
      .where(and(eq(sessions.id, id), eq(sessions.isDeleted, false)))
      .returning();
    return session ?? null;
  }

  async deleteSession(id: ULID): Promise<boolean> {
    const result = await db
      .update(sessions)
      .set({
        [sessions.isDeleted.name]: true,
        [sessions.deletedAt.name]: sql`NOW()`,
      })
      .where(eq(sessions.id, id));
    return result.rowCount === 1;
  }
}

export const sessionsRepository = new SessionRepository();
