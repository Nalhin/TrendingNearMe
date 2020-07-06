import { IsLatitude, IsLongitude } from 'class-validator';

export class CoordinatesParams {
  @IsLatitude()
  readonly lat: string;

  @IsLongitude()
  readonly lng: string;
}
