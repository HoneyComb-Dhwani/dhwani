import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule, SnsModule } from './providers';

@Module({
  imports: [RedisModule, SnsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
