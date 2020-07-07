import { Controller, Get, Param, Query } from '@nestjs/common';
import { TrendsService } from './trends.service';
import {
  AuthenticatedUser,
  ReqUser,
} from '../common/decorators/user.decorator';
import { Authenticated } from '../common/decorators/authenticated.decorator';
import { plainToClass } from 'class-transformer';
import { TrendsHistoryResponseDto } from './dto/trends-history-response.dto';
import { TrendsHistoryDetailsResponseDto } from './dto/trends-history-details-response.dto';
import { AuthUser } from '../auth/auth-user.model';
import { IUser } from '../user/user.schema';
import { TrendResponseDto } from './dto/trend-response.dto';
import { map } from 'rxjs/operators';
import { MongoIdParams } from '../common/params/mongo-id.params';
import { CoordinatesDto } from './dto/coordinates.dto';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('trends')
@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) {
  }

  @Get('/location')
  getTrends(
    @Query()coords: CoordinatesDto,
    @ReqUser() user: AuthUser,
  ): Observable<TrendResponseDto[]> {
    return this.trendsService
      .getTrends(coords, user)
      .pipe(map(trends => plainToClass(TrendResponseDto, trends)));
  }

  @Get('/history')
  @Authenticated()
  getHistory(
    @AuthenticatedUser() user: IUser,
  ): Observable<TrendsHistoryResponseDto[]> {
    return this.trendsService
      .getHistory(user)
      .pipe(map(trends => plainToClass(TrendsHistoryResponseDto, trends)));
  }

  @Get('/history/:id')
  @Authenticated()
  async getHistoryById(
    @Param() { id }: MongoIdParams,
    @AuthenticatedUser() user: IUser,
  ): Promise<TrendsHistoryDetailsResponseDto> {
    const historyDetails = await this.trendsService.getHistoryById(id, user);
    return plainToClass(TrendsHistoryDetailsResponseDto, historyDetails);
  }
}
