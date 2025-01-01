import type { ZodSchema } from 'zod';
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { EventLogger } from 'src/config';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const logger = new EventLogger();
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      logger.error(error);
      throw new BadRequestException({
        status: 400,
        message: 'VALIDATION_ERROR',
        prettyMessage: 'The request you made was invalid.',
      });
    }
  }
}
