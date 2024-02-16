import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateQuantityInput {
  productId: string;
  quantity: number;
}
