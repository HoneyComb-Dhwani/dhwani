import { Module, Global } from '@nestjs/common';
import { createClient, type RedisClientType } from 'redis';
import { env } from 'src/config';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (): Promise<RedisClientType> => {
        const redisClient: RedisClientType = createClient({
          url: env.redisUrl,
        });

        redisClient.on('connect', () => {
          console.log('Connected to Redis');
        });

        redisClient.on('error', (err) => {
          console.error('Redis connection error:', err);
        });

        await redisClient.connect();
        return redisClient;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
