import { SchemaFactory } from '@nestjs/mongoose';
import { ProductEntity } from './entity';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductEntity>;
export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
