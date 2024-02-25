import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@ObjectType()
@Schema()
@Directive('@key(fields: "_id")')
export class Product {
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String)
  @Prop()
  media: string;

  @Field(() => String)
  @Prop()
  sectionName: string;

  @Field(() => Number)
  @Prop()
  sectionId: number;

  @Field(() => Number)
  @Prop()
  price: number;

  @Field(() => Number)
  @Prop()
  quantity: number;
}
