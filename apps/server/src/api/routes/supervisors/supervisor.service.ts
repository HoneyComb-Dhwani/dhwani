import type { ULID } from 'ulid';
import type { RedisClientType } from 'redis';
import type { NewSupervisor } from 'src/database';
import { errors, type ReturnError, type ReturnResponse } from '../../constants';
import { Inject, Injectable } from '@nestjs/common';
import { supervisorRepository } from 'src/database/repositories/supervisor.repository';

@Injectable()
export class SupervisorService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType) {}

  async createSupervisor(body: {
    userCode: string;
    hospitalId: ULID;
  }): Promise<ReturnResponse | ReturnError> {
    const supervisor = await supervisorRepository.insertSupervisor(body);

    if (!supervisor) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Supervisor created successfully',
    };
  }

  async fetchAllSupervisors(page: number, limit: number): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `supervisors:${page}:${limit}`;
    const cacheData = await this.redisClient.get(cacheKey);

    if (cacheData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Supervisors fetched successfully',
        data: JSON.parse(cacheData),
      };
    }

    const offset = (page - 1) * limit;

    const supervisors = await supervisorRepository.fetchAllSupervisors(limit, offset);

    if (supervisors === null) {
      return errors.NOT_FOUND;
    }

    if (supervisors) {
      await this.redisClient.set(cacheKey, JSON.stringify(supervisors), {
        EX: 60 * 5,
      });
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Supervisors fetched successfully',
      data: supervisors,
    };
  }

  async fetchSupervisorById(id: ULID): Promise<ReturnResponse | ReturnError> {
    const cacheKey = `supervisor:${id}`;
    const cacheData = await this.redisClient.get(cacheKey);

    if (cacheData) {
      return {
        status: 200,
        message: 'OK',
        prettyMessage: 'Supervisor fetched successfully',
        data: JSON.parse(cacheData),
      };
    }

    const supervisor = await supervisorRepository.fetchSupervisorById(id);

    if (supervisor === null) {
      return errors.NOT_FOUND;
    }

    if (supervisor) {
      await this.redisClient.set(cacheKey, JSON.stringify(supervisor));
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Supervisor fetched successfully',
      data: supervisor,
    };
  }

  async updateSupervisor(id: ULID, body: NewSupervisor): Promise<ReturnResponse | ReturnError> {
    const updatedSupervisor = await supervisorRepository.updateSupervisor(id, body);

    if (!updatedSupervisor) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Supervisor updated successfully',
    };
  }

  async deleteSupervisor(id: ULID): Promise<ReturnResponse | ReturnError> {
    const isDeleted = await supervisorRepository.deleteSupervisor(id);

    if (!isDeleted) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Supervisor deleted successfully',
    };
  }
}
