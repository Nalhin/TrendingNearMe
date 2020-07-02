import { UserResponseDto } from '../../user/dto/user-response.dto';

export class AuthUserResponseDto {
  user: UserResponseDto;
  token: string;

  constructor(partial?: Partial<AuthUserResponseDto>) {
    Object.assign(this, partial);
  }
}
