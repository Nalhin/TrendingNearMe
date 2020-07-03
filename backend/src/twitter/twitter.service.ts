import { HttpService, Injectable } from '@nestjs/common';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class TwitterService {
  constructor(private readonly httpService: HttpService) {
  }

  private getClosestLocation(position: Position) {
    return this.httpService.get('/trends/closest.json', { params: position });
  }

  private getTrendsNearLocation(locationId: string) {
    return this.httpService.get('/trend/trends/place.json', { params: { id: locationId } });
  }

  public getTrends(position: Position){
    this.getClosestLocation(position).pipe(flatMap((resp)=>this.getTrendsNearLocation(resp.data.woeid)));
  };
}
