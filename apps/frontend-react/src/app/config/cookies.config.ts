import Cookies from 'universal-cookie';

import { axios } from './axios.config';
import { AUTH_COOKIE } from './cookie-types.config';

class AppCookies extends Cookies {
  getAuthCookie(): string | undefined {
    return this.get(AUTH_COOKIE);
  }

  setAuthCookie(token: string) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    this.set(AUTH_COOKIE, token);
  }

  removeAuthCookie() {
    axios.defaults.headers.Authorization = '';
    this.remove(AUTH_COOKIE);
  }
}

const cookies = new AppCookies();

export { cookies };
