import type { ULID } from 'ulid';
import type { NewConsultation } from 'src/database';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';

@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post('/')
  async createConsultation(@Body() consultationsData: NewConsultation) {
    return this.consultationsService.createConsultation(consultationsData);
  }

  @Get('/')
  async fetchAllConsultations(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.consultationsService.fetchAllConsultations(page, limit);
  }

  @Get('/hospital/:hospitalId')
  async fetchConsultationsByHospitalId(
    @Param('hospitalId') hospitalId: ULID,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.consultationsService.fetchConsultationsByHospitalId(
      hospitalId,
      page,
      limit,
    );
  }

  @Get('/patient/:patientId')
  async fetchConsultationsByPatientId(
    @Param('patientId') patientId: ULID,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.consultationsService.fetchConsultationsByPatientId(
      patientId,
      page,
      limit,
    );
  }

  @Get('/therapist/:therapistId')
  async fetchConsultationsByTherapistId(
    @Param('therapistId') therapistId: ULID,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.consultationsService.fetchConsultationsByTherapistId(
      therapistId,
      page,
      limit,
    );
  }

  @Get('/:consultationId')
  async fetchConsultationById(@Param('consultationId') consultationId: ULID) {
    return this.consultationsService.fetchConsultationById(consultationId);
  }

  @Put('/:consultationId')
  async updateConsultation(
    @Param('consultationId') consultationId: ULID,
    @Body() consultationData: NewConsultation,
  ) {
    return this.consultationsService.updateConsultation(
      consultationId,
      consultationData,
    );
  }

  @Delete('/:consultationId')
  async deleteConsultation(@Param('consultationId') consultationId: ULID) {
    return this.consultationsService.deleteConsultation(consultationId);
  }
}
