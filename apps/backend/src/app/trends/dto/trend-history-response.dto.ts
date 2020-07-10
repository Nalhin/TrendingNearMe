import { MongoId } from '../../common/decorators/mongo-id';
import { Expose, Type } from 'class-transformer';
import { CoordinatesDto } from './coordinates.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TrendHistoryResponseDto {
  @MongoId()
  @Expose()
  readonly _id: string;

  @Expose()
  @Type(() => CoordinatesDto)
  @ApiProperty({ type: CoordinatesDto })
  readonly coordinates: CoordinatesDto;

  @Expose()
  readonly created: Date;
}
