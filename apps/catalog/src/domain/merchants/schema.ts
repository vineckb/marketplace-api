import { SchemaFactory } from '@nestjs/mongoose';
import { MerchantEntity } from './entity';
import { HydratedDocument } from 'mongoose';

export type MerchantDocument = HydratedDocument<MerchantEntity>;
export const MerchantSchema = SchemaFactory.createForClass(MerchantEntity);
