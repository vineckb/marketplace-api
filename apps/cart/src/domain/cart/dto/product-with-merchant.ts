import { ObjectType } from '@nestjs/graphql';
import { CartMerchant } from '../entities/merchant.entity';

@ObjectType()
export class ProductWithMerchant {
  id: string;
  merchant: CartMerchant;
  title: string;
  media: string;
  sectionName: string;
  sectionId: number;
  price: number;
  quantity: number;
}
