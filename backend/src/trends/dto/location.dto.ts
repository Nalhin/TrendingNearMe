import { Expose } from 'class-transformer';

export class LocationDto {
  @Expose()
  lat: string;
  @Expose()
  long: string;

}