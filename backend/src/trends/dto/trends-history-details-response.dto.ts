import { MongoId } from '../../common/decorators/mongo-id';
import { Expose } from 'class-transformer';
import { TrendResponseDto } from './trend-response.dto';
import { MapCoordinates } from '../../common/types/coordinates.type';
import { ApiProperty } from '@nestjs/swagger';

export class TrendsHistoryDetailsResponseDto {
  @MongoId()
  @Expose()
  readonly _id: string;

  @Expose()
  @ApiProperty()
  readonly coordinates: MapCoordinates;

  @Expose()
  readonly created: Date;

  @Expose()
  readonly trends: TrendResponseDto[];
}
