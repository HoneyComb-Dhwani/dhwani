
import { ULID } from 'ulid';
import type { NewTherapist } from 'src/database';
import { TherapistService } from './therapist.service';
import { Body, Delete, Get, Param, Post, Put, Query, Controller } from '@nestjs/common';


@Controller('therapist')
export class TherapistController {
    constructor(private readonly therapistService: TherapistService) { }

    // create a new therapist
    @Post('/')
    async create(@Body() body: NewTherapist) {
        return this.therapistService.createTherapist(body);
    }

    // get all therapists from query
    @Get('/')
    async findAllByNameHospital(
        @Query('name') name: string,
        @Query('hospitalName') hospitalName: string
    ) {
        return this.therapistService.getAllTherapistsByNameHospital(name, hospitalName);
    }

    // get therapist by ID
    @Get(':id')
    async findOne(@Param('id') id: ULID) {
        return this.therapistService.getTherapistById(id);
    }

    // get all therapists at a hospital
    @Get('/hospital/:id')
    async findAllByHospital(@Param('id') hospitalId: ULID) {
        return this.therapistService.getAllTherapistsByHopitalId(hospitalId);
    }

    // update therapist
    @Put(':id')
    async update(@Param('id') id: ULID, @Body() body: NewTherapist) {
        return this.therapistService.updateTherapist(id, body);
    }

    // delete therapist
    @Delete(':id')
    async remove(@Param('id') id: ULID) {
        return this.therapistService.deleteTherapist(id);
    }

}