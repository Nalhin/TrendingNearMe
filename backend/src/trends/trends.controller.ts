import { Controller, Get, Query } from '@nestjs/common';
import { TrendsService } from './trends.service';

@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) {}

  @Get('/location')
  getTrends(@Query('lat') lat: string, @Query('long') long: string) {
    return this.trendsService.getTrends({ lat, long });
  }
}
