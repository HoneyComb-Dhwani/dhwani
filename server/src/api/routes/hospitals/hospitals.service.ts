import type { NewAddress, NewHospital } from 'src/database';
import type { RedisClientType } from 'redis';
import { Injectable, Inject } from '@nestjs/common';
import { errors, ReturnError, ReturnResponse } from '../../constants';
import { hospitalRepository } from 'src/database/repositories/hospital.repository';
import { ULID } from 'ULID';
import { CreateHospitalDto } from './dto';
import { addressRepository } from 'src/database/repositories/address.repository';

@Injectable()
export class HospitalService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async createHospital(
    body: CreateHospitalDto,
  ): Promise<ReturnResponse | ReturnError> {
    const createAddress = await addressRepository.insertAddress(body.address as NewAddress);

    if (!createAddress) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    const hospital = await hospitalRepository.createHospital({
      name: body.name,
      addressId: createAddress.id,
      phoneNumber: body.phoneNumber,
      code: body.code,
    });

    if (!hospital) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Hospital created successfully',
    };
  }

  async fetchAllHospitals(
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

  async fetchHospitalById(id: ULID): Promise<ReturnResponse | ReturnError> {
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

    const hospital = await hospitalRepository.fetchHospitalById(id);

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
