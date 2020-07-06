import { MongoId } from '../../common/decorators/mongo-id';
import { Expose } from 'class-transformer';
import { MapCoordinates } from '../../common/types/coordinates.type';

export class TrendsHistoryResponseDto {
  @MongoId()
  @Expose()
  readonly _id: string;

  @Expose()
  readonly coordinates: MapCoordinates;

  @Expose()
  readonly created: Date;
}
