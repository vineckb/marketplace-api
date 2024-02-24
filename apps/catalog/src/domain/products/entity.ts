import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'products' })
@ObjectType()
export class ProductEntity {
  @Field(() => ID)
  @Prop()
  _id: string;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  media: string;

  @Field()
  @Prop()
  price: number;

  @Field({ nullable: true })
  @Prop()
  promotionalPrice?: number;

  @Field()
  @Prop()
  availableQuantity: number;

  @Field()
  @Prop()
  sectionId: string;

  @Field()
  @Prop()
  merchantId: string;
}
