import { NewHospital,Hospital } from "../types";
import {db} from "../db";
import { hospitals } from "../schema";
import {and,eq,sql,ilike} from 'drizzle-orm';
import {ULID} from 'ulid';


export class HospitalRepository {
    async createHospital(hospitalDetails: NewHospital): Promise<NewHospital> {
        // Create a new hospital
        const [newHospital] = await db.insert(hospitals).values(hospitalDetails).returning();
        return newHospital;
    }

    async fetchHospitalByName(name: string): Promise<Hospital[] | null> {
        // Fetch hospital by name 
        const [hospital] = await db.select().from(hospitals).where(ilike(hospitals.name, `${name}%`));
        return hospital ?? null;
    }

    async fetchHospitalById(id: string): Promise<Hospital | null> {
        // Fetch hospital by id
        const [hospital] = await db
        .select()
        .from(hospitals)
        .where(and(eq(hospitals.id, id),eq(hospitals.isDeleted,false)));

        return hospital ?? null;
    }

    async updateHospital(id: ULID, updatedHospitalDetails: Partial<Omit<NewHospital,'id'>>): Promise<NewHospital | null> {
        // Update hospital by id
        const [updatedHospital] = await db.update(hospitals).set({...updatedHospitalDetails,
            [hospitals.updatedAt.name]: sql`NOW()`}).where(and(eq(hospitals.id, id),eq(hospitals.isDeleted,false))).returning();
        
        return updatedHospital ?? null;
    }

    async deleteHospital(id:ULID): Promise<boolean> {     
        // Delete hospital by id
        const result = await db.
        update(hospitals).
        set({[hospitals.isDeleted.name]: true,
            [hospitals.deletedAt.name]: sql`NOW()`}).where(eq(hospitals.id, id));

        return result.rowCount === 1;
    }

}

export const hospitalRepository = new HospitalRepository();