import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule, SnsModule, S3Module } from './providers';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [RedisModule, SnsModule, S3Module, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
