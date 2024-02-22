import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';

@Schema({ collection: 'products' })
@ObjectType()
export class ProductEntity {
  @Field(() => ID)
  id: string;

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

  // @Field(() => MerchantEntity)
  // merchant: MerchantEntity;

  // @Field(() => SectionEntity)
  // section: SectionEntity;
}
