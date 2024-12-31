import { Module, Global, Logger } from '@nestjs/common';
import { createClient, type RedisClientType } from 'redis';
import { env } from 'src/config';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (): Promise<RedisClientType> => {
        const logger = new Logger()
        const maxRetries = 5;
        let retryCount = 0;
        
        const redisClient: RedisClientType = createClient({
          url: env.redisUrl,
          socket: {
            reconnectStrategy: (retries) => {
              if (retries >= maxRetries) {
                logger.error(`Failed to connect to Redis after ${maxRetries} attempts`);
                return new Error('Max retries reached');
              }
              return Math.min(1000 * Math.pow(2, retries), 16000);
            },
          },
        });

        redisClient.on('connect', () => {
          logger.log('Connection to Redis established');
        });

        redisClient.on('error', (err) => {
          retryCount++;
          if (retryCount <= maxRetries) {
            logger.error(`Redis connection error (attempt ${retryCount}/${maxRetries}):`, err);
          }
        });

        await redisClient.connect();
        return redisClient;
      },
    },
    RedisService,
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
