import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Product } from './product.entity';
import mongoose from 'mongoose';

@ObjectType()
@Schema()
@Directive('@key(fields: "_id")')
export class Merchant {
  @Field(() => ID)
  @Prop(() => mongoose.Schema.Types.ObjectId)
  _id: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  media: string;

  @Field(() => Number)
  @Prop()
  subtotal: number;

  @Field(() => Number)
  @Prop()
  shippingTax: number;

  @Field(() => Number)
  @Prop()
  pickingTax: number;

  @Field(() => Number)
  @Prop()
  minOrder: number;

  @Field(() => [Product!])
  @Prop()
  products: Array<Product>;
}
