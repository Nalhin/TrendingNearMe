import { MongoId } from '../../common/decorators/mongo-id';
import { Expose, Type } from 'class-transformer';
import { TrendResponseDto } from './trend-response.dto';
import { CoordinatesDto } from './coordinates.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TrendHistoryDetailsResponseDto {
  @MongoId()
  @Expose()
  readonly _id: string;

  @Expose()
  @Type(() => CoordinatesDto)
  @ApiProperty({ type: CoordinatesDto })
  readonly coordinates: CoordinatesDto;

  @Expose()
  readonly created: Date;

  @Expose()
  @Type(() => TrendResponseDto)
  @ApiProperty({ type: TrendResponseDto })
  readonly trends: TrendResponseDto[];
}
