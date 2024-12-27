import type { RedisClientType } from 'redis';
import { Inject, Injectable } from '@nestjs/common';
import { comparePassword, hashPassword, signJwt } from './utils';
import { RegisterDto, LoginDto } from './dto';
import { errors, ReturnError, ReturnResponse } from '../constants';
import { userRepository } from 'src/database/repositories/user.repository';
import { User } from 'src/database';

@Injectable()
export class AuthService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async register(body: RegisterDto): Promise<ReturnResponse | ReturnError> {
    const { name, email, password } = body;

    const userExists = await userRepository.fetchUserByEmail(email);
    if (userExists) {
      return errors.CONFLICT;
    }

    const hashedPassword = await hashPassword(password);
    const user = await userRepository.insertUser({
      name,
      email,
      hashPassword: hashedPassword,
    });

    if (!user) {
      return errors.INTERNAL_SERVER_ERROR;
    }

    return {
      status: 201,
      message: 'Created',
      prettyMessage: 'User created successfully',
    };
  }

  async login(body: LoginDto): Promise<ReturnResponse | ReturnError> {
    const { email, password } = body;

    let user: User;
    const getUserFromCache = await this.redisClient.get(`user:${email}`);

    if (getUserFromCache) {
      user = JSON.parse(getUserFromCache) as User;
    } else {
      user = await userRepository.fetchUserByEmail(email);

      if (!user || user.email !== email) {
        return errors.INVALID_CREDENTIALS;
      }

      const isValidPassword = await comparePassword(
        password,
        user.hashPassword,
      );

      if (!isValidPassword) {
        return errors.INVALID_CREDENTIALS;
      }

      await this.redisClient.setEx(`user:${email}`, 3600, JSON.stringify(user));
    }

    const token = signJwt(user.id);

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'User logged in successfully',
      data: {
        token,
      },
    };
  }
}
