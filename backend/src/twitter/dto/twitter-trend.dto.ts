import { Expose } from 'class-transformer';

export class TwitterTrendDto {
  name: string;
  url: string;
  @Expose({ name: 'promoted_content' })
  promoted_content: boolean | null;
  query: string;
  @Expose({ name: 'tweet_volume' })
  tweetVolume: number | null;

  constructor(partial?: Partial<TwitterTrendDto>) {
    Object.assign(this, partial);
  }
}
