import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType()
class ReturnType {
  @Field()
  msg: string;
}

@Resolver()
export class CartResolver {
  @Query(() => ReturnType)
  hello() {
    return { msg: 'Hello Wolrd' };
  }
}
