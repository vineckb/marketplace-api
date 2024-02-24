import { InputType, Field } from '@nestjs/graphql';

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

  @Field()
  merchantId?: string;

  @Field()
  sectionId?: string;
}
