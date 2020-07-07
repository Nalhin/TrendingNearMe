import { AuthUserResponseDto } from '@/Api';

export abstract class BaseUser {
  protected constructor(public readonly user: AuthUserResponseDto) {}

  abstract get isAuthenticated(): boolean;
}

export class AnonymousUser extends BaseUser {
  constructor() {
    super({} as AuthUserResponseDto);
  }

  get isAuthenticated() {
    return false;
  }
}

export class AuthenticatedUser extends BaseUser {
  constructor(user: AuthUserResponseDto) {
    super(user);
  }

  get isAuthenticated() {
    return true;
  }
}

export type User = AnonymousUser | AuthenticatedUser;
