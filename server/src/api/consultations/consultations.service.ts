import type { ULID } from 'ulid';
import type { RedisClientType } from 'redis';
import { errors } from '../constants';
import { Inject, Injectable } from '@nestjs/common';
import { consultationsRepository } from 'src/database/repositories/consultations.repository';
import { NewConsultation } from 'src/database';
import { ReturnError, ReturnResponse } from '../constants';

@Injectable()
export class ConsultationsService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async createConsultation(
    consultationData: NewConsultation,
  ): Promise<ReturnResponse | ReturnError> {
    const consultation =
      await consultationsRepository.createConsultation(consultationData);

    if (!consultation) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    return {
      status: 201,
      message: 'OK',
      prettyMessage: 'Consultation created successfully',
    };
  }

  async fetchAllConsultations(page: number, limit: number) {
    const cacheKey = `consultations:${page}:${limit}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const offset = (page - 1) * limit;

    const consultations = await consultationsRepository.fetchAllConsultations(
      limit,
      offset,
    );

    if (consultations.length === 0) {
      return errors.NO_DATA_FOUND;
    }

    if (consultations && consultations.length > 0) {
      await this.redisClient.set(cacheKey, JSON.stringify(consultations));
    }

    return consultations ?? null;
  }

  async fetchConsultationsByHospitalId(
    hospitalId: ULID,
    page: number,
    limit: number,
  ) {
    const cacheKey = `consultations:hospitalId:${hospitalId}:${page}:${limit}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const offset = (page - 1) * limit;

    const consultations =
      await consultationsRepository.fetchConsultationsByHospitalId(
        hospitalId,
        limit,
        offset,
      );

    if (consultations.length === 0) {
      return errors.NO_DATA_FOUND;
    }

    if (consultations && consultations.length > 0) {
      await this.redisClient.set(cacheKey, JSON.stringify(consultations));
    }

    return consultations ?? null;
  }

  async fetchConsultationsByPatientId(
    patientId: ULID,
    page: number,
    limit: number,
  ) {
    const cacheKey = `consultations:patientId:${patientId}:${page}:${limit}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const offset = (page - 1) * limit;

    const consultations =
      await consultationsRepository.fetchConsultationsByPatientId(
        patientId,
        limit,
        offset,
      );

    if (consultations.length === 0) {
      return errors.NO_DATA_FOUND;
    }

    if (consultations && consultations.length > 0) {
      await this.redisClient.set(cacheKey, JSON.stringify(consultations));
    }

    return consultations ?? null;
  }

  async fetchConsultationsByTherapistId(
    therapistId: ULID,
    page: number,
    limit: number,
  ) {
    const cacheKey = `consultations:therapistId:${therapistId}:${page}:${limit}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const offset = (page - 1) * limit;

    const consultations =
      await consultationsRepository.fetchConsultationsByTherapistId(
        therapistId,
        limit,
        offset,
      );

    if (consultations && consultations.length > 0) {
      await this.redisClient.set(cacheKey, JSON.stringify(consultations));
    }

    return consultations ?? null;
  }

  async fetchConsultationById(id: ULID) {
    const cacheKey = `consultation:${id}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const consultation =
      await consultationsRepository.fetchConsultationById(id);

    if (consultation === null) {
      return errors.NO_DATA_FOUND;
    }

    if (consultation) {
      await this.redisClient.set(cacheKey, JSON.stringify(consultation));
    }

    return consultation ?? null;
  }

  async updateConsultation(id: ULID, consultationData: NewConsultation) {
    const consultation = await consultationsRepository.updateConsultation(
      id,
      consultationData,
    );

    if (consultation.id === null) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Consultation updated successfully',
    };
  }

  async deleteConsultation(id: ULID) {
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
