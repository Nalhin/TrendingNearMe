import { HttpService, Injectable } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
import { camelize } from '../common/operators/camelize.operator';
import { plainToClass } from 'class-transformer';
import { TwitterTrend } from './twitter-trend.model';
import { CoordinatesDto } from '../trends/dto/coordinates.dto';
import { Observable } from 'rxjs';

@Injectable()
export class TwitterService {
  constructor(private readonly httpService: HttpService) {}

  private getClosestLocation({ lat, lng }: CoordinatesDto) {
    return this.httpService
      .get('trends/closest.json', { params: { lat, long: lng } })
      .pipe(map((res) => res.data));
  }

  private getTrendsNearLocation(locationId: string) {
    return this.httpService
      .get('trends/place.json', { params: { id: locationId } })
      .pipe(map((res) => res.data));
  }

  public getTrendsForPosition(
    coordinates: CoordinatesDto,
  ): Observable<TwitterTrend[]> {
    return this.getClosestLocation(coordinates).pipe(
      switchMap(([{ woeid }]) => this.getTrendsNearLocation(woeid)),
      camelize(),
      map(([{ trends }]) => plainToClass(TwitterTrend, trends as any[])),
    );
  }
}
