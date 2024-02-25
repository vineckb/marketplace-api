import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ collection: 'sections' })
@ObjectType()
@Directive('@key(fields: "_id")')
export class Section {
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  media: string;
}
