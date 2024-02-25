import { SchemaFactory } from '@nestjs/mongoose';
import { Merchant } from './entity';
import { HydratedDocument } from 'mongoose';

export type MerchantDocument = HydratedDocument<Merchant>;
export const MerchantSchema = SchemaFactory.createForClass(Merchant);
