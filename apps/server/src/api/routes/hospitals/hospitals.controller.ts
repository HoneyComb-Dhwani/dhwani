import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { NewHospital } from 'src/database';
import { HospitalService } from './hospitals.service';
import { ULID } from 'ulid';
import { CreateHospitalDto, CreateHospitalSchema } from './dto';
import { ResponseInterceptor } from 'src/api/interceptors';
import { ZodValidationPipe } from 'src/pipes';

@Controller('hospitals')
@UseInterceptors(ResponseInterceptor)
export class HospitalController {
  constructor(private readonly hospitalsService: HospitalService) {}

  @Post('/')
  @UsePipes(new ZodValidationPipe(CreateHospitalSchema))
  async create(@Body() body: CreateHospitalDto) {
    return this.hospitalsService.createHospital(body);
  }

  @Get('/')
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.hospitalsService.fetchAllHospitals(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: ULID) {
    return this.hospitalsService.fetchHospitalById(id);
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
