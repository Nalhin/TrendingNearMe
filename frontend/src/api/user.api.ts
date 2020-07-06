import { axios } from '@/config/api.config';

export function fetchMe() {
  return axios.get('/users/me');
}