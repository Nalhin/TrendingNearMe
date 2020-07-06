import Cookies from 'universal-cookie';
import { CookieTypes } from '@/types/cookie.types';
import { axios } from '@/config/api.config';

export class CustomCookies extends Cookies {
  setAuthCookie(token: string) {
    this.set(CookieTypes.AUTH, token);
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }

  getAuthCookie() {
    return this.get(CookieTypes.AUTH);
  }
}

export const cookies = new CustomCookies();
