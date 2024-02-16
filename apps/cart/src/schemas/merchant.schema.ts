import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { Merchant } from '../entities/merchant.entity';

export type MerchantDocument = Merchant & Document;
export const MerchantSchema = SchemaFactory.createForClass(Merchant);
