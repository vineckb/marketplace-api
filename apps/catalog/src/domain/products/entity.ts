import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ collection: 'products' })
@ObjectType()
@Directive('@key(fields: "id")')
export class Product {
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

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
