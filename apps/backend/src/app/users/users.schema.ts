import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, DocumentDefinition } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);

UsersSchema.methods.comparePassword = function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

UsersSchema.pre<User>('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export interface AppUser extends User {
  comparePassword(password): Promise<boolean>;
}

export type UserDocument = DocumentDefinition<User>;
