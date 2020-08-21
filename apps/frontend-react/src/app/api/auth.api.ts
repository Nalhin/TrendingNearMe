import {
  AuthUserResponseDto,
  LoginUserDto,
  RegisterUserDto,
} from '@trends/data';

import { axios } from '../config/axios.config';

export function fetchLoginUser(body: LoginUserDto) {
  return axios.post<AuthUserResponseDto>('/auth/login', body);
}

export function fetchRegisterUser(body: RegisterUserDto) {
  return axios.post<AuthUserResponseDto>('/auth/register', body);
}
