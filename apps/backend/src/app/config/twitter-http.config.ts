import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { TWITTER_BASE } from '../common/constants/url.constants';

@Injectable()
export class TwitterHttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_KEY}`,
      },
      baseURL: TWITTER_BASE,
    };
  }
}
