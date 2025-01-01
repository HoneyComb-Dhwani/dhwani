import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule, SnsModule, S3Module } from './providers';
import { AuthModule } from './api/routes/auth/auth.module';
import { ConsultationsModule } from './api/routes/consultations/consultations.module';
import { SupervisorsModule } from './api/routes/supervisors/supervisor.module';
import { PatientsModule } from './api/routes/patients/patients.module';
import { HospitalsModule } from './api/routes/hospitals/hospitals.module';
import { SessionsModule } from './api/routes/sessions/sessions.module';
import { TherapistsModule } from './api/routes/therapists/therapists.module';

@Module({
  imports: [
    RedisModule,
    SnsModule,
    S3Module,
    AuthModule,
    ConsultationsModule,
    SupervisorsModule,
    TherapistsModule,
    PatientsModule,
    HospitalsModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
