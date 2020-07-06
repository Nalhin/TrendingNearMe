import { IsMongoId } from 'class-validator';

export class MongoIdParams {
  @IsMongoId()
  readonly id: string;
}
