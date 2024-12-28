import type { RedisClientType } from 'redis';
import type { RegisterDto, LoginDto, WorkLoginDto } from './dto';
import type { Supervisor, Therapist, User } from 'src/database';
import { Inject, Injectable } from '@nestjs/common';
import { comparePassword, hashPassword, signJwt } from '../../utils';
import { errors, type ReturnError, type ReturnResponse } from '../../constants';
import { userRepository } from 'src/database/repositories/user.repository';
import { supervisorRepository } from 'src/database/repositories/supervisor.repository';
import { therapistRepository } from 'src/database/repositories/therapist.repository';
import { hospitalRepository } from 'src/database/repositories/hospital.repository';

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
      role: 'USER',
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

    const token = signJwt({
      userId: user.id,
    });

    return {
      status: 200,
      message: 'OK',
      prettyMessage: 'User logged in successfully',
      data: {
        token,
      },
    };
  }

  async workLogin(body: WorkLoginDto): Promise<ReturnResponse | ReturnError> {
    const { credentials, password } = body;

    const userCode = credentials.split('@')[0];
    const hospitalCode = credentials.split('@')[1];

    if (!userCode || !hospitalCode) {
      return errors.INVALID_CREDENTIALS;
    }

    let worker: Supervisor | Therapist | null = null;

    const workerCacheKey = `worker:${userCode}`;
    const cachedWorker = await this.redisClient.get(workerCacheKey);

    if (cachedWorker) {
      worker = JSON.parse(cachedWorker) as Supervisor | Therapist;
    } else {
      worker =
        (await supervisorRepository.fetchSupervisorByUserAndHospitalCode(
          userCode,
          hospitalCode,
        )) ||
        (await therapistRepository.fetchTherapistByUserAndHospitalCode(
          userCode,
          hospitalCode,
        ));

      if (!worker) {
        return errors.INVALID_CREDENTIALS;
      }

      await this.redisClient.setEx(
        workerCacheKey,
        3600,
        JSON.stringify(worker),
      );
    }

    const checkHospitalCode =
      await hospitalRepository.fetchHospitalByHospitalCode(hospitalCode);

    if (!checkHospitalCode || checkHospitalCode.id !== worker.hospitalId) {
      return errors.INVALID_CREDENTIALS;
    }

    const getUserFromCache = await this.redisClient.get(
      `user:${worker.userId}`,
    );
    let user: User;

    if (getUserFromCache) {
      user = JSON.parse(getUserFromCache) as User;
    } else {
      user = await userRepository.fetchUserById(worker.userId);

      if (!user) {
        return errors.INVALID_CREDENTIALS;
      }

      await this.redisClient.setEx(
        `user:${worker.userId}`,
        3600,
        JSON.stringify(user),
      );
    }

    const isValidPassword = await comparePassword(password, user.hashPassword);

    if (!isValidPassword) {
      return errors.INVALID_CREDENTIALS;
    }

    const token = signJwt({
      userId: user.id,
      role: user.role,
    });

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
