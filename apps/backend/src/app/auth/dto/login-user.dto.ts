import { MinLength } from 'class-validator';

export class LoginUserDto {
  readonly username: string;
  @MinLength(6)
  readonly password: string;
}
