import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AUTHENTICATION_REQUIRED } from '../constants/metadata.constants';

export function Authenticated() {
  return applyDecorators(
    SetMetadata(AUTHENTICATION_REQUIRED, true),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}
