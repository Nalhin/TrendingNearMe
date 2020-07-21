import { Factory } from 'factory.io';
import {
  CoordinatesDto,
  TrendHistoryDetailsResponseDto,
  TrendHistoryResponseDto,
  TrendResponseDto,
} from '@trends/data';
import * as faker from 'faker';

export const coordinatesDtoBuilder = new Factory<CoordinatesDto>()
  .props({
    lat: () => faker.random.number({ min: 0, max: 10 }),
    lng: () => faker.random.number({ min: 0, max: 10 }),
  })
  .done();

export const trendResponseDtoBuilder = new Factory<TrendResponseDto>()
  .props({
    name: faker.random.word,
    url: faker.internet.url,
    promotedContent: null,
    query: faker.random.word,
    tweetVolume: faker.random.number,
  })
  .done();

export const trendHistoryResponseDtoBuilder = new Factory<
  TrendHistoryResponseDto
>()
  .props({
    _id: faker.random.uuid,
    created: () => new Date().toISOString(),
    coordinates: coordinatesDtoBuilder.buildOne,
  })
  .done();

export const trendHistoryDetailsResponseDtoBuilder = new Factory<
  TrendHistoryDetailsResponseDto
>()
  .props({
    trends: () => trendResponseDtoBuilder.buildMany(3),
  })
  .mixins([trendHistoryResponseDtoBuilder])
  .done();
