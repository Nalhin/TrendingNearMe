import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TrendResponseDto {
  @Expose()
  readonly name: string;
  @Expose()
  readonly url: string;
  @Expose()
  @ApiProperty({
    type: Boolean,
    nullable: true,
  })
  readonly promotedContent: boolean | null;
  @Expose()
  readonly query: string;
  @Expose()
  @ApiProperty({
    type: Number,
    nullable: true,
  })
  readonly tweetVolume: number | null;
}
