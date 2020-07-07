import { MongoId } from '../../common/decorators/mongo-id';
import { Expose } from 'class-transformer';
import { TrendResponseDto } from './trend-response.dto';
import { CoordinatesDto } from './coordinates.dto';

export class TrendsHistoryDetailsResponseDto {
  @MongoId()
  @Expose()
  readonly _id: string;

  @Expose()
  readonly coordinates: CoordinatesDto;

  @Expose()
  readonly created: Date;

  @Expose()
  readonly trends: TrendResponseDto[];
}
