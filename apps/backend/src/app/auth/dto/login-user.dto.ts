import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  readonly username: string;
  @MinLength(6)
  readonly password: string;
}
