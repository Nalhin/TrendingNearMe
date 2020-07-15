import { UserResponseDto } from '@trends/data';

export abstract class BaseUser {
  protected constructor(public readonly user: UserResponseDto) {}

  abstract get isAuthenticated(): boolean;
}

export class AnonymousUser extends BaseUser {
  constructor() {
    super({} as UserResponseDto);
  }

  get isAuthenticated() {
    return false;
  }
}

export class AuthenticatedUser extends BaseUser {
  constructor(user: UserResponseDto) {
    super(user);
  }

  get isAuthenticated() {
    return true;
  }
}

export type UserModel = AnonymousUser | AuthenticatedUser;
