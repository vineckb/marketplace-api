import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SectionInput {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  media: string;
}
