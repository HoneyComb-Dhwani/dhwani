import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { RedisService } from 'src/providers/redis/redis.service';

describe('Overall Application test', () => {
  let app: INestApplication;
  let redisService: RedisService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    redisService = moduleRef.get(RedisService);
    await app.init();
  });

  afterAll(async () => {
    await redisService.onApplicationShutdown();
    await app.close();
  });

  describe('Health Check', () => {
    it('should return 200', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              status: 'UP',
              uptime: expect.any(Number),
              timestamp: expect.any(Number),
            }),
          );
        });
    });
  });
});
