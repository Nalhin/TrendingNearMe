import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TwitterTrendDto } from '../twitter/dto/twitter-trend.dto';
import * as mongoose from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { LocationDto } from './dto/location.dto';


@Schema()
export class TrendsDocument extends Document {
  @Prop(TwitterTrendDto)
  trends: [TwitterTrendDto];

  @Prop(LocationDto)
  location: LocationDto;

  @Prop(
    raw({
      type: mongoose.Schema.Types.ObjectId,
      ref: UserDocument.name,
    }),
  )
  user: User;

  @Prop({ type: Date, default: () => new Date() })
  created: Date;
}

export const TrendsSchema = SchemaFactory.createForClass(TrendsDocument);