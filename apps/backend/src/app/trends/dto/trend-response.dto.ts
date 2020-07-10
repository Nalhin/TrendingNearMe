import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TrendResponseDto {
  @Expose()
  @ApiProperty()
  readonly name: string;
  @Expose()
  @ApiProperty()
  readonly url: string;
  @Expose()
  @ApiProperty({
    type: Boolean,
    nullable: true,
  })
  readonly promotedContent: boolean | null;
  @Expose()
  @ApiProperty()
  readonly query: string;
  @Expose()
  @ApiProperty({
    type: Number,
    nullable: true,
  })
  readonly tweetVolume: number | null;
}
