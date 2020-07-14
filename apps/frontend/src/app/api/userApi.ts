import { axios } from '../config/axios.config';
import { UserResponseDto } from '../Api';

export function fetchMe() {
  return axios.get<UserResponseDto>('/users/me');
}
