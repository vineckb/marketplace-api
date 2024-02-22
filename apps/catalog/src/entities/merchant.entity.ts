import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class MerchantEntity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  media: string;

  @Field()
  address: string;

  @Field()
  lat: number;

  @Field()
  lng: number;
}
