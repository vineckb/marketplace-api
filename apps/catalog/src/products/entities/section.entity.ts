import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "_id")')
export class Section {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  media: string;
}
