import { InputType } from '@nestjs/graphql';

@InputType()
export class MerchantInput {
  _id: string;
  name: string;
  mediaUrl: string;
  minOrder: number;
}

@InputType()
export class AddProductInput {
  _id: string;
  merchant: MerchantInput;
  title: string;
  mediaUrl: string;
  sectionName: string;
  sectionId: number;
  price: number;
  quantity: number;
}
