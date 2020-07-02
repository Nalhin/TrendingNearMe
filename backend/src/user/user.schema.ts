import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, DocumentDefinition } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class UserDocument extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  constructor(partial?: Partial<UserDocument>) {
    super();
    Object.assign(this, partial);
  }
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);

UserSchema.methods.comparePassword = function(password): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre<UserDocument>('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export interface UserDocumentType extends UserDocument {
  comparePassword(password): Promise<boolean>;
}

export type User = DocumentDefinition<UserDocumentType>;
