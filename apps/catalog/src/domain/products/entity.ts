import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';

@Schema({ collection: 'products' })
@ObjectType()
export class ProductEntity {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title!: string;

  @Field()
  media: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  promotionalPrice?: number;

  @Field()
  availableQuantity: number;

  @Field()
  sectionId: string;

  @Field()
  merchantId: string;
}
