import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MerchantInput {
  @Field()
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
