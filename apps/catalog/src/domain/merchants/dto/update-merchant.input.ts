import { CreateMerchantInput } from './create-merchant.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateMerchantInput extends PartialType(CreateMerchantInput) {
  @Field(() => ID)
  _id: string;
}
