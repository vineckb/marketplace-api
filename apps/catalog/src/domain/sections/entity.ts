import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ collection: 'sections' })
@ObjectType()
export class SectionEntity {
  @Field(() => ID)
  @Prop()
  _id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  media: string;
}
