import { Test, TestingModule } from '@nestjs/testing';
import { TrendsController } from './trends.controller';
import { HttpModule } from '@nestjs/common';
import { TwitterHttpConfigService } from '../config/twitter-http.config';
import { TrendsService } from './trends.service';
import { TwitterService } from '../twitter/twitter.service';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { Trend } from './trends.schema';

describe('Trends Controller', () => {
  let controller: TrendsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          useClass: TwitterHttpConfigService,
        }),
      ],
      providers: [
        TrendsService,
        TwitterService,
        {
          provide: getModelToken(Trend.name),
          useValue: InjectModel(Trend.name),
        },
      ],
      controllers: [TrendsController],
    }).compile();

    controller = module.get<TrendsController>(TrendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
