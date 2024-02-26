import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { Cart } from './entities/cart.entity';

@ObjectType()
export class ReturnType {
  @Field()
  msg: string;
}

@Resolver(() => Cart)
export class CartResolver {
  @Query(() => ReturnType)
  hellos() {
    return { msg: 'Hello Wolrd' };
  }
}
