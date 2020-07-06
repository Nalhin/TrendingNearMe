import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { IUser, User } from '../user/user.schema';
import { TwitterTrend } from '../twitter/twitter-trend.model';
import { MapCoordinates } from '../common/types/coordinates.type';

@Schema()
export class Trend extends Document {
  @Prop(TwitterTrend)
  trends: [TwitterTrend];

  @Prop()
  coordinates: MapCoordinates;

  @Prop(
    raw({
      type: mongoose.Schema.Types.ObjectId,
      ref: User.name,
    }),
  )
  user: IUser;

  @Prop({ type: Date, default: Date.now })
  created: Date;
}

export const TrendsSchema = SchemaFactory.createForClass(Trend);
