import { Module } from '@nestjs/common';
import { TrendsController } from './trends.controller';
import { TrendsService } from './trends.service';
import { TwitterModule } from '../twitter/twitter.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TrendsDocument, TrendsSchema } from './trends.schema';

@Module({
  imports: [TwitterModule, MongooseModule.forFeature([
    { name: TrendsDocument.name, schema: TrendsSchema },
  ])],
  controllers: [TrendsController],
  providers: [TrendsService],
})
export class TrendsModule {
}
