import type { ULID } from "ulid";
import type { RedisClientType } from "redis";
import type { NewSession } from "src/database";
import { Inject, Injectable } from "@nestjs/common";
import { consultationsRepository } from "src/database/repositories/consultations.repository";
import { errors, ReturnError, ReturnResponse } from "src/api/constants";
import { sessionsRepository } from "src/database/repositories/sessions.repository";

@Injectable()
export class SessionsService{
    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType
    ) { }

    async createSession(body: NewSession): Promise<ReturnResponse | ReturnError> {
        const { patientId, therapistId, consultationId } = body;
        
        const verifyConsultation = await consultationsRepository.fetchConsultationByPatientIdAndTherapistId(patientId, therapistId);
        if (verifyConsultation.id !== consultationId) {
            return errors.CONSULTATION_DOES_NOT_EXIST;
        }

        const session = await sessionsRepository.createSession(body)
        if (!session) {
            return errors.INTERNAL_SERVER_ERROR;
        }

        return {
            status: 201,
            message: 'OK',
            prettyMessage: 'Session created successfully',
            data: session,
        };
    }

    async fetchAllSessions(page: number, limit: number): Promise<ReturnResponse | ReturnError> {
        const cacheKey = `sessions:${page}:${limit}`;
        const cacheData = await this.redisClient.get(cacheKey);
    
        if (cacheData) {
            return {
                status: 200,
                message: 'OK',
                prettyMessage: 'Sessions fetched successfully',
                data: JSON.parse(cacheData),
            };
        }

        const offset = (page - 1) * limit;

        const sessions = await sessionsRepository.fetchAllSessions(limit, offset)

        if (sessions.length === 0) {
            return errors.NO_DATA_FOUND;
        }

        if (sessions) {
            await this.redisClient.set(cacheKey, JSON.stringify(sessions));
        }

        return {
            status: 200,
            message: 'OK',
            prettyMessage: 'Sessions fetched successfully',
            data: sessions,
        };
    }

    async fetchAllSessionsByPatientId(patientId: ULID, page: number, limit: number): Promise<ReturnResponse | ReturnError> {
        const cacheKey = `sessions:patient:${patientId}:${page}:${limit}`;
        const cacheData = await this.redisClient.get(cacheKey);

        if (cacheData) {
            return {
                status: 200,
                message: 'OK',
                prettyMessage: 'Sessions fetched successfully',
                data: JSON.parse(cacheData),
            };
        }

        const offset = (page - 1) * limit;

        const sessions = await sessionsRepository.fetchAllSessionsByPatientId(patientId, limit, offset);

        if (sessions.length === 0) {
            return errors.NO_DATA_FOUND;
        }

        if (sessions) {
            await this.redisClient.set(cacheKey, JSON.stringify(sessions));
        }

        return {
            status: 200,
            message: 'OK',
            prettyMessage: 'Sessions fetched successfully',
            data: sessions,
        };
    }

    async fetchAllSessionsByTherapistId(therapistId: ULID, page: number, limit: number): Promise<ReturnResponse | ReturnError> {
        const cacheKey = `sessions:therapist:${therapistId}:${page}:${limit}`;
        const cacheData = await this.redisClient.get(cacheKey);

        if (cacheData) {
            return {
                status: 200,
                message: 'OK',
                prettyMessage: 'Sessions fetched successfully',
                data: JSON.parse(cacheData),
            };
        }

        const offset = (page - 1) * limit;

        const sessions = await sessionsRepository.fetchAllSessionsByTherapistId(therapistId, limit, offset);

        if (sessions.length === 0) {
            return errors.NO_DATA_FOUND;
        }

        if (sessions) {
            await this.redisClient.set(cacheKey, JSON.stringify(sessions));
        }

        return {
            status: 200,
            message: 'OK',
            prettyMessage: 'Sessions fetched successfully',
            data: sessions,
        };
    }

    async fetchSessionById(id: ULID): Promise<ReturnResponse | ReturnError> {
        const cacheKey = `session:${id}`;
        const cacheData = await this.redisClient.get(cacheKey);

        if (cacheData) {
            return {
                status: 200,
                message: 'OK',
                prettyMessage: 'Session fetched successfully',
                data: JSON.parse(cacheData),
            };
        }

        const session = await sessionsRepository.fetchSessionById(id);

        if (!session) {
            return errors.NOT_FOUND;
        }

        if (session) {
            await this.redisClient.set(cacheKey, JSON.stringify(session));
        }

        return {
            status: 200,
            message: 'OK',
            prettyMessage: 'Session fetched successfully',
            data: session,
        };
    }

    async updateSession(id: ULID, updatedData: Partial<NewSession>): Promise<ReturnResponse | ReturnError> {
        const session = await sessionsRepository.updateSession(id, updatedData);

        if (!session) {
            return errors.INTERNAL_SERVER_ERROR;
        }

        return {
            status: 200,
            message: 'OK',
            prettyMessage: 'Session updated successfully',
            data: session,
        };
    }

    async deleteSession(id: ULID): Promise<ReturnResponse | ReturnError> {
        const session = await sessionsRepository.deleteSession(id);

        if (!session) {
            return errors.INTERNAL_SERVER_ERROR;
        }

        return {
            status: 200,
            message: 'OK',
            prettyMessage: 'Session deleted successfully',
            data: session,
        };
    }
}
