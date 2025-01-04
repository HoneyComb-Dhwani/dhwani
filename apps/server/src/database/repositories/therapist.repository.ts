import type { Address, NewAddress, NewTherapist, Therapist } from '../types';
import type { ULID } from 'ulid';
import { db } from '../db';
import { therapists, hospitals, users, addresses } from '../schema';
import { and, eq, ilike, or, sql } from 'drizzle-orm';
import { CreateTherapistDto } from 'src/api/routes/therapists/dto';
import { addressRepository } from './address.repository';
import { userRepository } from './user.repository';

export class TherapistRepository {
  async insertTherapist(therapistData: CreateTherapistDto) {
    const createTherapist = await db.transaction(async (tx) => {
      const insertAddress = await addressRepository.insertAddress(
        therapistData.address as NewAddress,
      );
      if (!insertAddress) {
        return null;
      }

      const insertUser = await userRepository.insertUser({
        name: `${therapistData.firstName} ${therapistData.middleName} ${therapistData.lastName}`,
        email: therapistData.email,
        role: 'THERAPIST',
        hashPassword: 'pass123',
      });

      if (!insertUser) {
        return null;
      }

      const insertNewTherapist = await db
        .insert(therapists)
        // @ts-ignore
        .values({
          userId: insertUser.id,
          hospitalId: therapistData.hospitalId,
          userCode: therapistData.userCode,
          addressId: insertAddress.id,
          firstName: therapistData.firstName,
          middleName: therapistData.middleName,
          lastName: therapistData.lastName,
          email: therapistData.email,
          phoneNumber: therapistData.phoneNumber,
        })
        .returning();

      return insertNewTherapist ?? null;
    });

    return createTherapist;
  }

  async fetchAllTherapists(limit: number, offset: number) {
    const getTherapists = await db
      .select({
        id: therapists.id,
        userId: therapists.userId,
        userRole: users.role,
        hospitalId: therapists.hospitalId,
        hospitalName: hospitals.name,
        hospitalCode: hospitals.code,
        userCode: therapists.userCode,
        firstName: therapists.firstName,
        middleName: therapists.middleName,
        lastName: therapists.lastName,
        email: therapists.email,
        phoneNumber: therapists.phoneNumber,
        addressId: therapists.addressId,
        address: sql<Address>`jsonb_build_object(
          'houseNumber', ${addresses.houseNumber},
          'blockNumber', ${addresses.blockNumber},
          'street', ${addresses.street},
          'city', ${addresses.city},
          'state', ${addresses.state},
          'country', ${addresses.country},
          'postalCode', ${addresses.postalCode}
        )`,
        createdAt: therapists.createdAt,
      })
      .from(therapists)
      .leftJoin(users, eq(therapists.userId, users.id))
      .leftJoin(addresses, eq(therapists.addressId, addresses.id))
      .leftJoin(hospitals, eq(therapists.hospitalId, hospitals.id))
      .where(eq(therapists.isDeleted, false))
      .limit(limit)
      .offset(offset);

    return getTherapists.length > 0 ? getTherapists : null;
  }

  async fetchTherapistById(id: ULID): Promise<Therapist | null> {
    const [therapist] = await db
      .select()
      .from(therapists)
      .where(and(eq(therapists.id, id), eq(therapists.isDeleted, false)));
    return therapist ?? null;
  }

  async fetchTherapistByHospitalId(hospitalId: ULID, limit: number, offset: number) {
    const getTherapists = await db
      .select({
        id: therapists.id,
        userId: therapists.userId,
        userRole: users.role,
        hospitalId: therapists.hospitalId,
        hospitalName: hospitals.name,
        hospitalCode: hospitals.code,
        userCode: therapists.userCode,
        firstName: therapists.firstName,
        middleName: therapists.middleName,
        lastName: therapists.lastName,
        email: therapists.email,
        phoneNumber: therapists.phoneNumber,
        addressId: therapists.addressId,
        address: sql<Address>`jsonb_build_object(
          'houseNumber', ${addresses.houseNumber},
          'blockNumber', ${addresses.blockNumber},
          'street', ${addresses.street},
          'city', ${addresses.city},
          'state', ${addresses.state},
          'country', ${addresses.country},
          'postalCode', ${addresses.postalCode}
        )`,
        createdAt: therapists.createdAt,
      })
      .from(therapists)
      .leftJoin(users, eq(therapists.userId, users.id))
      .leftJoin(addresses, eq(therapists.addressId, addresses.id))
      .leftJoin(hospitals, eq(therapists.hospitalId, hospitals.id))
      .where(and(eq(therapists.hospitalId, hospitalId), eq(therapists.isDeleted, false)))
      .limit(limit)
      .offset(offset);

    return getTherapists.length > 0 ? getTherapists : null;
  }

  async fetchTherapistByUserAndHospitalCode(userCode: string, hospitalCode: string) {
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

  async fetchTherapistsByUserNameAndHospitalName(params: {
    username?: string | null;
    hospitalName?: string | null;
  }) {
    const baseConditions = [eq(therapists.isDeleted, false)];

    if (params.username) {
      baseConditions.push(or(ilike(users.name, `%${params.username}%`)));
    }

    if (params.hospitalName) {
      baseConditions.push(ilike(hospitals.name, `%${params.hospitalName}%`));
    }

    const result = await db
      .select()
      .from(therapists)
      .innerJoin(hospitals, eq(therapists.hospitalId, hospitals.id))
      .innerJoin(users, eq(therapists.userId, users.id))
      .where(and(...baseConditions));

    if (result.length === 0) {
      return null;
    }

    return result;
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
