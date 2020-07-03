import { MongoId } from '../../common/decorators/mongo-id';
import { Expose } from 'class-transformer';
import { LocationDto } from './location.dto';
import { TwitterTrendDto } from '../../twitter/dto/twitter-trend.dto';

export class TrendsHistoryDetailsResponseDto {

  @MongoId()
  @Expose()
  _id: string;

  @Expose()
  location: LocationDto;

  @Expose()
  created: Date;

  @Expose()
  trends: TwitterTrendDto[];

}