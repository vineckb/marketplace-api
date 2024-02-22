import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreatedModel {
  @Field()
  id: string;

  @Field()
  created: boolean;
}

export type UpdatedModel = {
  matchedCount: number;
  modifiedCount: number;
  acknowledged: boolean;
  upsertedId: unknown | string;
  upsertedCount: number;
};

export type RemovedModel = {
  deletedCount: number;
  deleted: boolean;
};
