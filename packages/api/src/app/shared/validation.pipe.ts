import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.Schema<unknown>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      try {
        const result = this.schema.parse(value);

        return result;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }
    return value;
  }
}

@Injectable()
export class IDParamPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      try {
        const result = z.string().parse(value);

        return result;
      } catch (err) {
        throw new BadRequestException(err);
      }
    }

    return value;
  }
}
