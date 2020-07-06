import { IUser } from '../user/user.schema';

abstract class BaseUser {
  protected _nativeUser: IUser;

  protected constructor(nativeUser: IUser) {
    this._nativeUser = nativeUser;
  }

  abstract isAuthenticated(): boolean;

  abstract get nativeUser(): IUser;
}

export class AuthenticatedUser extends BaseUser {
  constructor(nativeUser: IUser) {
    super(nativeUser);
  }

  isAuthenticated(): boolean {
    return true;
  }

  get nativeUser(): IUser {
    return this._nativeUser;
  }
}

export class AnonymousUser extends BaseUser {
  constructor() {
    super({} as IUser);
  }

  isAuthenticated(): boolean {
    return false;
  }

  get nativeUser(): IUser {
    throw new Error('Anonymous user');
  }
}

export type AuthUser = AuthenticatedUser | AnonymousUser;
