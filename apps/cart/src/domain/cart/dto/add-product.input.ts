import { InputType } from '@nestjs/graphql';

@InputType()
export class MerchantInput {
  id: string;
  name: string;
  media: string;
  minOrder: number;
}

@InputType()
export class AddProductInput {
  id: string;
  merchantId: string;
  title: string;
  media: string;
  sectionName: string;
  sectionId: number;
  price: number;
  quantity: number;
}
