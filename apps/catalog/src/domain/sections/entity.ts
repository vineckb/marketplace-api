import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';

@Schema({ collection: 'sections' })
@ObjectType()
export class SectionEntity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  media: string;
}
