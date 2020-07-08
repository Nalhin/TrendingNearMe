import { axios } from '@/config/apiConfig';

export function fetchMe() {
  return axios.get('/users/me');
}
