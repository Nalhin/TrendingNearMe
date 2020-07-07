import { MongoId } from '../../common/decorators/mongo-id';
import { Expose } from 'class-transformer';
import { CoordinatesDto } from './coordinates.dto';

export class TrendsHistoryResponseDto {
  @MongoId()
  @Expose()
  readonly _id: string;

  @Expose()
  readonly coordinates: CoordinatesDto;

  @Expose()
  readonly created: Date;
}
