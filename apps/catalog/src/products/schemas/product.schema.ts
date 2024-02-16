import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { ProductEntity } from '../entities/product.entity';

export type ProductDocument = ProductEntity & Document;
export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
