import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class SectionEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  media: string;
}
