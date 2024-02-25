import { SchemaFactory } from '@nestjs/mongoose';
import { Product } from './entity';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
