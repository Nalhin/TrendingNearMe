import { IsLatitude, IsLongitude } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class CoordinatesDto {
  @Expose()
  @IsLatitude()
  @Transform((value) => Number(value))
  readonly lat: number;

  @Expose()
  @IsLongitude()
  @Transform((value) => Number(value))
  readonly lng: number;
}
