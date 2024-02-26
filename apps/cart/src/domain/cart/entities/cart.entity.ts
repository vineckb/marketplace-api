import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Customer } from './customer.entity';
import { CartMerchant } from './merchant.entity';
import mongoose from 'mongoose';
import { ProductWithMerchant } from '../dto/product-with-merchant';

@ObjectType()
@Schema()
@Directive('@key(fields: "id")')
export class Cart {
  @Field(() => ID)
  @Prop(() => mongoose.Schema.Types.ObjectId)
  id: string;

  @Field()
  @Prop({ required: true })
  status: string;

  @Field(() => Number)
  @Prop()
  shippingPrice: number;

  @Field(() => Number)
  @Prop()
  shippingEstimate: number;

  @Field(() => Number)
  @Prop()
  platformTax: number;

  @Field(() => Number)
  @Prop()
  merchantTax: number;

  @Field(() => Number)
  @Prop()
  discount: number;

  @Field(() => Number)
  @Prop()
  total: number;

  @Field(() => Customer)
  @Prop({ required: true })
  customer: Customer;

  @Field(() => [CartMerchant!])
  @Prop()
  merchants: Array<CartMerchant>;

  addProduct(product: ProductWithMerchant): void {
    const merchantIndex = this.merchants.findIndex(
      (merchant) => merchant.id === product.merchant.id,
    );

    if (merchantIndex >= 0) {
      this.merchants[merchantIndex].products.push(product);
    } else {
      this.merchants.push({
        ...product.merchant,
        subtotal: 0,
        shippingTax: 0,
        pickingTax: 0,
        products: [
          {
            ...product,
            quantity: 1,
          },
        ],
      });
    }

    this.calculate();
  }

  updateQuantity(productId: string, quantity: number) {
    this.merchants.forEach((merchant, merchantIndex) => {
      const productIndex = merchant.products.findIndex(
        (product) => product.id === productId,
      );

      if (productIndex >= 0) {
        this.merchants[merchantIndex].products[productIndex].quantity =
          quantity;
      }
    });

    this.calculate();
  }

  private calculate() {
    this.merchants.forEach((merchant, index) => {
      this.merchants[index].subtotal = merchant.products.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0,
      );
    });

    this.total = this.merchants.reduce(
      (total, curr) => (total += curr.subtotal),
      0,
    );
  }

  removeProduct(productId: string) {
    this.merchants.forEach((merchant, merchantIndex) => {
      const productIndex = merchant.products.findIndex(
        (product) => product.id === productId,
      );

      if (productIndex >= 0) {
        this.merchants[merchantIndex].products.splice(productIndex, 1);
      }
    });

    this.calculate();
  }

  @Field(() => Number)
  @Prop({ required: true })
  createdAt: number;

  @Field(() => Number)
  @Prop({ required: true })
  updatedAt: number;

  @Field(() => Number)
  @Prop({ required: true })
  version: number;
}
