import { Expose } from 'class-transformer';

export class TwitterTrendDto {
  @Expose()
  name: string;
  @Expose()
  url: string;
  @Expose({ name: 'promoted_content' })
  promotedContent: boolean | null;
  @Expose()
  query: string;
  @Expose({ name: 'tweet_volume' })
  tweetVolume: number | null;

  constructor(partial?: Partial<TwitterTrendDto>) {
    Object.assign(this, partial);
  }
}
