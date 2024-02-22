import { DatabaseRepository } from '@app/database/database.repository';
import { Injectable } from '@nestjs/common';
import { ProductDocument } from './schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductEntity } from './entity';

@Injectable()
export class ProductRepository extends DatabaseRepository<ProductDocument> {
  constructor(
    @InjectModel(ProductEntity.name) protected model: Model<ProductDocument>,
  ) {
    super();
  }

  async findActive(customerId: string) {
    return this.model
      .findOne({ status: 'open', 'customer.id': customerId })
      .exec();
  }
}
