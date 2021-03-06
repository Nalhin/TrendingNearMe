import { Injectable } from '@angular/core';
import {
  AnonymousUser,
  AuthenticatedUser,
  AuthUserResponseDto,
  LoginUserDto,
  RegisterUserDto,
  UserModel,
  UserResponseDto,
} from '@trends/data';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { CookieService } from '../cookie/cookie.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(
    new AnonymousUser(),
  );

  constructor(
    private readonly httpService: HttpClient,
    private readonly userService: UserService,
    private readonly cookiesService: CookieService,
  ) {}

  async onInit(): Promise<void> {
    const authCookie = this.cookiesService.getAuthCookie();
    if (!authCookie) {
      return;
    }
    try {
      const res = await this.userService.me().toPromise();
      this._user.next(new AuthenticatedUser(res));
    } catch (e) {
      this.cookiesService.removeAuthCookie();
    }
  }

  public login(loginUserDto: LoginUserDto): Observable<AuthUserResponseDto> {
    return this.httpService
      .post<AuthUserResponseDto>('/auth/login', loginUserDto)
      .pipe(
        tap((res) => {
          this.authorizeUser(res.user, res.token);
        }),
      );
  }

  public register(
    registerUserDto: RegisterUserDto,
  ): Observable<AuthUserResponseDto> {
    return this.httpService
      .post<AuthUserResponseDto>('/auth/register', registerUserDto)
      .pipe(
        tap((res) => {
          this.authorizeUser(res.user, res.token);
        }),
      );
  }

  private authorizeUser(user: UserResponseDto, token: string) {
    this._user.next(new AuthenticatedUser(user));
    this.cookiesService.setAuthCookie(token);
  }

  public logout() {
    this._user.next(new AnonymousUser());
    this.cookiesService.removeAuthCookie();
  }

  public get currentUser() {
    return this._user.value;
  }

  public isAuthenticated(): Observable<boolean> {
    return this._user.pipe(map((u) => u.isAuthenticated));
  }
}
