import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Customer {
  @Field(() => ID)
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
