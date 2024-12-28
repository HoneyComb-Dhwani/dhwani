import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { ULID } from 'ulid';
import { NewSupervisor } from 'src/database';

@Controller('supervisors')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Post('/')
  async create(@Body() body: NewSupervisor) {
    return this.supervisorService.createSupervisor(body);
  }

  @Get('/')
  async findAll() {
    return this.supervisorService.getAllSupervisors();
  }

  @Get(':id')
  async findOne(@Param('id') id: ULID) {
    return this.supervisorService.getSupervisorById(id);
  }

  @Put(':id')
  async update(@Param('id') id: ULID, @Body() body: NewSupervisor) {
    return this.supervisorService.updateSupervisor(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: ULID) {
    return this.supervisorService.deleteSupervisor(id);
  }
}
