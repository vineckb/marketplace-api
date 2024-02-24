import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMerchantInput {
  @Field()
  name: string = '';

  @Field()
  media: string = '';

  @Field()
  address: string = '';

  @Field()
  lat: number = 0;

  @Field()
  lng: number = 0;
}
