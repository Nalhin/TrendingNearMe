import Cookies from 'universal-cookie';

import { axios } from './axios.config';
import { CookieTypes } from '../types/cookie.types';

class AppCookies extends Cookies {
  setAuthCookie(token: string) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    this.set(CookieTypes.AUTH, token);
  }

  removeAuthCookie() {
    axios.defaults.headers.Authorization = '';
    this.remove(CookieTypes.AUTH);
  }
}

const cookies = new AppCookies();

export { cookies };
