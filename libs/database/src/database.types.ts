import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreatedModel {
  @Field()
  _id: string;

  @Field()
  created: boolean;
}

@ObjectType()
export class UpdatedModel {
  @Field()
  matchedCount: number;

  @Field()
  modifiedCount: number;

  @Field()
  acknowledged: boolean;

  @Field()
  upsertedId: string;

  @Field()
  upsertedCount: number;
}

@ObjectType()
export class RemovedModel {
  @Field()
  deletedCount: number;

  @Field()
  deleted: boolean;
}
