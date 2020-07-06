import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../../auth/auth-user.model';

export const ReqUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const user: AuthUser = ctx.switchToHttp().getRequest().user;
    return data ? user && user[data] : user;
  },
);

export const AuthenticatedUser = createParamDecorator(
  (_: any, ctx: ExecutionContext) => {
    const user: AuthUser = ctx.switchToHttp().getRequest().user;
    return user.nativeUser;
  },
);
