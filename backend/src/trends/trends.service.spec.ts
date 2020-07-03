import { Test, TestingModule } from '@nestjs/testing';
import { TrendsService } from './trends.service';
import { HttpModule } from '@nestjs/common';
import { TwitterService } from '../twitter/twitter.service';
import { TwitterHttpConfigService } from '../config/twitter-http.config';

describe('TrendsService', () => {
  let service: TrendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule.registerAsync({
        useClass: TwitterHttpConfigService,
      })],
      providers: [TrendsService, TwitterService],
    }).compile();

    service = module.get<TrendsService>(TrendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
