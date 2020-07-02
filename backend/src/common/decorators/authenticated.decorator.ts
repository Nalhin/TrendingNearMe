import { SetMetadata } from '@nestjs/common';

export const Authenticated = () => SetMetadata('authenticationRequired', true);
