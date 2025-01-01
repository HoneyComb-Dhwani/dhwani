import { db } from '../db';
import { users } from '../schema/users';
import { and, eq, sql } from 'drizzle-orm';
import type { NewUser, User } from '../types';
import type { ULID } from 'ulid';

export class UserRepository {
  async insertUser(userData: NewUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async fetchAllUsers(): Promise<User[]> {
    return db.select().from(users).where(eq(users.isDeleted, false));
  }

  async fetchUserById(id: ULID): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.id, id), eq(users.isDeleted, false)));
    return user ?? null;
  }

  async fetchUserByEmail(email: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.isDeleted, false)));
    return user ?? null;
  }

  async updateUser(id: ULID, updatedData: NewUser): Promise<User | null> {
    const [user] = await db
      .update(users)
      .set({
        ...updatedData,
        [users.updatedAt.name]: sql`NOW()`,
      })
      .where(and(eq(users.id, id), eq(users.isDeleted, false)))
      .returning();
    return user ?? null;
  }

  async deleteUser(id: ULID): Promise<boolean> {
    const result = await db
      .update(users)
      .set({
        [users.isDeleted.name]: true,
        [users.deletedAt.name]: sql`NOW()`,
        [users.updatedAt.name]: sql`NOW()`,
      })
      .where(and(eq(users.id, id), eq(users.isDeleted, false)))
      .returning();
    return result.length > 0;
  }
}

export const userRepository = new UserRepository();
