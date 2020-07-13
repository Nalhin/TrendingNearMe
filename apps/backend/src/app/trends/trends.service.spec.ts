import { Test, TestingModule } from '@nestjs/testing';
import { TrendsService } from './trends.service';
import { HttpModule, UnauthorizedException } from '@nestjs/common';
import { TwitterService } from '../twitter/twitter.service';
import { TwitterHttpConfigService } from '../config/twitter-http.config';
import { getModelToken } from '@nestjs/mongoose';
import { Trend } from './trends.schema';
import { mockModelFactory } from '../../../test/mocks/model.mock';
import { DocumentQuery, Model } from 'mongoose';
import { createMock } from '@golevelup/nestjs-testing';
import {
  coordinatesDtoFactory,
  trendDocumentFactory,
} from '../../../test/fixtures/trends.fixture';
import { appUserFactory } from '../../../test/fixtures/user.fixture';
import { twitterTrendFactory } from '../../../test/fixtures/twitter.fixture';
import { of } from 'rxjs';

describe('TrendsService', () => {
  let service: TrendsService;
  let twitterService: TwitterService;
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
    twitterService = module.get<TwitterService>(TwitterService);
    model = module.get<Model<Trend>>(getModelToken(Trend.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTrendsByLocation', () => {
    const response = twitterTrendFactory.buildMany(3);
    const location = coordinatesDtoFactory.buildOne();

    it('should return and persist data if user is authenticated', (done) => {
      const user = appUserFactory.buildOne();
      jest.spyOn(model, 'create').mockResolvedValueOnce(null);
      jest
        .spyOn(twitterService, 'getTrendsForPosition')
        .mockReturnValueOnce(of(response));

      service.getTrendsByLocation(location, user).subscribe((result) => {
        expect(result).toEqual(response);
        expect(twitterService.getTrendsForPosition).toBeCalledWith(location);
        expect(model.create).toBeCalledTimes(1);
        done();
      });
    });

    it('should only return data if user is not authenticated', (done) => {
      jest.spyOn(model, 'create').mockResolvedValueOnce(null);
      jest
        .spyOn(twitterService, 'getTrendsForPosition')
        .mockReturnValueOnce(of(response));

      service.getTrendsByLocation(location).subscribe((result) => {
        expect(result).toEqual(response);
        expect(twitterService.getTrendsForPosition).toBeCalledWith(location);
        expect(model.create).not.toBeCalled();
        done();
      });
    });
  });

  describe('getHistory', () => {
    const response = trendDocumentFactory.buildMany(3);
    const user = appUserFactory.buildOne();
    it('should return trend history', (done) => {
      jest.spyOn(model, 'find').mockReturnValueOnce(
        createMock<DocumentQuery<Trend[], Trend, unknown>>({
          lean: () => ({ exec: jest.fn().mockResolvedValueOnce(response) }),
        }),
      );

      service.getHistory(user).subscribe((result) => {
        expect(result).toBe(response);
        done();
      });
    });
  });

  describe('getHistoryById', () => {
    const response = trendDocumentFactory.buildOne();

    it('should throw error if user id does not match trend id', async () => {
      const user = appUserFactory.buildOne();
      jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<DocumentQuery<Trend, Trend, unknown>>({
          lean: () => ({ exec: jest.fn().mockResolvedValueOnce(response) }),
        }),
      );

      await expect(
        service.getHistoryById(response._id, user),
      ).rejects.toThrowError(UnauthorizedException);
    });
    it('should return correct response', async () => {
      const user = appUserFactory.buildOne({ _id: response.user._id });
      jest.spyOn(model, 'findById').mockReturnValueOnce(
        createMock<DocumentQuery<Trend, Trend, unknown>>({
          lean: () => ({ exec: jest.fn().mockResolvedValueOnce(response) }),
        }),
      );

      const result = await service.getHistoryById(response._id, user);

      expect(result).toEqual(response);
    });
  });
});
