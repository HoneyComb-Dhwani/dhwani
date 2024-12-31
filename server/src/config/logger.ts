import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class EventLogger implements LoggerService {
  private readonly colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
  };

  log(message: any, ...optionalParams: any[]) {
    console.log(
      `${this.colors.bright}${this.colors.green}[LOG]${this.colors.reset} ${this.colors.blue}${new Date().toISOString()}${this.colors.reset} - ${message}`,
      ...optionalParams,
    );
  }

  fatal(message: any, ...optionalParams: any[]) {
    console.error(
      `${this.colors.bright}${this.colors.red}[FATAL]${this.colors.reset} ${this.colors.blue}${new Date().toISOString()}${this.colors.reset} - ${message}`,
      ...optionalParams,
    );
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(
      `${this.colors.bright}${this.colors.red}[ERROR]${this.colors.reset} ${this.colors.blue}${new Date().toISOString()}${this.colors.reset} - ${message}`,
      ...optionalParams,
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(
      `${this.colors.bright}${this.colors.yellow}[WARN]${this.colors.reset} ${this.colors.blue}${new Date().toISOString()}${this.colors.reset} - ${message}`,
      ...optionalParams,
    );
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(
      `${this.colors.bright}${this.colors.magenta}[DEBUG]${this.colors.reset} ${this.colors.blue}${new Date().toISOString()}${this.colors.reset} - ${message}`,
      ...optionalParams,
    );
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(
      `${this.colors.bright}${this.colors.cyan}[VERBOSE]${this.colors.reset} ${this.colors.blue}${new Date().toISOString()}${this.colors.reset} - ${message}`,
      ...optionalParams,
    );
  }
}
