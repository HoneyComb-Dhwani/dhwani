import type { ULID } from 'ulid';
import type { RedisClientType } from 'redis';
import type { NewTherapist } from 'src/database';
import { Inject, Injectable } from '@nestjs/common';
import { errors, type ReturnError, type ReturnResponse } from '../../constants';
import { therapistRepository } from 'src/database/repositories/therapist.repository';

@Injectable()
export class TherapistsService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async createTherapist(
    body: NewTherapist,
  ): Promise<ReturnResponse | ReturnError> {
    const Therapist = await therapistRepository.insertTherapist(body);

    if (!Therapist) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Therapist created successfully',
    };
  }

  async fetchAllTherapists(
    page: number,
    limit: number,
  ): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `therapists:${page}:${limit}`;
    const cacheData = await this.redisClient.get(cacheKey);

    if (cacheData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Therapists fetched successfully',
        data: JSON.parse(cacheData),
      };
    }

    const offset = (page - 1) * limit;

    const therapists = await therapistRepository.fetchAllTherapists(
      limit,
      offset,
    );

    if (!therapists) {
      return errors.NOT_FOUND;
    }

    if (therapists.length !== 0) {
      this.redisClient.set(cacheKey, JSON.stringify(therapists));
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Therapists fetched successfully',
      data: therapists,
    };
  }

  async fetchTherapistsByHopitalId(
    hospitalId: ULID,
    page: number,
    limit: number,
  ): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `therapists:${hospitalId}:${page}:${limit}`;
    const cacheData = await this.redisClient.get(cacheKey);

    if (cacheData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Therapists fetched successfully',
        data: JSON.parse(cacheData),
      };
    }

    const offset = (page - 1) * limit;

    const therapists = await therapistRepository.fetchTherapistByHospitalId(
      hospitalId,
      limit,
      offset,
    );

    if (!therapists) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Therapists fetched successfully',
      data: therapists,
    };
  }

  async getAllTherapistsByNameHospital(
    name: string,
    hospitalName: string,
  ): Promise<ReturnResponse | ReturnError> {
    const therapists =
      await therapistRepository.fetchTherapistsByUserNameAndHospitalName({
        username: name,
        hospitalName: hospitalName,
      });

    if (!therapists) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Therapists fetched successfully',
      data: therapists,
    };
  }

  async fetchTherapistById(id: ULID): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `therapist:${id}`;
    const cacheData = await this.redisClient.get(cacheKey);

    if (cacheData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Therapist fetched successfully',
        data: JSON.parse(cacheData),
      };
    }

    const therapist = await therapistRepository.fetchTherapistById(id);

    if (!therapist) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Therapist fetched successfully',
      data: therapist,
    };
  }

  async updateTherapist(
    id: ULID,
    body: NewTherapist,
  ): Promise<ReturnResponse | ReturnError> {
    const updatedTherapist = await therapistRepository.updateTherapist(
      id,
      body,
    );

    if (!updatedTherapist) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Therapist updated successfully',
    };
  }

  async deleteTherapist(id: ULID): Promise<ReturnResponse | ReturnError> {
    const isDeleted = await therapistRepository.deleteTherapist(id);

    if (!isDeleted) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Therapist deleted successfully',
    };
  }
}
