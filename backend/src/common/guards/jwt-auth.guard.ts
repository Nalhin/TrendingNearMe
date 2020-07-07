import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnonymousUser, AuthenticatedUser } from '../../auth/auth-user.model';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (!user) {
      return new AnonymousUser() as any;
    }
    return new AuthenticatedUser(user) as any;
  }
}
