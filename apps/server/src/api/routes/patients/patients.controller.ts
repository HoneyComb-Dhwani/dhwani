import type { ULID } from 'ulid';
import type { NewPatient } from 'src/database';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { AdminGuard } from 'src/api/guards';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async createPatient(@Body() patientData: NewPatient) {
    return this.patientsService.createPatient(patientData);
  }

  @Get()
  @UseGuards(AdminGuard)
  async fetchAllPatients(@Query('page') page: number, @Query('limit') limit: number) {
    return this.patientsService.fetchAllPatients(page, limit);
  }

  @Get(':id')
  async fetchPatientById(@Param('id') id: ULID) {
    return this.patientsService.fetchPatientById(id);
  }

  @Get('/hospitals/:hospitalId')
  async fetchPatientsByHospital(
    @Param('hospitalId') hospitalId: ULID,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.patientsService.fetchPatientsByHospital(hospitalId, page, limit);
  }

  @Put(':id')
  async updatePatient(@Param('id') id: ULID, @Body() patientData: NewPatient) {
    return this.patientsService.updatePatient(id, patientData);
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: ULID) {
    return this.patientsService.deletePatient(id);
  }
}
