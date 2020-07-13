import { Transform } from 'class-transformer';

export const MongoId = () =>
  Transform((value) => value.toString(), { toPlainOnly: true });
