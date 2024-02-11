import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { MerchantEntity } from './merchant.entity';
import { SectionEntity } from './section.entity';

@ObjectType()
@Directive('@key(fields: "_id")')
export class ProductEntity {
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

  @Field(() => MerchantEntity)
  merchant: MerchantEntity;

  @Field(() => SectionEntity)
  section: SectionEntity;
}
