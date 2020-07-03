import { HttpService, Injectable } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
import { TwitterPosition } from './interface/position';
import { plainToClass } from 'class-transformer';
import { TwitterTrendDto } from './dto/twitter-trend.dto';

@Injectable()
export class TwitterService {
  constructor(private readonly httpService: HttpService) {
  }

  private getClosestLocation(position: TwitterPosition) {
    return this.httpService
      .get('/trends/closest.json', { params: position })
      .pipe(map(res => res.data));
  }

  private getTrendsNearLocation(locationId: string) {
    return this.httpService
      .get('trends/place.json', { params: { id: locationId } })
      .pipe(map(res => res.data));
  }

  public getTrendsForPosition(position: TwitterPosition) {
    return this.getClosestLocation(position)
      .pipe(
        switchMap(([data]) => this.getTrendsNearLocation(data.woeid)),
        map(([{ trends }]) =>
          plainToClass(TwitterTrendDto, trends),
        ),
      );
  }
}
