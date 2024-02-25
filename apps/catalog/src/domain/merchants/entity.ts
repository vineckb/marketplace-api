import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ collection: 'merchants' })
@ObjectType()
@Directive('@key(fields: "_id")')
export class Merchant {
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  media: string;

  @Field()
  @Prop()
  address: string;

  @Field()
  @Prop()
  lat: number;

  @Field()
  @Prop()
  lng: number;
}
