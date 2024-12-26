import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class EventLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(
      `[LOG] ${new Date().toISOString()} - ${message}`,
      ...optionalParams,
    );
  }

  fatal(message: any, ...optionalParams: any[]) {
    console.error(
      `[FATAL] ${new Date().toISOString()} - ${message}`,
      ...optionalParams,
    );
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(
      `[ERROR] ${new Date().toISOString()} - ${message}`,
      ...optionalParams,
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(
      `[WARN] ${new Date().toISOString()} - ${message}`,
      ...optionalParams,
    );
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(
      `[DEBUG] ${new Date().toISOString()} - ${message}`,
      ...optionalParams,
    );
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(
      `[VERBOSE] ${new Date().toISOString()} - ${message}`,
      ...optionalParams,
    );
  }
}
