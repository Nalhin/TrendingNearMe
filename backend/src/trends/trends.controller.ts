import { Controller, Get, Param, Query } from '@nestjs/common';
import { TrendsService } from './trends.service';
import { ReqUser } from '../common/decorators/user.decorator';
import { User } from '../user/user.schema';
import { Authenticated } from '../common/decorators/authenticated.decorator';
import { plainToClass } from 'class-transformer';
import { TrendsHistoryResponseDto } from './dto/trends-history-response.dto';
import { TrendsHistoryDetailsResponseDto } from './dto/trends-history-details-response.dto';

@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) {
  }

  @Get('/location')
  getTrends(@Query('lat') lat: string, @Query('long') long: string, @ReqUser() user: User) {
    return this.trendsService.getTrends({ lat, long }, user);
  }

  @Get('/history')
  @Authenticated()
  async getHistory(@ReqUser() user: User): Promise<TrendsHistoryResponseDto[]> {
    const history = await this.trendsService.getHistory(user);
    return plainToClass(TrendsHistoryResponseDto, history);
  }

  @Get('/history/:id')
  @Authenticated()
  async getHistoryById(@Param('id') id: string, @ReqUser() user: User) {
    const historyDetails = await this.trendsService.getHistoryById(id, user);
    return plainToClass(TrendsHistoryDetailsResponseDto, historyDetails);
  }
}
