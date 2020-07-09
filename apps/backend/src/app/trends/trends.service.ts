import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TwitterService } from '../twitter/twitter.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trend } from './trends.schema';
import { AppUser } from '../user/user.schema';
import { tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { CoordinatesDto } from './dto/coordinates.dto';
import { TwitterTrend } from '../twitter/twitter-trend.model';

@Injectable()
export class TrendsService {
  constructor(
    private readonly twitterService: TwitterService,
    @InjectModel(Trend.name)
    private readonly trendsModel: Model<Trend>,
  ) {}

  public getTrends(
    coordinates: CoordinatesDto,
    user?: AppUser,
  ): Observable<TwitterTrend[]> {
    return this.twitterService.getTrendsForPosition(coordinates).pipe(
      tap(trends => {
        if (user) {
          new this.trendsModel({
            trends,
            coordinates,
            user,
          }).save();
        }
      }),
    );
  }

  public getHistory(user: AppUser) {
    return from(
      this.trendsModel
        .find({ user })
        .lean()
        .exec(),
    );
  }

  public async getHistoryById(id: string, user: AppUser) {
    const trend = await this.trendsModel
      .findById(id)
      .lean()
      .exec();

    if (!trend?.user._id.equals(user._id)) {
      throw new UnauthorizedException(
        'User is not authorized to access the given resource',
      );
    }
    return trend;
  }
}
