import { DatabaseRepository } from '@app/database/database.repository';
import { Injectable } from '@nestjs/common';
import { ProductDocument } from '../schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'apps/cart/src/entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductRepository extends DatabaseRepository<ProductDocument> {
  constructor(
    @InjectModel(Product.name) protected model: Model<ProductDocument>,
  ) {
    super();
  }

  async findActive(customerId: string) {
    return this.model
      .findOne({ status: 'open', 'customer.id': customerId })
      .exec();
  }
}
