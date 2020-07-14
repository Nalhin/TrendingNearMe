import { Test, TestingModule } from '@nestjs/testing';
import { TwitterService } from './twitter.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { TwitterHttpConfigService } from '../config/twitter-http.config';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { coordinatesDtoFactory } from '../../../test/fixtures/trends.fixture';
import { TwitterTrend } from './twitter-trend.model';
import { twitterClosestResponse, twitterTrendResponse } from '../../../test/fixtures/twitter-response.fixture';

describe('TwitterService', () => {
  let service: TwitterService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          useClass: TwitterHttpConfigService,
        }),
      ],
      providers: [TwitterService],
    }).compile();

    service = module.get<TwitterService>(TwitterService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTrendsForPosition', () => {
    const coords = coordinatesDtoFactory.buildOne();

    it('should return twitter trends with correct format', (done) => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of({ data: twitterClosestResponse } as AxiosResponse))
        .mockReturnValueOnce(
          of({
            data: twitterTrendResponse
          } as AxiosResponse),
        );

      service.getTrendsForPosition(coords).subscribe((response) => {
        expect(response[0].tweetVolume).toBe(188674);
        expect(response[0]).toBeInstanceOf(TwitterTrend);
        expect(httpService.get).toHaveBeenNthCalledWith(1, expect.any(String), {
          params: { lat: coords.lat, long: coords.lng },
        });
        expect(httpService.get).toHaveBeenNthCalledWith(2, expect.any(String), {
          params: { id: twitterClosestResponse[0].woeid },
        });
        done();
      });
    });
  });
});
