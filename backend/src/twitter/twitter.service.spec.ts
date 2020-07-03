import { Test, TestingModule } from '@nestjs/testing';
import { TwitterService } from './twitter.service';
import { HttpModule } from '@nestjs/common';
import { TwitterHttpConfigService } from '../config/twitter-http.config';

describe('TwitterService', () => {
  let service: TwitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[HttpModule.registerAsync({
        useClass: TwitterHttpConfigService,
      })],
      providers: [TwitterService],
    }).compile();

    service = module.get<TwitterService>(TwitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
