import { IsLatitude, IsLongitude } from 'class-validator';
import { Expose } from 'class-transformer';

export class CoordinatesDto {
  @Expose()
  @IsLatitude()
  readonly lat: number;

  @Expose()
  @IsLongitude()
  readonly lng: number;
}
