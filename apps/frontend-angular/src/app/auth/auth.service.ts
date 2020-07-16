import { Injectable } from '@angular/core';
import {
  AnonymousUser,
  AuthenticatedUser,
  AuthUserResponseDto,
  LoginUserDto,
  RegisterUserDto,
  UserModel,
} from '@trends/data';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(
    new AnonymousUser(),
  );

  constructor(private readonly httpService: HttpClient) {}

  public login(loginUserDto: LoginUserDto): Observable<AuthUserResponseDto> {
    return this.httpService
      .post<AuthUserResponseDto>('/auth/login', loginUserDto)
      .pipe(
        tap((res) => {
          this._user.next(new AuthenticatedUser(res.user));
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
          this._user.next(new AuthenticatedUser(res.user));
        }),
      );
  }

  public logout() {
    this._user.next(new AnonymousUser());
  }

  public get currentUser() {
    return this._user.value;
  }
}
