import { Injectable } from '@nestjs/common';
import { TwitterService } from '../twitter/twitter.service';
import { TwitterPosition } from '../twitter/interface/position';

@Injectable()
export class TrendsService {
  constructor(private readonly twitterService: TwitterService) {
  }

  public getTrends(position: TwitterPosition) {
    return this.twitterService.getTrendsForPosition(position);
  }
}
