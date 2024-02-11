import { InputType, Field } from '@nestjs/graphql';
import { MerchantInput } from './merchant-input';
import { SectionInput } from './section-input';

@InputType()
export class CreateProductInput {
  @Field()
  title: string;

  @Field()
  media: string;

  @Field()
  price: number;

  @Field()
  promotionalPrice: number;

  @Field()
  availableQuantity: number;

  @Field(() => MerchantInput)
  merchant: MerchantInput;

  @Field(() => SectionInput)
  section: SectionInput;
}
