import { Expose } from 'class-transformer';
import { MongoId } from '../../common/decorators/mongo-id';

export class UserResponseDto {
  @MongoId()
  @Expose()
  _id: string;
  @Expose()
  username: string;
  @Expose()
  email: string;

  constructor(partial?: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
