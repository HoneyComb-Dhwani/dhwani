import type { ULID } from 'ulid';
import type { NewSupervisor } from 'src/database';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { ResponseInterceptor } from 'src/api/interceptors';
import { AdminGuard } from 'src/api/guards';

@Controller('supervisors')
@UseInterceptors(ResponseInterceptor)
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Post('/')
  @UseGuards(AdminGuard)
  async create(@Body() body: NewSupervisor) {
    return this.supervisorService.createSupervisor(body);
  }

  @Get('/')
  @UseGuards(AdminGuard)
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.supervisorService.fetchAllSupervisors(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: ULID) {
    return this.supervisorService.fetchSupervisorById(id);
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
