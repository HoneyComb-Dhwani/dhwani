import type { ULID } from 'ulid';
import type { RedisClientType } from 'redis';
import { Inject, Injectable } from '@nestjs/common';
import { NewPatient } from 'src/database';
import { errors, ReturnError, ReturnResponse } from 'src/api/constants';
import { patientsRepository } from 'src/database/repositories/patients.repository';

@Injectable()
export class PatientsService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType) {}

  async createPatient(patientData: NewPatient): Promise<ReturnResponse | ReturnError> {
    const patient = await patientsRepository.insertPatient(patientData);

    if (patient === null) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    return {
      status: 201,
      message: 'OK',
      prettyMessage: 'Patient created successfully',
    };
  }

  async fetchAllPatients(page: number, limit: number) {
    const cacheKey = `patients:${page}:${limit}`;
    const cacheData = await this.redisClient.get(cacheKey);

    if (cacheData !== null) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Patients fetched successfully',
        data: JSON.parse(cacheData),
      };
    }

    const offset = (page - 1) * limit;

    const patients = await patientsRepository.fetchAllPatients(limit, offset);

    if (patients === null) {
      return errors.NO_DATA_FOUND;
    }

    if (patients.length > 0) {
      await this.redisClient.set(cacheKey, JSON.stringify(patients));
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Patients fetched successfully',
      data: patients,
    };
  }

  async fetchPatientById(patientId: ULID) {
    const cacheKey = `patient:${patientId}`;
    const cacheData = await this.redisClient.get(cacheKey);

    if (cacheData !== null) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Patient fetched successfully',
        data: JSON.parse(cacheData),
      };
    }

    const patient = await patientsRepository.fetchPatientById(patientId);

    if (patient === null) {
      return errors.NO_DATA_FOUND;
    }

    if (patient) {
      await this.redisClient.set(cacheKey, JSON.stringify(patient));
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Patient fetched successfully',
      data: patient,
    };
  }

  async fetchPatientsByHospital(hospitalId: ULID, page: number, limit: number) {
    const cacheKey = `patients:hospital:${hospitalId}:${page}:${limit}`;
    const cacheData = await this.redisClient.get(cacheKey);

    if (cacheData !== null) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Patients fetched successfully',
        data: JSON.parse(cacheData),
      };
    }

    const offset = (page - 1) * limit;

    const patients = await patientsRepository.fetchPatientsByHospital(hospitalId, limit, offset);

    if (patients === null) {
      return errors.NO_DATA_FOUND;
    }

    if (patients.length > 0) {
      await this.redisClient.set(cacheKey, JSON.stringify(patients));
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Patients fetched successfully',
      data: patients,
    };
  }

  async updatePatient(
    patientId: ULID,
    updatedData: Partial<Omit<NewPatient, 'id'>>,
  ): Promise<ReturnResponse | ReturnError> {
    const patient = await patientsRepository.updatePatient(patientId, updatedData);

    if (patient === null) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Patient updated successfully',
    };
  }

  async deletePatient(patientId: ULID): Promise<ReturnResponse | ReturnError> {
    const patient = await patientsRepository.deletePatient(patientId);

    if (patient === null) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Patient deleted successfully',
    };
  }
}
