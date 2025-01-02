import type { ULID } from 'ulid';
import { NewHospital } from '../types';
import { db } from '../db';
import { addresses, hospitals } from '../schema';
import { and, eq, sql, ilike } from 'drizzle-orm';

export class HospitalRepository {
  async createHospital(hospitalDetails: NewHospital): Promise<NewHospital> {
    const [newHospital] = await db.insert(hospitals).values(hospitalDetails).returning();
    return newHospital;
  }

  async fetchAllHospitals(limit: number, offset: number) {
    const allHospitals = await db
      .select({
        id: hospitals.id,
        name: hospitals.name,
        code: hospitals.code,
        email: hospitals.email,
        phoneNumber: hospitals.phoneNumber,
        address: {
          houseNumber: addresses.houseNumber,
          blockNumber: addresses.blockNumber,
          street: addresses.street,
          city: addresses.city,
          state: addresses.state,
          country: addresses.country,
          postalCode: addresses.postalCode,
        },
      })
      .from(hospitals)
      .leftJoin(addresses, eq(hospitals.addressId, addresses.id))
      .where(eq(hospitals.isDeleted, false))
      .orderBy(hospitals.name)
      .limit(limit)
      .offset(offset);

    return allHospitals ?? null;
  }

  async fetchHospitalByName(name: string) {
    const [hospital] = await db
      .select({
        id: hospitals.id,
        name: hospitals.name,
        code: hospitals.code,
        email: hospitals.email,
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
        createdAt: hospitals.createdAt,
        updatedAt: hospitals.updatedAt,
        deletedAt: hospitals.deletedAt,
        isDeleted: hospitals.isDeleted,
      })
      .from(hospitals)
      .leftJoin(addresses, eq(hospitals.addressId, addresses.id))
      .where(ilike(hospitals.name, `${name}%`));

    return hospital ?? null;
  }

  async fetchHospitalById(id: ULID) {
    const [hospital] = await db
      .select({
        id: hospitals.id,
        name: hospitals.name,
        code: hospitals.code,
        email: hospitals.email,
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
        createdAt: hospitals.createdAt,
        updatedAt: hospitals.updatedAt,
        deletedAt: hospitals.deletedAt,
        isDeleted: hospitals.isDeleted,
      })
      .from(hospitals)
      .leftJoin(addresses, eq(hospitals.addressId, addresses.id))
      .where(and(eq(hospitals.id, id), eq(hospitals.isDeleted, false)));

    return hospital ?? null;
  }

  async fetchHospitalByHospitalCode(hospitalCode: string) {
    const [hospital] = await db
      .select({
        id: hospitals.id,
        name: hospitals.name,
        code: hospitals.code,
        email: hospitals.email,
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
        createdAt: hospitals.createdAt,
        updatedAt: hospitals.updatedAt,
        deletedAt: hospitals.deletedAt,
        isDeleted: hospitals.isDeleted,
      })
      .from(hospitals)
      .leftJoin(addresses, eq(hospitals.addressId, addresses.id))
      .where(and(eq(hospitals.code, hospitalCode), eq(hospitals.isDeleted, false)));

    return hospital ?? null;
  }

  async updateHospital(
    id: ULID,
    updatedHospitalDetails: Partial<Omit<NewHospital, 'id'>>,
  ): Promise<NewHospital | null> {
    const [updatedHospital] = await db
      .update(hospitals)
      .set({
        ...updatedHospitalDetails,
        [hospitals.updatedAt.name]: sql`NOW()`,
      })
      .where(and(eq(hospitals.id, id), eq(hospitals.isDeleted, false)))
      .returning();

    return updatedHospital ?? null;
  }

  async deleteHospital(id: ULID): Promise<boolean> {
    const result = await db
      .update(hospitals)
      .set({
        [hospitals.isDeleted.name]: true,
        [hospitals.deletedAt.name]: sql`NOW()`,
      })
      .where(eq(hospitals.id, id));

    return result.rowCount === 1;
  }
}

export const hospitalRepository = new HospitalRepository();
