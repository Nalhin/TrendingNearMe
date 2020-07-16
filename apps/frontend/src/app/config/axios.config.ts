import axio from 'axios';
import Cookies from 'universal-cookie';

import { CookieTypes } from '../types/cookie.types';

const axiosOptionsFactory = () => {
  const auth = new Cookies().get(CookieTypes.AUTH);

  const options = {
    baseURL: process.env.API_URI ?? 'http://localhost:8000',
  };

  if (auth) {
    Object.assign(options, { headers: { Authorization: `Bearer ${auth}` } });
  }
  return options;
};

const instance = axio.create(axiosOptionsFactory());

export { instance as axios };