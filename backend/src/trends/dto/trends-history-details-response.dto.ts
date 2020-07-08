import { MongoId } from '../../common/decorators/mongo-id';
import { Expose, Type } from 'class-transformer';
import { TrendResponseDto } from './trend-response.dto';
import { CoordinatesDto } from './coordinates.dto';

export class TrendsHistoryDetailsResponseDto {
  @MongoId()
  @Expose()
  readonly _id: string;

  @Expose()
  @Type(() => CoordinatesDto)
  readonly coordinates: CoordinatesDto;

  @Expose()
  readonly created: Date;

  @Expose()
  @Type(() => TrendResponseDto)
  readonly trends: TrendResponseDto[];
}
