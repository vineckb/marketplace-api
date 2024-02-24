import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'merchants' })
@ObjectType()
export class MerchantEntity {
  @Field(() => ID, { nullable: true })
  @Prop({ nullable: true })
  _id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  media: string;

  @Field()
  @Prop()
  address: string;

  @Field()
  @Prop()
  lat: number;

  @Field()
  @Prop()
  lng: number;
}
