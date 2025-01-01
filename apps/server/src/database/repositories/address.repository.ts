import { db } from '../db';
import { addresses } from '../schema/addresses';
import { and, eq, sql } from 'drizzle-orm';
import type { NewAddress, Address } from '../types';
import type { ULID } from 'ulid';
import { patients } from '../schema';

export class AddressRepository {
  async insertAddress(addressData: NewAddress): Promise<Address> {
    const [address] = await db.insert(addresses).values(addressData).returning();

    return address;
  }

  async fetchAddressById(id: ULID): Promise<Address | null> {
    const [address] = await db
      .select()
      .from(addresses)
      .where(and(eq(addresses.id, id), eq(addresses.isDeleted, false)));
    return address ?? null;
  }

  async fetchAddressByPatientId(patientId: ULID) {
    const [address] = await db
      .select()
      .from(addresses)
      .rightJoin(patients, eq(patients.addressId, addresses.id))
      .where(and(eq(patients.id, patientId), eq(addresses.isDeleted, false)));

    return address ?? null;
  }

  async updateAddress(id: ULID, updatedData: NewAddress): Promise<Address | null> {
    const [address] = await db
      .update(addresses)
      .set({
        ...updatedData,
        [addresses.updatedAt.name]: sql`NOW()`,
      })
      .where(and(eq(addresses.id, id), eq(addresses.isDeleted, false)))
      .returning();
    return address ?? null;
  }

  async deleteAddress(id: ULID): Promise<boolean> {
    const result = await db
      .update(addresses)
      .set({
        [addresses.isDeleted.name]: true,
        [addresses.deletedAt.name]: sql`NOW()`,
        [addresses.updatedAt.name]: sql`NOW()`,
      })
      .where(and(eq(addresses.id, id), eq(addresses.isDeleted, false)))
      .returning();
    return result.length > 0;
  }
}

export const addressRepository = new AddressRepository();
