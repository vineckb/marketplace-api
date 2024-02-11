import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "_id")')
export class MerchantEntity {
  @Field(() => ID)
  _id: string;

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
