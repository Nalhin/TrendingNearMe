export class UserResponseDto {
  username: string;
  email: string;

  constructor(partial?: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
