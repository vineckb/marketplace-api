import { InputType, Field } from '@nestjs/graphql';
import { MerchantInput } from '../../dto/merchant-input';
import { SectionInput } from '../../dto/section-input';

@InputType()
export class CreateProductInput {
  @Field()
  title: string;

  @Field()
  media: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  promotionalPrice?: number;

  @Field()
  availableQuantity: number;

  @Field(() => MerchantInput, { nullable: true })
  merchant?: MerchantInput;

  @Field(() => SectionInput, { nullable: true })
  section?: SectionInput;
}
