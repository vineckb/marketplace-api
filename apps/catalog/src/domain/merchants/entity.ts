import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';

@Schema({ collection: 'merchants' })
@ObjectType()
export class MerchantEntity {
  @Field(() => ID!)
  id!: string;

  @Field()
  name!: string;

  @Field()
  media!: string;

  @Field()
  address!: string;

  @Field()
  lat!: number;

  @Field()
  lng!: number;
}
