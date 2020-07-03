import { ClassSerializerInterceptor, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class StripPropertiesSerializerInterceptor extends ClassSerializerInterceptor {
  constructor(protected readonly reflector: Reflector) {
    super(reflector, { strategy: 'excludeAll' });
  }
}
