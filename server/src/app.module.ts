import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule, SnsModule } from './providers';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [RedisModule, SnsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
