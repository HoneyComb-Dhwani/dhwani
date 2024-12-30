import { Module } from '@nestjs/common';
import { HospitalController } from './hospitals.controller';
import { HospitalService } from './hospitals.service';

@Module({
  controllers: [HospitalController],
  providers: [HospitalService],
})
export class HospitalsModule {}
