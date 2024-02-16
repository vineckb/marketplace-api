import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Product } from './product.entity';

@ObjectType()
@Schema()
export class Merchant {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  mediaUrl: string;

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
