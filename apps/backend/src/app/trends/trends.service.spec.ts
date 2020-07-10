import { Test, TestingModule } from '@nestjs/testing';
import { TrendsService } from './trends.service';
import { HttpModule } from '@nestjs/common';
import { TwitterService } from '../twitter/twitter.service';
import { TwitterHttpConfigService } from '../config/twitter-http.config';
import { getModelToken } from '@nestjs/mongoose';
import { Trend } from './trends.schema';
import { mockModelFactory } from '../../../test/mocks/model.mock';
import { Model } from 'mongoose';

describe('TrendsService', () => {
  let service: TrendsService;
  let model: Model<Trend>;

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
          useValue: mockModelFactory(),
        },
      ],
    }).compile();

    service = module.get<TrendsService>(TrendsService);
    model = module.get<Model<Trend>>(getModelToken(Trend.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTrendsByLocation', () => {
    it('should ', () => {
      
    });

  });
  describe('getHistory', () => {
    it('should ', () => {
      
    });

  });
  describe('getHistoryById', () => {
    it('should throw error if user id does not match trend id', () => {
      
    });
    it('should return correct response', () => {
      
    });
  });
});
