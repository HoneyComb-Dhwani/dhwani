import { createClient, type RedisClientType } from 'redis';
import { env } from 'src/config';

const redisClient: RedisClientType = createClient({
  url: env.redisUrl || 'redis://localhost:6379',
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

export default redisClient;
