import { UserResponseDto } from '../../users/dto/user-response.dto';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserResponseDto {
  @Expose()
  @Type(() => UserResponseDto)
  @ApiProperty({ type: UserResponseDto })
  readonly user: UserResponseDto;
  @Expose()
  readonly token: string;
}
