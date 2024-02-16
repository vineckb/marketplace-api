import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { Customer } from '../entities/customer.entity';

export type CustomerDocument = Customer & Document;
export const CustomerSchema = SchemaFactory.createForClass(Customer);
