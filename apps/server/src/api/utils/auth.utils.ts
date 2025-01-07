import type { User } from 'src/database';
import type { RedisClientType } from 'redis';
import { ExecutionContext, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { errors } from '../constants';
import { JwtPayload } from 'jsonwebtoken';
import { verifyJwt } from './jwt.utils';
import { userRepository } from 'src/database/repositories/user.repository';
import { env } from 'src/config';

export const checkAuth = async (
  context: ExecutionContext,
  redisClient: RedisClientType,
): Promise<{
  isAuthenticated: boolean;
  user: User;
}> => {
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
    const getUserFromCache = await redisClient.get(`user:${decoded.payload.userId}`);

    if (getUserFromCache) {
      user = JSON.parse(getUserFromCache) as User;
    } else {
      user = await userRepository.fetchUserById(decoded.payload.userId);

      if (!user) {
        throw new NotFoundException(errors.NOT_FOUND);
      }

      await redisClient.setEx(`user:${decoded.userId}`, env.cacheDuration, JSON.stringify(user));
    }

    request.user = user;

    return {
      isAuthenticated: true,
      user,
    };
  } catch (error) {
    throw new UnauthorizedException(errors.UNAUTHORIZED);
  }
};
