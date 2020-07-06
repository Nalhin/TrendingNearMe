import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class TwitterHttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_KEY}`,
      },
      baseURL: 'https://api.twitter.com/1.1',
    };
  }
}
