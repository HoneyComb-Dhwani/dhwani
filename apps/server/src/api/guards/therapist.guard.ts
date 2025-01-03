import type { RedisClientType } from 'redis';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { errors } from '../constants';
import { checkAuth } from '../utils/auth.utils';

@Injectable()
export class TherapistGuard implements CanActivate {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const auth = await checkAuth(context, this.redisClient);
    if (!auth.isAuthenticated) {
      throw new UnauthorizedException(errors.UNAUTHORIZED);
    }

    if (
      auth.user.role !== 'SUPERVISOR' &&
      auth.user.role !== 'ADMIN' &&
      auth.user.role !== 'THERAPIST'
    ) {
      throw new UnauthorizedException(errors.UNAUTHORIZED);
    }

    return auth.isAuthenticated;
  }
}
