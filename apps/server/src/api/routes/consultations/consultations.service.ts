import type { ULID } from 'ulid';
import type { RedisClientType } from 'redis';
import type { CreateConsultationDto } from './dto';
import type { NewConsultation } from 'src/database';
import { errors, type ReturnResponse, type ReturnError } from '../../constants';
import { Inject, Injectable } from '@nestjs/common';
import { consultationsRepository } from 'src/database/repositories/consultations.repository';
import { patientsRepository } from 'src/database/repositories/patients.repository';
import { env } from 'src/config';

@Injectable()
export class ConsultationsService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType) {}

  async createConsultation(
    userId: ULID,
    consultationData: CreateConsultationDto,
  ): Promise<ReturnResponse | ReturnError> {
    const checkPatientExists = await patientsRepository.fetchPatientByUserId(userId);
    if (checkPatientExists !== null) {
      return errors.CONFLICT;
    }

    const consultation = await consultationsRepository.createConsultation(userId, consultationData);

    if (!consultation) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    return {
      status: 201,
      message: 'OK',
      prettyMessage: 'Consultation created successfully',
    };
  }

  async fetchAllConsultations(page: number, limit: number): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `consultations:${page}:${limit}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Consultations fetched successfully',
        data: JSON.parse(cachedData),
      };
    }

    const offset = (page - 1) * limit;

    const consultations = await consultationsRepository.fetchAllConsultations(limit, offset);

    if (consultations.length === 0) {
      return errors.NO_DATA_FOUND;
    }

    if (consultations && consultations.length > 0) {
      await this.redisClient.set(cacheKey, JSON.stringify(consultations), {
        EX: env.cacheDuration,
      });
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Consultations fetched successfully',
      data: consultations,
    };
  }

  async fetchConsultationsByHospitalId(
    hospitalId: ULID,
    page: number,
    limit: number,
  ): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `consultations:hospitalId:${hospitalId}:${page}:${limit}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Consultations fetched successfully',
        data: JSON.parse(cachedData),
      };
    }

    const offset = (page - 1) * limit;

    const consultations = await consultationsRepository.fetchConsultationsByHospitalId(
      hospitalId,
      limit,
      offset,
    );

    if (consultations.length === 0) {
      return errors.NO_DATA_FOUND;
    }

    if (consultations && consultations.length > 0) {
      await this.redisClient.set(cacheKey, JSON.stringify(consultations), {
        EX: env.cacheDuration,
      });
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Consultations fetched successfully',
      data: consultations,
    };
  }

  async fetchConsultationsByPatientId(
    patientId: ULID,
    page: number,
    limit: number,
  ): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `consultations:patientId:${patientId}:${page}:${limit}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Consultations fetched successfully',
        data: JSON.parse(cachedData),
      };
    }

    const offset = (page - 1) * limit;

    const consultations = await consultationsRepository.fetchConsultationsByPatientId(
      patientId,
      limit,
      offset,
    );

    if (consultations.length === 0) {
      return errors.NO_DATA_FOUND;
    }

    if (consultations && consultations.length > 0) {
      await this.redisClient.set(cacheKey, JSON.stringify(consultations), {
        EX: env.cacheDuration,
      });
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Consultations fetched successfully',
      data: consultations,
    };
  }

  async fetchConsultationsByTherapistId(
    therapistId: ULID,
    page: number,
    limit: number,
  ): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `consultations:therapistId:${therapistId}:${page}:${limit}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Consultations fetched successfully',
        data: JSON.parse(cachedData),
      };
    }

    const offset = (page - 1) * limit;

    const consultations = await consultationsRepository.fetchConsultationsByTherapistId(
      therapistId,
      limit,
      offset,
    );

    if (consultations && consultations.length > 0) {
      await this.redisClient.set(cacheKey, JSON.stringify(consultations), {
        EX: env.cacheDuration,
      });
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Consultations fetched successfully',
      data: consultations,
    };
  }

  async fetchConsultationById(id: ULID): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `consultation:${id}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Consultation fetched successfully',
        data: JSON.parse(cachedData),
      };
    }

    const consultation = await consultationsRepository.fetchConsultationById(id);

    if (consultation === null) {
      return errors.NO_DATA_FOUND;
    }

    if (consultation) {
      await this.redisClient.set(cacheKey, JSON.stringify(consultation), {
        EX: env.cacheDuration,
      });
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Consultation fetched successfully',
      data: consultation,
    };
  }

  async fetchUserConsultations(userId: ULID): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `consultations:user:${userId}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Consultations fetched successfully',
        data: JSON.parse(cachedData),
      };
    }

    const consultations = await consultationsRepository.fetchUserConsultations(userId);

    if (consultations.length === 0) {
      return errors.NO_DATA_FOUND;
    }

    if (consultations && consultations.length > 0) {
      await this.redisClient.set(cacheKey, JSON.stringify(consultations), {
        EX: env.cacheDuration,
      });
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Consultations fetched successfully',
      data: consultations,
    };
  }

  async updateConsultation(
    id: ULID,
    consultationData: NewConsultation,
  ): Promise<ReturnResponse | ReturnError> {
    const consultation = await consultationsRepository.updateConsultation(id, consultationData);

    if (consultation.id === null) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Consultation updated successfully',
    };
  }

  async deleteConsultation(id: ULID): Promise<ReturnResponse | ReturnError> {
    const consultation = await consultationsRepository.deleteConsultation(id);

    if (consultation === false) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    this.redisClient.del(`consultation:${id}`);

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Consultation deleted successfully',
    };
  }
}
