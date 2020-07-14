import { Test, TestingModule } from '@nestjs/testing';
import { TrendsController } from './trends.controller';
import { HttpModule } from '@nestjs/common';
import { TwitterHttpConfigService } from '../config/twitter-http.config';
import { TrendsService } from './trends.service';
import { TwitterService } from '../twitter/twitter.service';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { Trend } from './trends.schema';
import { of } from 'rxjs';
import {
  coordinatesDtoFactory,
  trendDocumentFactory,
} from '../../../test/fixtures/trends.fixture';
import { twitterTrendFactory } from '../../../test/fixtures/twitter.fixture';
import { TrendResponseDto } from './dto/trend-response.dto';
import { TrendHistoryResponseDto } from './dto/trend-history-response.dto';
import { appUserFactory } from '../../../test/fixtures/users.fixture';
import { TrendHistoryDetailsResponseDto } from './dto/trend-history-details-response.dto';

describe('Trends Controller', () => {
  let controller: TrendsController;
  let trendsService: TrendsService;

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
    trendsService = module.get<TrendsService>(TrendsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTrendsByLocation', () => {
    it('should return correct response type', (done) => {
      const response = twitterTrendFactory.buildMany(3);
      const coordinates = coordinatesDtoFactory.buildOne();

      jest
        .spyOn(trendsService, 'getTrendsByLocation')
        .mockReturnValue(of(response));

      controller.getTrendsByLocation(coordinates).subscribe((res) => {
        expect(res[0]).toBeInstanceOf(TrendResponseDto);
        expect(res.length).toBe(response.length);
        expect(res[0].query).toBe(response[0].query);
        done();
      });
    });
  });

  describe('getHistory', () => {
    it('should return correct response type', (done) => {
      const user = appUserFactory.buildOne();
      const response = trendDocumentFactory.buildMany(3);
      jest.spyOn(trendsService, 'getHistory').mockReturnValue(of(response));

      controller.getHistory(user).subscribe((res) => {
        expect(res[0]).toBeInstanceOf(TrendHistoryResponseDto);
        expect(res.length).toBe(response.length);
        expect(res[0]._id).toBe(response[0]._id);
        done();
      });
    });
  });

  describe('getHistoryById', () => {
    it('should return correct response type', async () => {
      const user = appUserFactory.buildOne();
      const response = trendDocumentFactory.buildOne();
      jest
        .spyOn(trendsService, 'getHistoryById')
        .mockResolvedValueOnce(response);

      const result = await controller.getHistoryById(
        { id: response._id },
        user,
      );

      expect(result._id).toEqual(result._id);
      expect(result).toBeInstanceOf(TrendHistoryDetailsResponseDto);
    });
  });
});
