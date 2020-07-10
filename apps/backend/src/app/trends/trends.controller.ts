import { Controller, Get, Param, Query } from '@nestjs/common';
import { TrendsService } from './trends.service';
import { ReqUser } from '../common/decorators/user.decorator';
import { Authenticated } from '../common/decorators/authenticated.decorator';
import { plainToClass } from 'class-transformer';
import { TrendsHistoryResponseDto } from './dto/trends-history-response.dto';
import { TrendsHistoryDetailsResponseDto } from './dto/trends-history-details-response.dto';
import { AppUser } from '../user/user.schema';
import { TrendResponseDto } from './dto/trend-response.dto';
import { map } from 'rxjs/operators';
import { MongoIdParams } from '../common/params/mongo-id.params';
import { CoordinatesDto } from './dto/coordinates.dto';
import { Observable } from 'rxjs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('trends')
@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) {
  }

  @Get('/location')
  @ApiCreatedResponse({
    description: 'Returns current twitter trends near provided location.',
    type: [TrendResponseDto],
  })
  getTrends(
    @Query() coords: CoordinatesDto,
    @ReqUser() user?: AppUser,
  ): Observable<TrendResponseDto[]> {
    return this.trendsService
      .getTrends(coords, user)
      .pipe(map(trends => plainToClass(TrendResponseDto, trends)));
  }

  @ApiOkResponse({
    description: 'Returns trend search history.',
    type: [TrendsHistoryResponseDto],
  })
  @Get('/history')
  @Authenticated()
  getHistory(@ReqUser() user: AppUser): Observable<TrendsHistoryResponseDto[]> {
    return this.trendsService
      .getHistory(user)
      .pipe(map(trends => plainToClass(TrendsHistoryResponseDto, trends)));
  }

  @ApiOkResponse({
    description: 'Returns trend search history details.',
    type: TrendsHistoryDetailsResponseDto,
  })
  @Get('/history/:id')
  @Authenticated()
  async getHistoryById(
    @Param() { id }: MongoIdParams,
    @ReqUser() user: AppUser,
  ): Promise<TrendsHistoryDetailsResponseDto> {
    const historyDetails = await this.trendsService.getHistoryById(id, user);
    return plainToClass(TrendsHistoryDetailsResponseDto, historyDetails);
  }
}
