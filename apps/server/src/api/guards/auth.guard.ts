import type { JwtPayload } from 'jsonwebtoken';
import type { RedisClientType } from 'redis';
import type { User } from 'src/database';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { userRepository } from 'src/database/repositories/user.repository';
import { verifyJwt } from '../utils';
import { errors } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException(errors.UNAUTHORIZED);
    }

    const [, token] = authorizationHeader.split(' ');

    if (!token) {
      throw new UnauthorizedException(errors.UNAUTHORIZED);
    }

    try {
      const decoded = verifyJwt(token) as JwtPayload;

      let user: User;
      const getUserFromCache = await this.redisClient.get(`user:${decoded.payload.userId}`);

      if (getUserFromCache) {
        user = JSON.parse(getUserFromCache) as User;
      } else {
        user = await userRepository.fetchUserById(decoded.payload.userId);

        if (!user) {
          throw new NotFoundException(errors.NOT_FOUND);
        }

        await this.redisClient.setEx(`user:${decoded.userId}`, 3600, JSON.stringify(user));
      }

      request.user = user;

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException(errors.UNAUTHORIZED);
    }
  }
}
