import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EventLogger } from './config/logger';
import { env } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new EventLogger(),
  });
  app.setGlobalPrefix('/api/v1');

  await app.listen(env.port ?? 8000);
}
bootstrap();
