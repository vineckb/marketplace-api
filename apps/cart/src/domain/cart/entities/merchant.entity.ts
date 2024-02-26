import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CartItem } from './cart-item.entity';

@ObjectType()
export class CartMerchant {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  media: string;

  @Field(() => Number)
  subtotal: number;

  @Field(() => Number)
  shippingTax: number;

  @Field(() => Number)
  pickingTax: number;

  @Field(() => Number)
  minOrder: number;

  @Field(() => [CartItem!])
  products: Array<CartItem>;
}
