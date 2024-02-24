import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSectionInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  media: string;
}
