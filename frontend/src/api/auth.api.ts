import { axios } from '@/config/api.config';
import { AuthUserResponseDto, LoginUserDto, RegisterUserDto } from '@/Api';


export function fetchLoginUser(loginUserDto: LoginUserDto) {
  return axios.post<AuthUserResponseDto>('/auth/login', loginUserDto);
}

export function fetchRegisterUser(registerUserDto: RegisterUserDto) {
  return axios.post<AuthUserResponseDto>('/auth/register', registerUserDto);
}