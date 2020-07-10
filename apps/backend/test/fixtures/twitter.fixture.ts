import { TwitterTrend } from '../../src/app/twitter/twitter-trend.model';
import { Factory } from 'factory.io';
import * as faker from "faker";

export const twitterTrendFactory = new Factory(TwitterTrend).props({
  name: faker.random.word,
  url: faker.random.word,
  promotedContent: faker.random.boolean,
  query: faker.random.word,
  tweetVolume: faker.random.number,
}).done()
