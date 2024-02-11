import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Merchant } from './merchant.entity';
import { Section } from './section.entity';

@ObjectType()
@Directive('@key(fields: "_id")')
export class Product {
  @Field(() => ID)
  _id: string;

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
