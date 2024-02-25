import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@ObjectType()
@Schema()
@Directive('@key(fields: "_id")')
export class Customer {
  @Field(() => ID)
  @Prop(() => mongoose.Schema.Types.ObjectId)
  _id: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  pictureUrl: string;

  @Field(() => String)
  @Prop()
  latitude: number;

  @Field(() => String)
  @Prop()
  longitude: number;
}
