import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Product {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String)
  @Prop()
  mediaUrl: string;

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
