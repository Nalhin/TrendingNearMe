import { HttpModule, Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterHttpConfigService } from '../config/twitter-http.config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: TwitterHttpConfigService,
    }),
  ],
  providers: [TwitterService],
  exports: [TwitterService],
})
export class TwitterModule {}
