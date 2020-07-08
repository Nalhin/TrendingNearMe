import axio from 'axios';
import { CookieTypes } from '@/types/CookieTypes';
import { cookies } from '@/config/cookiesConfig';

const axiosOptionsFactory = () => {
  const auth = cookies.get(CookieTypes.AUTH);

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
