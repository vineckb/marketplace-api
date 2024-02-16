import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { Cart } from '../entities/cart.entity';

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);
