import { Prop } from '@nestjs/mongoose';
import { CreateProductInput } from './create-product.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => ID)
  @Prop()
  id: string;
}
