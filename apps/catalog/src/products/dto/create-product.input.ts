import { InputType, Field } from '@nestjs/graphql';
import { Merchant } from '../entities/merchant.entity';
import { Section } from '../entities/section.entity';

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

  @Field(() => Merchant)
  merchant: Merchant;

  @Field(() => Section)
  section: Section;
}
