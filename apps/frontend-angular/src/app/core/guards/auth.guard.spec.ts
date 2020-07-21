import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnonymousUser, AuthenticatedUser } from '@trends/data';
import { authUserResponseDtoBuilder } from '@trends/fixtures';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should be truthy if user is authenticated', () => {
      jest
        .spyOn(authService, 'currentUser', 'get')
        .mockReturnValueOnce(
          new AuthenticatedUser(authUserResponseDtoBuilder.buildOne().user),
        );

      const result = guard.canActivate({} as any, null as any);

      expect(result).toBeTruthy();
    });

    it('should be falsy if user is not authenticated', () => {
      jest
        .spyOn(authService, 'currentUser', 'get')
        .mockReturnValueOnce(new AnonymousUser());

      const result = guard.canActivate({} as any, null as any);

      expect(result).toBeFalsy();
    });
  });
});
