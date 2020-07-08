import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = function(
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre<User>('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export interface AppUser extends User {
  comparePassword(password): Promise<boolean>;
}
