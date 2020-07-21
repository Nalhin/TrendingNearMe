import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AnonymousUser, AuthenticatedUser } from '@trends/data';
import {
  authUserResponseDtoBuilder,
  loginUserDtoBuilder,
  registerUserDtoBuilder, userResponseDtoBuilder,
} from '@trends/fixtures';
import { CookieService } from '../cookie/cookie.service';
import { UserService } from '../user/user.service';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let cookieService: CookieService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('onInit', () => {
    it('should return immediately if token is not present', async () => {
      jest.spyOn(cookieService, 'getAuthCookie').mockReturnValue('');
      jest.spyOn(userService, 'me');

      await service.onInit();

      expect(userService.me).toBeCalledTimes(0);
    });

    it('should fetch user data and persist user data in service', async (done) => {
      const response = userResponseDtoBuilder.buildOne();
      jest.spyOn(cookieService, 'getAuthCookie').mockReturnValue('token');
      jest.spyOn(userService, 'me').mockReturnValueOnce(of(response));

      service.isAuthenticated().pipe(filter(Boolean)).subscribe((status) => {
        expect(status).toBeTruthy();
        done();
      });

      await service.onInit();

      expect(userService.me).toBeCalledTimes(1);
    });

    it('should remove cookies if request throws error', async () => {
      jest.spyOn(cookieService, 'getAuthCookie').mockReturnValue('token');
      jest.spyOn(cookieService, 'removeAuthCookie');
      jest.spyOn(userService, 'me').mockImplementation(() => {
        throw new Error();
      });

      await service.onInit();

      expect(cookieService.removeAuthCookie).toBeCalledTimes(1);
    });
  });


  describe('login', () => {
    const loginUserDto = loginUserDtoBuilder.buildOne();
    const response = authUserResponseDtoBuilder.buildOne();

    it('should login user correctly', (done) => {
      service.login(loginUserDto).subscribe(() => {
        expect(service.currentUser).toBeInstanceOf(AuthenticatedUser);
        done();
      });

      const req = httpTestingController.expectOne('/auth/login');
      req.flush(response);
    });
  });

  describe('register', () => {
    const mockSignUpUser = registerUserDtoBuilder.buildOne();
    const response = authUserResponseDtoBuilder.buildOne();

    it('should register user correctly', (done) => {
      service.register(mockSignUpUser).subscribe(() => {
        expect(response).toEqual(response);
        done();
      });

      const req = httpTestingController.expectOne('/auth/register');
      req.flush(response);
    });
  });

  describe('logout', () => {
    it('should logout the current user', () => {
      service.register(registerUserDtoBuilder.buildOne()).subscribe();

      const req = httpTestingController.expectOne('/auth/register');
      req.flush(authUserResponseDtoBuilder.buildOne());

      service.logout();

      expect(service.currentUser).toBeInstanceOf(AnonymousUser);
    });
  });
});
