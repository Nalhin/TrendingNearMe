import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TwitterService } from '../twitter/twitter.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trend } from './trends.schema';
import { IUser } from '../user/user.schema';
import { tap } from 'rxjs/operators';
import { AuthUser } from '../auth/auth-user.model';
import { from } from 'rxjs';
import { CoordinatesDto } from './dto/coordinates.dto';

@Injectable()
export class TrendsService {
  constructor(
    private readonly twitterService: TwitterService,
    @InjectModel(Trend.name)
    private readonly trendsModel: Model<Trend>,
  ) {}

  public getTrends(coordinates: CoordinatesDto, user: AuthUser) {
    return this.twitterService.getTrendsForPosition(coordinates).pipe(
      tap(trends => {
        if (user.isAuthenticated()) {
          new this.trendsModel({
            trends,
            coordinates,
            user: user.nativeUser,
          }).save();
        }
      }),
    );
  }

  public getHistory(user: IUser) {
    return from(
      this.trendsModel
        .find({ user })
        .lean()
        .exec(),
    );
  }

  public async getHistoryById(id: string, user: IUser) {
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
