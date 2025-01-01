import { ULID } from 'ulid';
import type { NewTherapist } from 'src/database';
import { TherapistsService } from './therapists.service';
import { Body, Delete, Get, Param, Post, Put, Query, Controller } from '@nestjs/common';

@Controller('therapists')
export class TherapistsController {
  constructor(private readonly therapistService: TherapistsService) {}

  @Post('/')
  async create(@Body() body: NewTherapist) {
    return this.therapistService.createTherapist(body);
  }

  @Get('/')
  async findAllByNameHospital(
    @Query('name') name: string,
    @Query('hospitalName') hospitalName: string,
  ) {
    return this.therapistService.getAllTherapistsByNameHospital(name, hospitalName);
  }

  @Get()
  async fetchAllTherapists(@Query('page') page: number, @Query('limit') limit: number) {
    return this.therapistService.fetchAllTherapists(page, limit);
  }

  @Get('/hospital/:hospitalId')
  async fetchAllByHospitalId(
    @Param('hospitalId') hospitalId: ULID,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.therapistService.fetchTherapistsByHopitalId(hospitalId, page, limit);
  }

  @Get(':id')
  async fetchTherapistById(@Param('id') id: ULID) {
    return this.therapistService.fetchTherapistById(id);
  }

  @Put(':id')
  async update(@Param('id') id: ULID, @Body() body: NewTherapist) {
    return this.therapistService.updateTherapist(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: ULID) {
    return this.therapistService.deleteTherapist(id);
  }
}
