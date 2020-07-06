import { MongoId } from '../../common/decorators/mongo-id';
import { Expose, Type } from 'class-transformer';
import { TrendResponseDto } from './trend-response.dto';
import { MapCoordinates } from '../../common/types/coordinates.type';

export class TrendsHistoryDetailsResponseDto {
  @MongoId()
  @Expose()
  readonly _id: string;

  @Expose()
  readonly coordinates: MapCoordinates;

  @Expose()
  readonly created: Date;

  @Expose()
  readonly trends: TrendResponseDto[];
}
