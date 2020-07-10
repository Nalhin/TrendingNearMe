import * as faker from 'faker';
import { Factory } from 'factory.io';
import { CoordinatesDto } from '../../src/app/trends/dto/coordinates.dto';
import { TrendResponseDto } from '../../src/app/trends/dto/trend-response.dto';
import { TrendHistoryResponseDto } from '../../src/app/trends/dto/trend-history-response.dto';
import * as mongoose from 'mongoose';
import { TrendHistoryDetailsResponseDto } from '../../src/app/trends/dto/trend-history-details-response.dto';
import { Trend } from '../../src/app/trends/trends.schema';


export const coordinatesDtoFactory = new Factory(CoordinatesDto).props({
  lat: () => faker.random.number({ min: 0, max: 10 }),
  lng: () => faker.random.number({ min: 0, max: 10 }),
}).done();

export const trendResponseDtoFactory = new Factory(TrendResponseDto).props({
  name: faker.random.word,
  url: faker.random.word,
  promotedContent: faker.random.boolean,
  query: faker.random.word,
  tweetVolume: faker.random.number,
}).done();


export const trendHistoryResponseDtoFactory = new Factory(TrendHistoryResponseDto).props({
  created: faker.date.recent,
  coordinates: coordinatesDtoFactory.buildOne,
  _id: () => mongoose.Types.ObjectId.toString(),
}).done();

export const trendHistoryDetailsResponseDtoFactory = new Factory(TrendHistoryDetailsResponseDto)
  .props({ trends: () => trendResponseDtoFactory.buildMany(3) })
  .mixins([trendHistoryResponseDtoFactory]).done();

