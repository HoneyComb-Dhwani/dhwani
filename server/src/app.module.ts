import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule, SnsModule, S3Module } from './providers';
import { AuthModule } from './api/auth/auth.module';
import { ConsultationsModule } from './api/consultations/consultations.module';

@Module({
  imports: [RedisModule, SnsModule, S3Module, AuthModule, ConsultationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
