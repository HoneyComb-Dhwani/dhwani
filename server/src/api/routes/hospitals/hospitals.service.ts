import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { NewHospital } from 'src/database';
import { errors, ReturnError, ReturnResponse } from '../../constants';
import { hospitalRepository } from 'src/database/repositories/hospital.repository';
import { ULID } from 'ULID';

@Injectable()
export class HospitalService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async createHospital(
    body: NewHospital,
  ): Promise<ReturnResponse | ReturnError> {
    const hospital = await hospitalRepository.createHospital(body);

    if (!hospital) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Hospital created successfully',
    };
  }

  async getAllHospitals(
    page: number,
    limit: number,
  ): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `hospitals:${page}:${limit}`;
    const cacheData = await this.redisClient.get(cacheKey);

    if (cacheData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Hospitals fetched successfully',
        data: JSON.parse(cacheData),
      };
    }

    const offset = (page - 1) * limit;

    const hospitals = await hospitalRepository.fetchAllHospitals(limit, offset);

    if (hospitals === null) {
      return errors.NOT_FOUND;
    }

    if (hospitals) {
      await this.redisClient.set(cacheKey, JSON.stringify(hospitals));
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Hospitals fetched successfully',
      data: hospitals,
    };
  }

  async getHospitalById(
    id: ULID,
    page: number,
    limit: number,
  ): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `hospital:${id}`;
    const cacheData = await this.redisClient.get(cacheKey);

    if (cacheData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Hospital fetched successfully',
        data: JSON.parse(cacheData),
      };
    }

    const offset = (page - 1) * limit;

    const hospital = await hospitalRepository.fetchHospitalById(
      id,
      limit,
      offset,
    );

    if (!hospital) {
      return errors.NOT_FOUND;
    }

    if (hospital) {
      await this.redisClient.set(cacheKey, JSON.stringify(hospital));
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Hospital fetched successfully',
      data: hospital,
    };
  }

  async updateHospital(
    id: ULID,
    body: NewHospital,
  ): Promise<ReturnResponse | ReturnError> {
    const hospital = await hospitalRepository.updateHospital(id, body);

    if (!hospital) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Hospital updated successfully',
    };
  }

  async deleteHospital(id: ULID): Promise<ReturnResponse | ReturnError> {
    const hospital = await hospitalRepository.deleteHospital(id);

    if (!hospital) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Hospital deleted successfully',
    };
  }
}
