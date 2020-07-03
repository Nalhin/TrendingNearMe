import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TwitterService } from '../twitter/twitter.service';
import { TwitterPosition } from '../twitter/interface/position';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrendsDocument } from './trends.schema';
import { User } from '../user/user.schema';
import { tap } from 'rxjs/operators';

@Injectable()
export class TrendsService {
  constructor(private readonly twitterService: TwitterService, @InjectModel(TrendsDocument.name)
  private readonly trendsModel: Model<TrendsDocument>) {
  }

  public getTrends(position: TwitterPosition, user: User) {
    return this.twitterService.getTrendsForPosition(position).pipe(tap(trends => new this.trendsModel({
      trends,
      position,
      user,
    }).save()));
  }

  public getHistory(user: User) {
    return this.trendsModel.find({ user }).lean().exec();
  }

  public async getHistoryById(id: string, user: User) {
    const trend = await this.trendsModel.findById(id).lean().exec();
    if (!trend?.user._id.equals(user._id)) {
      throw new UnauthorizedException('User is not authorized to access the given resource');
    }
    return trend;
  }
}
