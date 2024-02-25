import { DatabaseRepository } from '@app/database/database.repository';
import { Injectable } from '@nestjs/common';
import { ProductDocument } from './schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entity';

@Injectable()
export class ProductRepository extends DatabaseRepository<ProductDocument> {
  constructor(
    @InjectModel(Product.name) protected model: Model<ProductDocument>,
  ) {
    super();
  }
}
