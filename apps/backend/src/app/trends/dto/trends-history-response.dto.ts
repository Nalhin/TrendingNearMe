import { MongoId } from '../../common/decorators/mongo-id';
import { Expose, Type } from 'class-transformer';
import { CoordinatesDto } from './coordinates.dto';

export class TrendsHistoryResponseDto {
  @MongoId()
  @Expose()
  readonly _id: string;

  @Expose()
  @Type(() => CoordinatesDto)
  readonly coordinates: CoordinatesDto;

  @Expose()
  readonly created: Date;
}
