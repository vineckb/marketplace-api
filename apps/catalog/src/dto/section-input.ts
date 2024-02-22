import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SectionInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  media: string;
}
