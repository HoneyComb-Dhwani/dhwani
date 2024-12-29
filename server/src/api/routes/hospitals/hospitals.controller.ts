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
import { NewHospital } from 'src/database';
import { HospitalService } from './hospitals.service';
import { ULID } from 'ulid';

@Controller('hospitals')
export class HospitalController {
  constructor(private readonly hospitalsService: HospitalService) {}

  @Post('/')
  async create(@Body() body: NewHospital) {
    return this.hospitalsService.createHospital(body);
  }

  @Get('/')
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.hospitalsService.getAllHospitals(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: ULID) {
    return this.hospitalsService.getHospitalById(id);
  }

  @Put(':id')
  async update(@Param('id') id: ULID, @Body() body: NewHospital) {
    return this.hospitalsService.updateHospital(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: ULID) {
    return this.hospitalsService.deleteHospital(id);
  }
}
