import * as faker from 'faker';
import { Factory } from 'factory.io';
import { CoordinatesDto } from '../../src/app/trends/dto/coordinates.dto';
import { TrendResponseDto } from '../../src/app/trends/dto/trend-response.dto';
import * as mongoose from 'mongoose';
import { TrendDocument } from '../../src/app/trends/trends.schema';
import { appUserFactory } from './users.fixture';

export const coordinatesDtoFactory = new Factory(CoordinatesDto)
  .props({
    lat: () => faker.random.number({ min: 0, max: 10 }),
    lng: () => faker.random.number({ min: 0, max: 10 }),
  })
  .done();

export const trendResponseDtoFactory = new Factory(TrendResponseDto)
  .props({
    name: faker.random.word,
    url: faker.random.word,
    promotedContent: faker.random.boolean,
    query: faker.random.word,
    tweetVolume: faker.random.number,
  })
  .done();

export const trendDocumentFactory = new Factory<TrendDocument>()
  .props({
    trends: () => trendResponseDtoFactory.buildMany(3),
    coordinates: coordinatesDtoFactory.buildOne,
    user: appUserFactory.buildOne,
    created: faker.date.recent,
    _id: mongoose.Types.ObjectId,
  })
  .done();
