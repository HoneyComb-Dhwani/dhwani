import { db } from '../db';
import { supervisors, hospitals } from '../schema';
import { and, eq, sql } from 'drizzle-orm';
import type { NewSupervisor, Supervisor } from '../types';
import type { ULID } from 'ulid';

export class SupervisorRepository {
  async insertSupervisor(supervisorData: NewSupervisor): Promise<Supervisor> {
    const [supervisor] = await db
      .insert(supervisors)
      .values(supervisorData)
      .returning();
    return supervisor;
  }

  async fetchAllSupervisors(): Promise<Supervisor[]> {
    return db
      .select()
      .from(supervisors)
      .where(eq(supervisors.isDeleted, false));
  }

  async fetchSupervisorById(id: ULID): Promise<Supervisor | null> {
    const [supervisor] = await db
      .select()
      .from(supervisors)
      .where(and(eq(supervisors.id, id), eq(supervisors.isDeleted, false)));
    return supervisor ?? null;
  }

  async fetchSupervisorByUserAndHospitalCode(
    userCode: string,
    hospitalCode: string,
  ): Promise<Supervisor | null> {
    const [supervisor] = await db
      .select({
        id: supervisors.id,
        userId: supervisors.userId,
        userCode: supervisors.userCode,
        hospitalId: supervisors.hospitalId,
        createdAt: supervisors.createdAt,
        updatedAt: supervisors.updatedAt,
        deletedAt: supervisors.deletedAt,
        isDeleted: supervisors.isDeleted,
      })
      .from(supervisors)
      .innerJoin(hospitals, eq(supervisors.hospitalId, hospitals.id))
      .where(
        and(
          eq(supervisors.userCode, userCode),
          eq(hospitals.code, hospitalCode),
          eq(supervisors.isDeleted, false),
        ),
      );
    return supervisor ?? null;
  }

  async updateSupervisor(
    id: ULID,
    updatedData: Partial<Omit<NewSupervisor, 'id'>>,
  ): Promise<Supervisor | null> {
    const [supervisor] = await db
      .update(supervisors)
      .set({
        ...updatedData,
        [supervisors.updatedAt.name]: sql`NOW()`,
      })
      .where(and(eq(supervisors.id, id), eq(supervisors.isDeleted, false)))
      .returning();
    return supervisor ?? null;
  }

  async deleteSupervisor(id: ULID): Promise<boolean> {
    const result = await db
      .update(supervisors)
      .set({
        [supervisors.isDeleted.name]: true,
        [supervisors.deletedAt.name]: sql`NOW()`,
      })
      .where(eq(supervisors.id, id));
    return result.rowCount === 1;
  }
}

export const supervisorRepository = new SupervisorRepository();
