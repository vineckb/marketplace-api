import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSectionInput {
  @Field()
  name: string;

  @Field()
  media: string;
}
