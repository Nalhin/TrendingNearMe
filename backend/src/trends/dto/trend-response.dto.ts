import { Expose } from 'class-transformer';

export class TrendResponseDto {
  @Expose()
  readonly name: string;
  @Expose()
  readonly url: string;
  @Expose()
  readonly promotedContent: boolean | null;
  @Expose()
  readonly query: string;
  @Expose()
  readonly tweetVolume: number | null;
}
