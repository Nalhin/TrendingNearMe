import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class RequireAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isAuthenticationRequired = this.reflector.get<string[]>(
      'authenticationRequired',
      context.getHandler(),
    );
    if (!isAuthenticationRequired) {
      return true;
    }

    return !!context.switchToHttp().getRequest().user;
  }
}
