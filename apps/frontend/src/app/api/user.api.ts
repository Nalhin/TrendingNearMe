import { UserResponseDto } from '@trends/data';

import { axios } from '../config/axios.config';

export function fetchMe() {
  return axios.get<UserResponseDto>('/users/me');
}
