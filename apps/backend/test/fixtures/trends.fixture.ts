import * as faker from 'faker';
import { Factory } from 'factory.io';
import { CoordinatesDto } from '../../src/app/trends/dto/coordinates.dto';
import { TrendResponseDto } from '../../src/app/trends/dto/trend-response.dto';
import * as mongoose from 'mongoose';
import { TrendDocument } from '../../src/app/trends/trends.schema';
import { appUserFactory } from './users.fixture';
import { coordinatesDtoBuilder, trendResponseDtoBuilder } from '@trends/data';

export const coordinatesDtoFactory = new Factory(CoordinatesDto)
  .mixins([coordinatesDtoBuilder])
  .done();

export const trendResponseDtoFactory = new Factory(TrendResponseDto)
  .mixins([trendResponseDtoBuilder])
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
