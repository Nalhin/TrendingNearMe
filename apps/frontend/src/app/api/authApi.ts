import { AuthUserResponseDto, LoginUserDto, RegisterUserDto } from '../Api';
import { axios } from '../config/axios.config';

export function fetchLoginUser(loginUserDto: LoginUserDto) {
  return axios.post<AuthUserResponseDto>('/auth/login', loginUserDto);
}

export function fetchRegisterUser(registerUserDto: RegisterUserDto) {
  return axios.post<AuthUserResponseDto>('/auth/register', registerUserDto);
}
