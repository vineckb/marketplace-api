import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Merchant } from './merchant.entity';
import { Customer } from './customer.entity';
import { AddProductInput } from '../dto/add-product.input';

@ObjectType()
@Schema()
export class Cart {
  @Field(() => String)
  _id: string;

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

  @Field(() => [Merchant!])
  @Prop()
  merchants: Array<Merchant>;

  addProduct(product: AddProductInput) {
    const merchantIndex = this.merchants.findIndex(
      (merchant) => merchant._id === product.merchant._id,
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
        (product) => product._id === productId,
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
}
