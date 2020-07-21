import { Injectable } from '@angular/core';
import { UserResponseDto } from '@trends/data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpService: HttpClient) {}

  public me(): Observable<UserResponseDto> {
    return this.httpService.get<UserResponseDto>('/users/me');
  }
}
