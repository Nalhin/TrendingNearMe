import { Expose } from 'class-transformer';
import { MongoId } from '../../common/decorators/mongo-id';

export class UserResponseDto {
  @MongoId()
  @Expose()
  readonly _id: string;
  @Expose()
  readonly username: string;
  @Expose()
  readonly email: string;
}
