import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, DocumentDefinition } from 'mongoose';
import * as mongoose from 'mongoose';
import { AppUser, User } from '../user/user.schema';
import { TwitterTrend } from '../twitter/twitter-trend.model';
import { CoordinatesDto } from './dto/coordinates.dto';

@Schema({ timestamps: { createdAt: 'created' } })
export class Trend extends Document {
  @Prop(TwitterTrend)
  trends: TwitterTrend[];

  @Prop(CoordinatesDto)
  coordinates: CoordinatesDto;

  @Prop(
    raw({
      type: mongoose.Schema.Types.ObjectId,
      ref: User.name,
    }),
  )
  user: AppUser;

  created: Date;
}

export const TrendsSchema = SchemaFactory.createForClass(Trend);

export type TrendDocument = DocumentDefinition<Trend>;
