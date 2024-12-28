import { Injectable } from '@nestjs/common';
import { supervisorRepository } from 'src/database/repositories/supervisor.repository';
import { ULID } from 'ulid';
import { errors, ReturnError, ReturnResponse } from '../constants';
import { NewSupervisor } from 'src/database';

@Injectable()
export class SupervisorService {
  async createSupervisor(body: NewSupervisor): Promise<ReturnResponse | ReturnError> {
    const supervisor = await supervisorRepository.insertSupervisor(body);

    if (!supervisor) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    return {
      status: 200,
      message: 'Created',
      prettyMessage: 'Supervisor created successfully',
      data: supervisor,
    };
  }

  async getAllSupervisors(): Promise<ReturnResponse | ReturnError> {
    const supervisors = await supervisorRepository.fetchAllSupervisors();

    if (!supervisors) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Supervisors fetched successfully',
      data: supervisors,
    };
  }

  async getSupervisorById(id: ULID): Promise<ReturnResponse | ReturnError> {
    const supervisor = await supervisorRepository.fetchSupervisorById(id);

    if (!supervisor) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Supervisor fetched successfully',
      data: supervisor,
    };
  }

  async updateSupervisor(
    id: ULID,
    body: NewSupervisor,
  ): Promise<ReturnResponse | ReturnError> {
    const updatedSupervisor = await supervisorRepository.updateSupervisor(id, body);

    if (!updatedSupervisor) {
      return errors.NOT_FOUND;
    }

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'Supervisor updated successfully'
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
