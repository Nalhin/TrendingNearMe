import { UserResponseDto } from '../../user/dto/user-response.dto';
import { Expose, Type } from 'class-transformer';

export class AuthUserResponseDto {
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
  @Expose()
  token: string;

  constructor(partial?: Partial<AuthUserResponseDto>) {
    Object.assign(this, partial);
  }
}
