import { Module } from '@nestjs/common';
import { TrendsController } from './trends.controller';
import { TrendsService } from './trends.service';
import { TwitterModule } from '../twitter/twitter.module';

@Module({
  imports: [TwitterModule],
  controllers: [TrendsController],
  providers: [TrendsService],
})
export class TrendsModule {}
