import { MongoId } from '../../common/decorators/mongo-id';
import { Expose } from 'class-transformer';
import { LocationDto } from './location.dto';


export class TrendsHistoryResponseDto {

  @MongoId()
  @Expose()
  _id: string;

  @Expose()
  location: LocationDto;

  @Expose()
  created: Date;

}