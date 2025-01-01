import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'UP',
      uptime: process.uptime(),
      timestamp: Date.now(),
    };
  }
}
