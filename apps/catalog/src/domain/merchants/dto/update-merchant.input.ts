import { CreateMerchantInput } from './create-merchant.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMerchantInput extends PartialType(CreateMerchantInput) {
  @Field(() => Int)
  id: string;
}
